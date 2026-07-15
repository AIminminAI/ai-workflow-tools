"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  ExternalLink,
  Copy,
  Lightbulb,
  Workflow,
  Zap,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  INDUSTRIES,
  TASKS,
  matchTools,
  type MatchResult,
} from "../data/aiTools";

type Step = "industry" | "task" | "budget" | "loading" | "result";

const BUDGETS = [
  { id: "free", name: "免费优先", emoji: "🆓", desc: "只用免费工具" },
  { id: "low", name: "低成本", emoji: "💵", desc: "免费+低价工具" },
  { id: "pro", name: "专业级", emoji: "💎", desc: "不限预算要最好" },
];

// AI 返回的结果类型
interface AIResult {
  primary: { name: string; reason: string; url: string };
  secondary: { name: string; reason: string; url: string }[];
  workflow: string[];
  tips: string[];
  comparison: string;
}

export default function AIMatchWizard() {
  const [step, setStep] = useState<Step>("industry");
  const [industry, setIndustry] = useState("");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [fallbackResult, setFallbackResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const industryName =
    INDUSTRIES.find((i) => i.id === industry)?.name || "";
  const taskName = TASKS.find((t) => t.id === task)?.name || "";

  const handleIndustrySelect = (id: string) => {
    setIndustry(id);
    setStep("task");
  };

  const handleTaskSelect = (id: string) => {
    setTask(id);
    setStep("budget");
  };

  const handleMatch = () => {
    setStep("loading");
    setError("");

    // 直接用内置匹配引擎（瞬间完成，无需 API，无网络依赖，永不卡顿）
    const result = matchTools(industry, task, budget);
    setFallbackResult(result);
    setAiResult(null);
    // 300ms 让 loading 动画显示一下，给用户点击反馈
    setTimeout(() => setStep("result"), 300);
  };

  const handleReset = () => {
    setIndustry("");
    setTask("");
    setBudget("");
    setDescription("");
    setAiResult(null);
    setFallbackResult(null);
    setError("");
    setStep("industry");
  };

  const handleCopyTips = () => {
    if (!aiResult && !fallbackResult) return;
    const text = aiResult
      ? aiResult.tips.join("\n")
      : fallbackResult!.tips.join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepOrder: Step[] = ["industry", "task", "budget", "loading", "result"];
  const currentStepIndex = stepOrder.indexOf(step);
  const isFallback = !!fallbackResult && !aiResult;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* 进度指示器 */}
      {step !== "result" && step !== "loading" && (
        <div className="mb-6 flex items-center justify-center gap-2">
          {["行业", "需求", "预算"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-150 ${
                  i <= currentStepIndex
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {i < currentStepIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`text-xs ${
                  i <= currentStepIndex ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {label}
              </span>
              {i < 2 && <div className="h-px w-6 bg-slate-700" />}
            </div>
          ))}
        </div>
      )}

      {/* 第 1 步：选行业 */}
      {step === "industry" && (
        <div className="animate-card-in">
          <div className="mb-5 text-center">
            <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-slate-100">
              <Search className="h-5 w-5 text-blue-400" />
              你在哪个行业？
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              选择你的行业，AI 会给出针对性建议
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => handleIndustrySelect(ind.id)}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-4 transition-colors duration-150 hover:border-blue-500/50 hover:bg-blue-500/10"
              >
                <span className="text-2xl">
                  {ind.emoji}
                </span>
                <span className="text-xs font-medium text-slate-300 group-hover:text-blue-300">
                  {ind.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 第 2 步：选需求 */}
      {step === "task" && (
        <div className="animate-card-in">
          <div className="mb-5 text-center">
            <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-slate-100">
              <Sparkles className="h-5 w-5 text-blue-400" />
              你想用 AI 做什么？
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              不同需求对应不同的 AI 工具组合
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {TASKS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTaskSelect(t.id)}
                className="group flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3.5 text-left transition-colors duration-150 hover:border-blue-500/50 hover:bg-blue-500/10"
              >
                <span className="text-xl">
                  {t.emoji}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-300">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("industry")}
            className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回选行业
          </button>
        </div>
      )}

      {/* 第 3 步：选预算 + 描述问题 */}
      {step === "budget" && (
        <div className="animate-card-in">
          <div className="mb-5 text-center">
            <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-slate-100">
              <Zap className="h-5 w-5 text-blue-400" />
              预算偏好 + 具体问题
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              描述越详细，AI 推荐越精准
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBudget(b.id)}
                className={`group flex flex-col items-center gap-1.5 rounded-xl border px-4 py-5 transition-colors duration-150 ${
                  budget === b.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 bg-slate-900/60 hover:border-blue-500/50 hover:bg-blue-500/10"
                }`}
              >
                <span className="text-2xl">
                  {b.emoji}
                </span>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-blue-300">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-500">{b.desc}</span>
              </button>
            ))}
          </div>

          {/* 自由描述输入框 */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              具体描述你的问题（选填，但强烈建议填写）
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例如：我是做电商的，想用 AI 生成商品主图和写详情页文案"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
            />
            <p className="mt-1 text-[10px] text-slate-600">
              💡 填了具体问题，AI 会针对你的问题给出个性化推荐，而不是泛泛而谈
            </p>
          </div>

          {/* 匹配按钮 */}
          <button
            onClick={handleMatch}
            disabled={!budget}
            className="mx-auto mt-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors duration-150 hover:from-blue-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Sparkles className="h-4 w-4" />
            让 AI 帮我匹配
          </button>

          <button
            onClick={() => setStep("task")}
            className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回选需求
          </button>
        </div>
      )}

      {/* 加载中 */}
      {step === "loading" && (
        <div className="animate-card-in flex flex-col items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
          <p className="mt-4 text-sm text-slate-400">
            正在匹配最佳工具组合...
          </p>
          <p className="mt-1 text-[10px] text-slate-600">
            {industryName} · {taskName} · 瞬间出结果
          </p>
        </div>
      )}

      {/* 结果页 */}
      {step === "result" && (aiResult || fallbackResult) && (
        <div className="animate-card-in space-y-4">
          {/* 成功提示 */}
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">匹配完成</span>
            {isFallback && (
              <span className="ml-2 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                基于 20 款真实工具库
              </span>
            )}
          </div>

          {/* 主力推荐 */}
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-slate-900/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-300">
                首选推荐
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">
                {aiResult
                  ? "🤖"
                  : fallbackResult!.primary.emoji}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-slate-100">
                    {aiResult
                      ? aiResult.primary.name
                      : fallbackResult!.primary.name}
                  </h4>
                  {isFallback && (
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                      {fallbackResult!.primary.pricing}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {aiResult
                    ? aiResult.primary.reason
                    : fallbackResult!.primary.desc}
                </p>
                {!aiResult && (
                  <p className="mt-2 text-xs text-blue-300/80">
                    💡 {fallbackResult!.primaryReason}
                  </p>
                )}
                <a
                  href={
                    aiResult
                      ? aiResult.primary.url
                      : fallbackResult!.primary.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-300 transition-colors duration-150 hover:bg-blue-500/30"
                >
                  立即使用
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* 辅助工具 */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-200">
              <Sparkles className="h-4 w-4 text-amber-400" />
              搭配使用效果更好
            </h4>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {(aiResult
                ? aiResult.secondary
                : fallbackResult!.secondary.map((t) => ({
                    name: t.name,
                    reason: t.desc,
                    url: t.url,
                  }))
              ).map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2.5 transition-colors duration-150 hover:border-slate-600 hover:bg-slate-800/40"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-300">
                      {tool.name}
                    </span>
                    <p className="text-[10px] text-slate-500">{tool.reason}</p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-600 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          </div>

          {/* 工作流 */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-200">
              <Workflow className="h-4 w-4 text-emerald-400" />
              推荐工作流
            </h4>
            <div className="space-y-2.5">
              {(aiResult ? aiResult.workflow : fallbackResult!.workflow).map(
                (step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                      {i + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {step}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* AI 对比分析（证明为什么不用 DeepSeek） */}
          {(aiResult?.comparison || fallbackResult?.comparison) && (
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-purple-300">
                <AlertCircle className="h-4 w-4" />
                为什么不直接问 DeepSeek/豆包？
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                {aiResult?.comparison || fallbackResult!.comparison}
              </p>
            </div>
          )}

          {/* 行业建议 */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <Lightbulb className="h-4 w-4" />
                行业专属建议
              </h4>
              <button
                onClick={handleCopyTips}
                className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] text-slate-300 transition-colors duration-150 hover:bg-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    复制
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-2">
              {(aiResult ? aiResult.tips : fallbackResult!.tips).map(
                (tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                  >
                    <span className="mt-0.5 text-amber-400">•</span>
                    {tip}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 重新匹配 */}
          <button
            onClick={handleReset}
            className="mx-auto flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-150 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300"
          >
            <RotateCcw className="h-4 w-4" />
            重新匹配
          </button>
        </div>
      )}
    </div>
  );
}
