"use client";

import { User, Wallet, Target, ChevronDown } from "lucide-react";
import { filterOptions } from "../data/recipes";

interface FilterPanelProps {
  selectedRole: string;
  selectedBudget: string;
  selectedTarget: string;
  onRoleChange: (role: string) => void;
  onBudgetChange: (budget: string) => void;
  onTargetChange: (target: string) => void;
}

export default function FilterPanel({
  selectedRole,
  selectedBudget,
  selectedTarget,
  onRoleChange,
  onBudgetChange,
  onTargetChange,
}: FilterPanelProps) {
  return (
    <aside className="lg:sticky lg:top-6 lg:h-fit space-y-6">
      {/* 身份选择 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-200">你的身份</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.roles.map((role) => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={`rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
                selectedRole === role
                  ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.25)]"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* 预算倾向 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2">
          <Wallet className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-200">预算倾向</h3>
        </div>
        <div className="flex flex-col gap-2">
          {filterOptions.budgets.map((budget) => (
            <button
              key={budget}
              onClick={() => onBudgetChange(budget)}
              className={`rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                selectedBudget === budget
                  ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      {/* 目标产出 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-200">目标产出</h3>
        </div>
        <div className="relative">
          <select
            value={selectedTarget}
            onChange={(e) => onTargetChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 pr-10 text-xs font-medium text-slate-200 transition-all duration-200 hover:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          >
            {filterOptions.targets.map((target) => (
              <option key={target} value={target} className="bg-slate-800">
                {target}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
      </div>
    </aside>
  );
}
