import Link from "next/link";
import { Zap } from "lucide-react";
import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <main className="relative flex-1">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* ==================== 顶部 Header 与横幅（SSR 立即显示） ==================== */}
        <header className="mb-10 text-center lg:mb-14">
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
