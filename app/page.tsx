import Link from "next/link";
import { Zap } from "lucide-react";
import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <main className="relative flex-1">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* ==================== 顶部 Header 与横幅（SSR 立即显示） ==================== */}
        <header className="mb-8 text-center lg:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-slate-400">
              AI 工具匹配 + 实战配方
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-slate-100">AI Match Wizard</span>
            <span className="mt-2 block text-gradient text-2xl sm:text-3xl lg:text-4xl">
              不知道该用哪个 AI？选一下马上告诉你
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
            不知道该用什么 AI？先试匹配器，再拿精选配方
          </p>
        </header>

        {/* ==================== 为什么用这个而不是直接问 AI？（SSR 立即显示） ==================== */}
        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
          <h2 className="mb-4 text-center text-sm font-bold text-slate-300">
            为什么用这个，而不是直接问 DeepSeek / 豆包？
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <span className="text-xs font-semibold text-slate-200">中立推荐</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                问 DeepSeek 它推荐自己，问豆包它也推荐自己。我们中立推荐真正最适合的
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-lg">📋</span>
                <span className="text-xs font-semibold text-slate-200">结构化输出</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                直接问 AI 得到一大段文字要自己提炼。我们给出：主力工具+辅助工具+3步工作流+避坑指南
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <span className="text-xs font-semibold text-slate-200">3 秒出结果</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                选行业、选需求、选预算，3 下点击出结果。不用想怎么提问、怎么追问
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-lg">🔒</span>
                <span className="text-xs font-semibold text-slate-200">行业合规提醒</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                航天涉密数据禁止上传在线 AI、矿山安全规程、医疗患者隐私脱敏——AI 不会主动提醒
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-lg">💰</span>
                <span className="text-xs font-semibold text-slate-200">预算感知</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                按你的预算过滤（免费优先 / 追求效果），AI 不会主动问你舍不舍得花钱
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span className="text-xs font-semibold text-slate-200">精选搞钱配方</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                1.9 元买验证过的工作流+独家 Prompt 模板，AI 临场编的不如验证过的靠谱
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 客户端交互部分（hydration 后激活） ==================== */}
        <HomeClient />

        {/* ==================== 底部（SSR 立即显示） ==================== */}
        <footer className="mt-16 border-t border-slate-800/60 pt-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-slate-600">
              AI Match Wizard · 免费匹配 + 精选配方 · 1.9 元解锁实战工作流
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
