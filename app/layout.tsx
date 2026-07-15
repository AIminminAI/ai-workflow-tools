import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-workflow-tools.vercel.app"),
  title: "AI 提效工具匹配魔术师 | 一键匹配最适合你的 AI 工作流",
  description:
    "还在纠结该用哪个 AI？职场新人写报告效率低、自媒体找不到选题、独立开发者调试卡壳——选身份、选需求，30秒匹配最佳 AI 工具组合+实战 Prompt。覆盖 ChatGPT/Claude/DeepSeek/Kimi 等 20 款工具，含「为什么不直接问 DeepSeek」功能差异对比，全部免费。",
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
    "职场提效",
    "小红书爆款",
    "自媒体选题",
    "独立开发者工具",
    "Prompt 模板",
    "AI 配方",
  ],
  authors: [{ name: "AI Match Wizard" }],
  creator: "AI Match Wizard",
  openGraph: {
    title: "AI 提效工具匹配魔术师 | 一键匹配最适合你的 AI 工作流",
    description:
      "职场新人/自媒体/独立开发者必备：选身份+选需求，30秒匹配最佳 AI 工具组合+实战 Prompt，含「为什么不用 DeepSeek」对比，全部免费。",
    type: "website",
    locale: "zh_CN",
    siteName: "AI Match Wizard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI 提效工具匹配魔术师 - 一键匹配最适合你的 AI 工具工作流",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 提效工具匹配魔术师 | 一键匹配最适合你的 AI 工作流",
    description:
      "职场新人/自媒体/独立开发者必备：选身份+选需求，30秒匹配最佳 AI 工具组合，全部免费。",
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
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        {/* 前端不再调用外部 API（改为内置静态匹配引擎），无需预解析域名 */}
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200">
        {children}
      </body>
    </html>
  );
}
