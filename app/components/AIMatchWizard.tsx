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
} from "lucide-react";
import {
  INDUSTRIES,
  TASKS,
  matchTools,
  type MatchResult,
} from "../data/aiTools";

type Step = "industry" | "task" | "budget" | "result";

const BUDGETS = [
  { id: "free", name: "免费优先", emoji: "🆓", desc: "只用免费工具" },
  { id: "low", name: "低成本", emoji: "💵", desc: "免费+低价工具" },
  { id: "pro", name: "专业级", emoji: "💎", desc: "不限预算要最好" },
];

export default function AIMatchWizard() {
  const [step, setStep] = useState<Step>("industry");
  const [industry, setIndustry] = useState("");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleIndustrySelect = (id: string) => {
    setIndustry(id);
    setStep("task");
  };

  const handleTaskSelect = (id: string) => {
    setTask(id);
    setStep("budget");
  };

  const handleBudgetSelect = (id: string) => {
    setBudget(id);
    const r = matchTools(industry, task, id);
    setResult(r);
    setStep("result");
  };

  const handleReset = () => {
    setIndustry("");
    setTask("");
    setBudget("");
    setResult(null);
    setStep("industry");
  };

  const handleCopyPrompt = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.searchPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepOrder: Step[] = ["industry", "task", "budget", "result"];
  const currentStepIndex = stepOrder.indexOf(step);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* 进度指示器 */}
      {step !== "result" && (
        <div className="mb-6 flex items-center justify-center gap-2">
          {["行业", "需求", "预算"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
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
              选择你的行业，AI 匹配器会给出针对性建议
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => handleIndustrySelect(ind.id)}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-4 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-[1.03]"
              >
                <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
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
                className="group flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3.5 text-left transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/10"
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">
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

      {/* 第 3 步：选预算 */}
      {step === "budget" && (
        <div className="animate-card-in">
          <div className="mb-5 text-center">
            <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-slate-100">
              <Zap className="h-5 w-5 text-blue-400" />
              你的预算偏好？
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              会根据预算过滤推荐工具
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBudgetSelect(b.id)}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-5 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/10 hover:scale-[1.03]"
              >
                <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                  {b.emoji}
                </span>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-blue-300">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-500">{b.desc}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("task")}
            className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回选需求
          </button>
        </div>
      )}

      {/* 结果页 */}
      {step === "result" && result && (
        <div className="animate-card-in space-y-4">
          {/* 成功提示 */}
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-semibold">匹配完成</span>
          </div>

          {/* 主力推荐 */}
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-slate-900/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-300">
                首选推荐
              </span>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{result.primary.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-slate-100">
                    {result.primary.name}
                  </h4>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {result.primary.pricing}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {result.primary.region}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {result.primary.desc}
                </p>
                <p className="mt-2 text-xs text-blue-300/80">
                  💡 {result.primaryReason}
                </p>
                <a
                  href={result.primary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-300 transition-all hover:bg-blue-500/30"
                >
                  立即使用
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* 辅助工具 */}
          {result.secondary.length > 0 && (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-200">
                <Sparkles className="h-4 w-4 text-amber-400" />
                搭配使用效果更好
              </h4>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {result.secondary.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2.5 transition-all hover:border-slate-600 hover:bg-slate-800/40"
                  >
                    <span className="text-xl">{tool.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-300">
                          {tool.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">{tool.desc}</p>
                    </div>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400">
                      {tool.pricing}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 工作流 */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-200">
              <Workflow className="h-4 w-4 text-emerald-400" />
              推荐工作流
            </h4>
            <div className="space-y-2.5">
              {result.workflow.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 行业建议 */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-300">
              <Lightbulb className="h-4 w-4" />
              行业专属建议
            </h4>
            <ul className="space-y-2">
              {result.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                >
                  <span className="mt-0.5 text-amber-400">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* 搜索提示词 */}
          <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <Search className="h-4 w-4 text-blue-400" />
                推荐搜索关键词
              </h4>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] text-slate-300 transition-all hover:bg-slate-700"
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
            <p className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-400">
              {result.searchPrompt}
            </p>
            <p className="mt-2 text-[10px] text-slate-600">
              复制后粘贴到 Perplexity / 秘塔 AI 搜索框中搜索
            </p>
          </div>

          {/* 重新匹配 */}
          <button
            onClick={handleReset}
            className="mx-auto flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300"
          >
            <RotateCcw className="h-4 w-4" />
            重新匹配
          </button>
        </div>
      )}
    </div>
  );
}
