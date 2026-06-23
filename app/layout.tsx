import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 部署到 Vercel 后，请将此 URL 替换为你的实际域名
  metadataBase: new URL("https://ai-workflow-tools.vercel.app"),
  title: "AI Match Wizard - 不知道该用哪个 AI？选一下马上告诉你",
  description:
    "免费 AI 工具匹配器：选行业、选需求、选预算，立刻推荐最佳 AI 工具组合。覆盖航天、矿产、制造、电商、自媒体等 12+ 行业，ChatGPT/Claude/DeepSeek/Kimi/Perplexity 等 20+ 工具精准匹配。另有精选实战配方 1.9 元解锁。",
  keywords: [
    "AI 工具推荐",
    "该用什么 AI",
    "AI 匹配器",
    "AI 工作流",
    "ChatGPT",
    "Claude",
    "DeepSeek",
    "Kimi",
    "Perplexity",
    "AI 搞钱",
    "小红书爆款",
    "AI 视频生成",
    "跨境电商配图",
    "Prompt 模板",
    "AI 配方",
  ],
  authors: [{ name: "AI Recipe Shop" }],
  creator: "AI Recipe Shop",
  openGraph: {
    title: "AI Match Wizard - 不知道该用哪个 AI？选一下马上告诉你",
    description:
      "免费 AI 工具匹配器：选行业、选需求，立刻推荐最佳 AI 工具组合。覆盖 12+ 行业，20+ AI 工具精准匹配。",
    type: "website",
    locale: "zh_CN",
    siteName: "AI Recipe Shop",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Recipe Shop - AI 搞钱工作流配方商店",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Match Wizard - 不知道该用哪个 AI？选一下马上告诉你",
    description:
      "免费 AI 工具匹配器：覆盖 12+ 行业，20+ AI 工具精准匹配。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200">
        {children}
      </body>
    </html>
  );
}
