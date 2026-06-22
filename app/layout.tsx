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
  metadataBase: new URL("https://ai-recipe-shop.vercel.app"),
  title: "AI Recipe Shop - 拒绝理论，直接拿走搞钱工作流",
  description:
    "专为自媒体、电商、独立开发定制的 AI 组合拳配方。小红书爆款配图、AI 视频一键生成、跨境电商主图量产，3 套落地工作流，1.9 元解锁核心 Prompt。",
  keywords: [
    "AI 工作流",
    "AI 搞钱",
    "Midjourney 教程",
    "小红书爆款",
    "AI 视频生成",
    "跨境电商配图",
    "Prompt 模板",
    "AI 配方",
  ],
  authors: [{ name: "AI Recipe Shop" }],
  creator: "AI Recipe Shop",
  openGraph: {
    title: "AI Recipe Shop - 拒绝理论，直接拿走搞钱工作流",
    description:
      "专为自媒体、电商、独立开发定制的 AI 组合拳配方。3 套落地工作流，1.9 元解锁核心 Prompt。",
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
    title: "AI Recipe Shop - 拒绝理论，直接拿走搞钱工作流",
    description:
      "专为自媒体、电商、独立开发定制的 AI 组合拳配方。1.9 元解锁核心 Prompt。",
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
