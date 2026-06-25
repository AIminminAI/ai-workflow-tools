"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  KeyRound,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { sha256 } from "../data/recipes";

interface PaymentModalProps {
  isOpen: boolean;
  activationHash: string;
  onClose: () => void;
  onConfirm: () => void;
}

// 客服微信号
const WECHAT_ID = "phone_15902953075";

export default function PaymentModal({
  isOpen,
  activationHash,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ESC 键关闭 + 防止背景滚动
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 300);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // 每次打开弹窗时重置状态
  useEffect(() => {
    if (isOpen) {
      setCode("");
      setError(false);
      setVerifying(false);
    }
  }, [isOpen]);

  // 验证激活码：计算输入值的 SHA-256 哈希并比对
  const handleVerify = async () => {
    if (!code.trim()) {
      setError(true);
      return;
    }
    setVerifying(true);
    try {
      const inputHash = await sha256(code.trim());
      if (inputHash === activationHash) {
        onConfirm();
      } else {
        setError(true);
        setVerifying(false);
      }
    } catch {
      setError(true);
      setVerifying(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    if (error) setError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerify();
  };

  if (!isOpen) return null;

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />

      <div
        className={`animate-modal-in relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl ${
          error ? "animate-shake" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-slate-800 hover:text-slate-300"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 头部 */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15">
            <KeyRound className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-slate-100">
            解锁核心搞钱配方
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            永久查看独家 Prompt 与隐藏工具
          </p>
        </div>

        {/* 说明文字 */}
        <div className="mx-6 mb-4 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
          <p className="text-xs leading-relaxed text-slate-400">
            👉 扫描下方二维码付款，付款后截图发给客服微信，立即获取激活码。输入激活码即可永久解锁此搞钱工作流！
          </p>
        </div>

        {/* 二维码区域 */}
        <div className="px-6 pb-4">
          <div className="relative mx-auto flex aspect-square w-44 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
            <img
              src="/qrcode-personal.png"
              alt="微信/支付宝收款码"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove(
                  "hidden"
                );
              }}
            />
            {/* 占位提示（图片不存在时显示微信号直接收款） */}
            <div className="hidden flex-col items-center gap-2 px-4 text-center">
              <MessageCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
              <p className="text-xs text-slate-400">加微信付款</p>
              <p className="text-[10px] text-slate-500">秒发激活码</p>
              <code className="rounded bg-slate-800 px-2 py-1 text-[11px] text-emerald-400">
                {WECHAT_ID}
              </code>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-500">
            微信/支付宝扫码 · 付款后截图发客服秒发激活码
          </p>
        </div>

        {/* 激活码输入区 */}
        <div className="space-y-3 px-6 pb-4">
          <div>
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="请输入付款后获得的激活码"
              className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 transition-all duration-200 focus:outline-none ${
                error
                  ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                  : "border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              }`}
            />
            {error && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
                激活码错误，请检查或联系客服
              </p>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={verifying}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(59,130,246,0.5)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {verifying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                验证中...
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                立即验证解锁
              </>
            )}
          </button>
        </div>

        {/* 客服联系方式 */}
        <div className="border-t border-slate-800 px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>付款遇到问题？加微信：</span>
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[11px] text-emerald-400">
              {WECHAT_ID}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
