"use client";

import { useState, useMemo } from "react";
import { Search, PackageOpen, Wand2 } from "lucide-react";
import { recipes } from "../data/recipes";
import FilterPanel from "./FilterPanel";
import RecipeCard from "./RecipeCard";
import AIMatchWizard from "./AIMatchWizard";

export default function HomeClient() {
  // 筛选状态
  const [selectedRole, setSelectedRole] = useState("小红书博主");
  const [selectedBudget, setSelectedBudget] = useState("性价比狂魔");
  const [selectedTarget, setSelectedTarget] = useState("量产爆款配图");

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
    <>
      {/* ==================== AI Match Wizard（免费·任意行业） ==================== */}
      <section className="mb-12">
        <div className="mb-5 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5">
            <Wand2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">
              AI 工具匹配器 · 免费 · 任意行业
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            不知道该用哪个 AI？选一下，马上告诉你
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            学生、上班族、自媒体、电商……任何身份都能匹配到最佳 AI 工具组合
          </p>
        </div>
        <AIMatchWizard />
      </section>

      {/* ==================== 分隔线 ==================== */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <span className="text-xs text-slate-600">以下为精选搞钱实战配方（全部免费）</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

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
                <RecipeCard key={recipe.id} recipe={recipe} index={index} />
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
    </>
  );
}
