// 免费模式转化漏斗追踪（纯前端 LocalStorage，无后端无数据库，100% 合规）
// 4 个指标：
//   pv_count      - 页面访问次数
//   match_count   - AI 匹配次数
//   copy_prompt   - 复制 Prompt 次数
//   donate_view   - 打赏区曝光次数

const STORAGE_KEY = "amw_funnel_v1";

export interface FunnelData {
  pv_count: number;
  match_count: number;
  copy_prompt: number;
  donate_view: number;
  first_visit: string; // ISO 日期
  last_active: string; // ISO 日期
}

function loadData(): FunnelData {
  if (typeof window === "undefined") {
    return { pv_count: 0, match_count: 0, copy_prompt: 0, donate_view: 0, first_visit: "", last_active: "" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as FunnelData;
      return {
        pv_count: parsed.pv_count || 0,
        match_count: parsed.match_count || 0,
        copy_prompt: parsed.copy_prompt || 0,
        donate_view: parsed.donate_view || 0,
        first_visit: parsed.first_visit || new Date().toISOString(),
        last_active: parsed.last_active || new Date().toISOString(),
      };
    }
  } catch {
    // localStorage 不可用时静默降级
  }
  return {
    pv_count: 0,
    match_count: 0,
    copy_prompt: 0,
    donate_view: 0,
    first_visit: new Date().toISOString(),
    last_active: new Date().toISOString(),
  };
}

function saveData(data: FunnelData): void {
  if (typeof window === "undefined") return;
  try {
    data.last_active = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 静默降级
  }
}

function increment(key: keyof Omit<FunnelData, "first_visit" | "last_active">): void {
  const data = loadData();
  data[key] = (data[key] || 0) + 1;
  saveData(data);
}

export function trackPV(): void {
  increment("pv_count");
}

export function trackMatch(): void {
  increment("match_count");
}

export function trackCopyPrompt(): void {
  increment("copy_prompt");
}

export function trackDonateView(): void {
  increment("donate_view");
}

export function getFunnelData(): FunnelData {
  return loadData();
}

// 判断是否为管理员暗门访问
export function isAdminMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("admin") === "true";
}
