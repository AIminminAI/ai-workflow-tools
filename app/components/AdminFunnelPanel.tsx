"use client";

import { useEffect, useState } from "react";
import { getFunnelData, isAdminMode, type FunnelData } from "../lib/tracker";

// 转化率分析面板（仅 ?admin=true 暗门访问时渲染，纯本地数据）
export default function AdminFunnelPanel() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<FunnelData | null>(null);

  useEffect(() => {
    if (isAdminMode()) {
      setShow(true);
      setData(getFunnelData());
    }
  }, []);

  if (!show || !data) return null;

  const matchRate = data.pv_count > 0 ? ((data.match_count / data.pv_count) * 100).toFixed(1) : "0";
  const copyRate = data.match_count > 0 ? ((data.copy_prompt / data.match_count) * 100).toFixed(1) : "0";
  const donateRate = data.pv_count > 0 ? ((data.donate_view / data.pv_count) * 100).toFixed(1) : "0";

  // 漏斗各阶段数值
  const funnelMax = Math.max(data.pv_count, data.match_count, data.copy_prompt, data.donate_view, 1);

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-80 rounded-2xl border border-blue-500/40 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold text-blue-300">转化漏斗（本地数据）</h3>
        <button
          onClick={() => setShow(false)}
          className="text-[10px] text-slate-500 hover:text-slate-300"
        >
          关闭
        </button>
      </div>

      <div className="space-y-2.5">
        <FunnelBar label="页面访问" value={data.pv_count} max={funnelMax} rate="100%" color="bg-blue-500" />
        <FunnelBar label="AI 匹配" value={data.match_count} max={funnelMax} rate={`${matchRate}%`} color="bg-emerald-500" />
        <FunnelBar label="复制 Prompt" value={data.copy_prompt} max={funnelMax} rate={`${copyRate}%`} color="bg-amber-500" />
        <FunnelBar label="打赏区曝光" value={data.donate_view} max={funnelMax} rate={`${donateRate}%`} color="bg-pink-500" />
      </div>

      <div className="mt-3 border-t border-slate-700 pt-2 text-[10px] text-slate-500">
        <p>首次访问：{data.first_visit ? new Date(data.first_visit).toLocaleString("zh-CN") : "-"}</p>
        <p>最后活跃：{data.last_active ? new Date(data.last_active).toLocaleString("zh-CN") : "-"}</p>
        <p className="mt-1 text-slate-600">数据存储在浏览器本地，不外传</p>
      </div>
    </div>
  );
}

function FunnelBar({ label, value, max, rate, color }: { label: string; value: number; max: number; rate: string; color: string }) {
  const width = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px]">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-300">{value} 次 · {rate}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${color} transition-all duration-300`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
