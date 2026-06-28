"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Link2,
  ArrowRight,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { decode, type Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  const [copied, setCopied] = useState(false);

  // 免费模式：直接解码核心内容
  const decodedPrompt = decode(recipe.hiddenPrompt);
  const decodedUrl = decode(recipe.hiddenToolUrl);

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
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
            <Sparkles className="h-3 w-3" />
            免费 · 配方 #{recipe.id}
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

        {/* 独家 Prompt 模板（免费直接展示） */}
        <div className="relative">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500/80">
            独家 Prompt 模板 · 免费
          </p>

          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            {/* Prompt 模板 */}
            <div className="mb-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  独家暗黑 Prompt 模板
                </span>
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
              </div>
              <pre className="overflow-x-auto rounded-lg bg-slate-900/80 p-3 font-mono text-[11px] leading-relaxed text-emerald-300/90 whitespace-pre-wrap break-all">
                {decodedPrompt}
              </pre>
            </div>

            {/* 隐藏工具链接 */}
            <a
              href={decodedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2.5 transition-colors duration-150 hover:border-blue-500/50 hover:bg-slate-800/80"
            >
              <span className="flex items-center gap-2 text-xs text-slate-300">
                <Link2 className="h-3.5 w-3.5 text-blue-400" />
                {recipe.hiddenTool}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
            </a>
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
    </>
  );
}
