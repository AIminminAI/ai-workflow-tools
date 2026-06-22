"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Zap, Search, PackageOpen } from "lucide-react";
import { recipes } from "./data/recipes";
import FilterPanel from "./components/FilterPanel";
import RecipeCard from "./components/RecipeCard";

const STORAGE_KEY = "unlocked_recipes";

export default function Home() {
  // 筛选状态
  const [selectedRole, setSelectedRole] = useState("小红书博主");
  const [selectedBudget, setSelectedBudget] = useState("性价比狂魔");
  const [selectedTarget, setSelectedTarget] = useState("量产爆款配图");

  // 解锁状态：保存已解锁卡片的 id 数组
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
  // 防止 hydration 不匹配：客户端挂载后才读取 localStorage
  const [mounted, setMounted] = useState(false);

  // 页面初始化时从 localStorage 读取已解锁的配方
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids: number[] = JSON.parse(stored);
        if (Array.isArray(ids)) {
          setUnlockedIds(ids);
        }
      }
    } catch {
      // localStorage 不可用或数据损坏，静默忽略
    }
    setMounted(true);
  }, []);

  // 解锁某张卡片：更新 state 并持久化到 localStorage
  const handleUnlock = (id: number) => {
    setUnlockedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage 写入失败，静默忽略
      }
      return next;
    });
  };

  // 筛选逻辑：按匹配度评分排序，至少匹配一个维度即展示
  const filteredRecipes = useMemo(() => {
    const scored = recipes.map((recipe) => {
      let score = 0;
      if (recipe.role === selectedRole) score += 1;
      if (recipe.budget === selectedBudget) score += 1;
      if (recipe.target === selectedTarget) score += 1;
      return { recipe, score };
    });

    // 筛选出至少匹配一个维度的配方
    const matched = scored.filter((item) => item.score > 0);

    // 如果有匹配项，按评分降序排列；否则展示全部
    const result = matched.length > 0 ? matched : scored;

    return result
      .sort((a, b) => b.score - a.score)
      .map((item) => item.recipe);
  }, [selectedRole, selectedBudget, selectedTarget]);

  return (
    <main className="relative flex-1 overflow-hidden">
      {/* 背景装饰光晕 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-glow-pulse absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
        <div
          className="animate-glow-pulse absolute -right-40 top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* ==================== 顶部 Header 与横幅 ==================== */}
        <header className="mb-10 text-center lg:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-slate-400">
              2026 AI 搞钱配方商店
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-slate-100">AI Recipe Shop</span>
            <span className="mt-2 block text-gradient text-2xl sm:text-3xl lg:text-4xl">
              拒绝理论，直接拿走搞钱工作流
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
            专为自媒体、电商、独立开发定制的 AI 组合拳配方
          </p>
        </header>

        {/* ==================== 主体：左筛选 + 右卡片 ==================== */}
        <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* 左侧筛选区 */}
          <FilterPanel
            selectedRole={selectedRole}
            selectedBudget={selectedBudget}
            selectedTarget={selectedTarget}
            onRoleChange={setSelectedRole}
            onBudgetChange={setSelectedBudget}
            onTargetChange={setSelectedTarget}
          />

          {/* 右侧配方卡片展示区 */}
          <section>
            {/* 结果计数 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-slate-500" />
                <p className="text-sm text-slate-400">
                  为你匹配到{" "}
                  <span className="font-semibold text-blue-400">
                    {filteredRecipes.length}
                  </span>{" "}
                  个配方
                </p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-full bg-slate-800/60 px-3 py-1 text-[11px] text-slate-500">
                  {selectedRole}
                </span>
                <span className="rounded-full bg-slate-800/60 px-3 py-1 text-[11px] text-slate-500">
                  {selectedBudget}
                </span>
                <span className="rounded-full bg-slate-800/60 px-3 py-1 text-[11px] text-slate-500">
                  {selectedTarget}
                </span>
              </div>
            </div>

            {/* 卡片列表 / 空状态 */}
            {filteredRecipes.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isUnlocked={
                      mounted && unlockedIds.includes(recipe.id)
                    }
                    onUnlock={handleUnlock}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-20 text-center">
                <PackageOpen className="mb-3 h-10 w-10 text-slate-700" />
                <p className="text-sm text-slate-500">
                  暂无匹配配方，试试调整筛选条件
                </p>
              </div>
            )}
          </section>
        </div>

        {/* ==================== 底部 ==================== */}
        <footer className="mt-16 border-t border-slate-800/60 pt-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-slate-600">
              AI Recipe Shop · 配方持续更新中 · 1.9 元解锁一个搞钱密码
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600">
              <Link
                href="/terms"
                className="transition-colors hover:text-slate-400"
              >
                用户协议
              </Link>
              <span className="text-slate-800">·</span>
              <Link
                href="/privacy"
                className="transition-colors hover:text-slate-400"
              >
                隐私政策
              </Link>
              <span className="text-slate-800">·</span>
              <Link
                href="/refund"
                className="transition-colors hover:text-slate-400"
              >
                退款政策
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
