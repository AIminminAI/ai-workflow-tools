"use client";

import { useState } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  Link2,
  ArrowRight,
  Sparkles,
  Lightbulb,
  PartyPopper,
} from "lucide-react";
import { decode, type Recipe } from "../data/recipes";
import PaymentModal from "./PaymentModal";

interface RecipeCardProps {
  recipe: Recipe;
  isUnlocked: boolean;
  onUnlock: (id: number) => void;
  index: number;
}

export default function RecipeCard({
  recipe,
  isUnlocked,
  onUnlock,
  index,
}: RecipeCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 解锁后动态解码核心内容
  const decodedPrompt = isUnlocked ? decode(recipe.hiddenPrompt) : "";
  const decodedUrl = isUnlocked ? decode(recipe.hiddenToolUrl) : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(decodedPrompt);
    } catch {
      // 兜底：创建临时 textarea 执行复制
      const textarea = document.createElement("textarea");
      textarea.value = decodedPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlockSuccess = () => {
    onUnlock(recipe.id);
    setModalOpen(false);
  };

  return (
    <>
      <article
        className="animate-card-in group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-colors duration-150 hover:border-slate-700"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* 装饰光晕 */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/5 transition-colors duration-150 group-hover:bg-blue-500/10" />

        {/* 配方名称 */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug text-slate-100">
            {recipe.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-1 text-[10px] font-medium text-slate-400">
            <Sparkles className="h-3 w-3 text-blue-400" />
            配方 #{recipe.id}
          </span>
        </div>

        {/* 组合拳工具链 */}
        <div className="mb-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            组合拳工具链
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {recipe.tools.map((tool, i) => (
              <span key={tool} className="flex items-center gap-1.5">
                <span className="rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {tool}
                </span>
                {i < recipe.tools.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-slate-600" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 步骤拆解 */}
        <div className="mb-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            步骤拆解
          </p>
          <ol className="space-y-2">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-[11px] font-bold text-blue-400">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-400">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 核心壁垒区域 */}
        <div className="relative">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500/80">
            核心壁垒 · 独家配方
          </p>

          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
            {/* 真实内容（解锁后可见，未解锁时模糊 + 防拷贝） */}
            <div
              className={`p-4 transition-all duration-500 ${
                isUnlocked
                  ? "blur-0 opacity-100"
                  : "select-none blur-xl opacity-60"
              }`}
            >
              {/* Prompt 模板 */}
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    独家暗黑 Prompt 模板
                  </span>
                  {isUnlocked && (
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 ${
                        copied
                          ? "animate-unlock-pulse bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          复制成功
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          一键复制
                        </>
                      )}
                    </button>
                  )}
                </div>
                <pre className="overflow-x-auto rounded-lg bg-slate-900/80 p-3 font-mono text-[11px] leading-relaxed text-emerald-300/90 whitespace-pre-wrap break-all">
                  {isUnlocked ? decodedPrompt : "🔒 解锁后查看完整 Prompt 模板..."}
                </pre>
              </div>

              {/* 隐藏工具链接 */}
              <a
                href={isUnlocked ? decodedUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!isUnlocked) e.preventDefault();
                }}
                className={`flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2.5 transition-colors duration-150 ${
                  isUnlocked
                    ? "hover:border-blue-500/50 hover:bg-slate-800/80"
                    : "pointer-events-none"
                }`}
              >
                <span className="flex items-center gap-2 text-xs text-slate-300">
                  <Link2 className="h-3.5 w-3.5 text-blue-400" />
                  {recipe.hiddenTool}
                </span>
                {isUnlocked && (
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                )}
              </a>
            </div>

            {/* 模糊遮罩（未解锁时显示） */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/85">
                <div className="flex flex-col items-center gap-2 px-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">
                    支付 1.9 元解锁该核心搞钱配方
                  </p>
                  <p className="text-xs text-slate-500">
                    解锁后可查看独家 Prompt 与一键复制
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-colors duration-150 hover:from-blue-400 hover:to-blue-500"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  立即解锁
                </button>
              </div>
            )}

            {/* 已解锁标识 */}
            {isUnlocked && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                <Unlock className="h-3 w-3" />
                已解锁
              </div>
            )}
          </div>
        </div>
      </article>

      {/* 复制成功 Toast 提示 */}
      {copied && (
        <div className="animate-toast-in fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-900/95 px-5 py-3 shadow-2xl">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
            <PartyPopper className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-emerald-300">
            复制成功，快去搞钱吧！
          </span>
        </div>
      )}

      {/* 付费 Modal */}
      <PaymentModal
        isOpen={modalOpen}
        activationHash={recipe.activationHash}
        onClose={() => setModalOpen(false)}
        onConfirm={handleUnlockSuccess}
      />
    </>
  );
}
