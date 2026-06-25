import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="relative min-h-screen flex-1">
      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-slate-100 sm:text-3xl">
          {title}
        </h1>
        <p className="mb-8 text-xs text-slate-500">
          最后更新：{lastUpdated}
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-400">
          {children}
        </div>

        <footer className="mt-12 border-t border-slate-800/60 pt-6">
          <p className="text-xs text-slate-600">
            AI Match Wizard · 如有疑问请联系微信：phone_15902953075
          </p>
        </footer>
      </div>
    </main>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-base font-semibold text-slate-200">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
