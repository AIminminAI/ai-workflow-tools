"use client";

import { useState } from "react";
import { Heart, Coffee, MessageCircle } from "lucide-react";

// 客服/交流微信号（手机号即微信号）
const WECHAT_ID = "15902953075";

export default function DonateSection() {
  const [method, setMethod] = useState<"wechat" | "alipay">("wechat");

  return (
    <section className="mt-12 mb-4">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/60 p-6 sm:p-8">
        <div className="mx-auto max-w-md text-center">
          {/* 标题徽章 */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5">
            <Heart className="h-3.5 w-3.5 text-pink-400" />
            <span className="text-xs font-medium text-pink-300">
              内容全免费 · 自愿打赏
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
            如果这些配方帮到你
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            所有配方和 AI 匹配完全免费。如果觉得有用，欢迎请我喝杯咖啡，支持持续更新更多搞钱配方
          </p>

          {/* 二维码切换 */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setMethod("wechat")}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-150 ${
                method === "wechat"
                  ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                  : "bg-slate-800/50 text-slate-500 hover:text-slate-300"
              }`}
            >
              💚 微信
            </button>
            <button
              onClick={() => setMethod("alipay")}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-150 ${
                method === "alipay"
                  ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/40"
                  : "bg-slate-800/50 text-slate-500 hover:text-slate-300"
              }`}
            >
              💙 支付宝
            </button>
          </div>

          {/* 二维码图片 */}
          <div className="mt-4 flex justify-center">
            <div className="relative flex aspect-square w-48 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-white p-2">
              <img
                src={method === "wechat" ? "/wechat-qr.png" : "/alipay-qr.jpg"}
                alt={method === "wechat" ? "微信打赏码" : "支付宝打赏码"}
                className="h-full w-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
              {/* 兜底：图片加载失败时显示微信号 */}
              <div className="hidden flex-col items-center gap-2 px-4 text-center">
                <MessageCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
                <p className="text-xs text-slate-400">加微信交流</p>
                <code className="rounded bg-slate-100 px-2 py-1 text-[11px] text-emerald-600">
                  {WECHAT_ID}
                </code>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {method === "wechat" ? "微信" : "支付宝"}扫码 · 金额随意 · 感谢支持
          </p>

          {/* 联系方式 */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Coffee className="h-3.5 w-3.5 text-amber-400" />
            <span>交流 / 反馈加微信：</span>
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] text-emerald-400">
              {WECHAT_ID}
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
