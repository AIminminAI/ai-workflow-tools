// ============================================================
//  配方数据 - 在此处添加或修改你的 AI 工作流配方
//
//  ⚠️ 安全说明：
//    hiddenPrompt 和 hiddenToolUrl 均已使用 Base64 编码存储，
//    防止用户直接通过 F12 开发者工具查看明文白嫖。
//    使用 decode() 函数在解锁后动态解码展示。
//
//  字段说明：
//    id            - 唯一标识（数字）
//    role          - 适用身份
//    budget        - 预算倾向
//    target        - 目标产出
//    title         - 配方名称
//    tools         - 组合拳工具链（数组）
//    steps         - 步骤拆解（数组）
//    hiddenPrompt  - 独家 Prompt（Base64 编码）
//    hiddenTool    - 隐藏工具显示名称（明文）
//    hiddenToolUrl - 隐藏工具链接（Base64 编码）
//    activationHash - 激活码的 SHA-256 哈希值（用户付款后获得激活码，
//                     前端用 Web Crypto API 计算输入值的哈希并比对，
//                     F12 无法从哈希反推出原始激活码）
//    isLocked      - 是否默认锁定
// ============================================================

export interface Recipe {
  id: number;
  role: string;
  budget: string;
  target: string;
  title: string;
  tools: string[];
  steps: string[];
  hiddenPrompt: string;
  hiddenTool: string;
  hiddenToolUrl: string;
  activationHash: string;
  isLocked: boolean;
}

/**
 * 解码 Base64 编码的字符串（Unicode 安全）
 * 用于在卡片解锁后动态还原 hiddenPrompt 和 hiddenToolUrl
 */
export function decode(encoded: string): string {
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return "";
  }
}

/**
 * 计算字符串的 SHA-256 哈希值（使用 Web Crypto API）
 * 用于验证用户输入的激活码是否正确
 */
export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const recipes: Recipe[] = [
  {
    id: 1,
    role: "小红书博主",
    budget: "性价比狂魔",
    target: "量产爆款配图",
    title: "3分钟搞定小红书爆款商品白底图",
    tools: ["Midjourney", "Magnific AI", "剪映"],
    steps: [
      "Midjourney 输入商品描述生成高质量主图，使用 --v 6 --style raw 获得真实质感",
      "Magnific AI 放大至 4K 并增强材质细节，让商品纹理清晰可见",
      "剪映批量套用白底模板，添加价格标签与品牌水印，一键导出 9:16 竖图",
    ],
    hiddenPrompt:
      "UHJvZHVjdCUyMHBob3RvZ3JhcGh5JTIwb2YlMjAlNUIlRTUlOTUlODYlRTUlOTMlODElRTUlOTAlOEQlRTclQTclQjAlNUQlMkMlMjBwbGFjZWQlMjBvbiUyMHB1cmUlMjB3aGl0ZSUyMGJhY2tncm91bmQlMkMlMjBzb2Z0JTIwc3R1ZGlvJTIwbGlnaHRpbmclMjBmcm9tJTIwdG9wLWxlZnQlMkMlMjBzaGFsbG93JTIwZGVwdGglMjBvZiUyMGZpZWxkJTJDJTIwdWx0cmEtZGV0YWlsZWQlMjBtYXRlcmlhbCUyMHRleHR1cmUlMkMlMjBjb21tZXJjaWFsJTIwYWR2ZXJ0aXNpbmclMjBzdHlsZSUyQyUyMDhLJTIwcmVzb2x1dGlvbiUyQyUyMC0tYXIlMjA5JTNBMTYlMjAtLXYlMjA2JTIwLS1zdHlsZSUyMHJhdyUyMC0tcyUyMDI1MA==",
    hiddenTool: "Magnific AI 官方直达（新用户送 20 积分）",
    hiddenToolUrl: "aHR0cHMlM0ElMkYlMkZtYWduaWZpYy5haQ==",
    activationHash:
      "b1e5c30b9bb005b1f14f93e06467c28c2dbaa89c766ee914399ad326da72164e",
    isLocked: false,
  },
  {
    id: 2,
    role: "自媒体剪辑师",
    budget: "性价比狂魔",
    target: "AI 视频一键生成",
    title: "AI 视频一键生成：从文案到成片全自动",
    tools: ["ChatGPT", "Runway", "剪映"],
    steps: [
      "ChatGPT 根据主题生成分镜脚本与口播文案，控制总时长在 60 秒以内",
      "Runway Gen-3 根据分镜描述逐个生成 5-8 秒视频片段，保持画面风格统一",
      "剪映自动拼接片段，AI 配音 + 动态字幕 + 转场特效一键套用导出",
    ],
    hiddenPrompt:
      "JUU0JUJEJUEwJUU2JTk4JUFGJUU0JUI4JTgwJUU0JUJEJThEJUU4JUI1JTg0JUU2JUI3JUIxJUU3JTlGJUFEJUU4JUE3JTg2JUU5JUEyJTkxJUU3JUJDJTk2JUU1JUFGJUJDJUUzJTgwJTgyJUU4JUFGJUI3JUU1JTlCJUI0JUU3JUJCJTk1JUU0JUI4JUJCJUU5JUEyJTk4JUUzJTgwJThDJTVCJUU4JUJFJTkzJUU1JTg1JUE1JUU0JUJEJUEwJUU3JTlBJTg0JUU0JUI4JUJCJUU5JUEyJTk4JTVEJUUzJTgwJThEJUU3JTk0JTlGJUU2JTg4JTkwJUU0JUI4JTgwJUU2JTlEJUExJTIwNjAlMjAlRTclQTclOTIlRTclQUIlOTYlRTUlQjElOEYlRTclOUYlQUQlRTglQTclODYlRTklQTIlOTElRTUlODglODYlRTklOTUlOUMlRTglODQlOUElRTYlOUMlQUMlRTMlODAlODIlRTglQTYlODElRTYlQjElODIlRUYlQkMlOUExJUVGJUJDJTg5JUU4JUJFJTkzJUU1JTg3JUJBJTIwNi04JTIwJUU0JUI4JUFBJUU1JTg4JTg2JUU5JTk1JTlDJUVGJUJDJThDJUU2JUFGJThGJUU0JUI4JUFBJUU1JTkwJUFCJUU3JTk0JUJCJUU5JTlEJUEyJUU2JThGJThGJUU4JUJGJUIwJUUzJTgwJTgxJUU1JThGJUEzJUU2JTkyJUFEJUU2JTk2JTg3JUU2JUExJTg4JUUzJTgwJTgxJUU2JTk3JUI2JUU5JTk1JUJGJUVGJUJDJTlCMiVFRiVCQyU4OSVFNSU4RiVBMyVFNiU5MiVBRCVFNiU5NiU4NyVFNiVBMSU4OCVFNSU4RiVBMyVFOCVBRiVBRCVFNSU4QyU5NiVFMyU4MCU4MSVFNiU5QyU4OSVFOSU5MiVBOSVFNSVBRCU5MCVFMyU4MCU4MSVFOCU4QSU4MiVFNSVBNSU4RiVFNyVCNCVBNyVFNSU4NyU5MSVFRiVCQyU5QjQlRUYlQkMlODklRTUlQkMlODAlRTUlQTQlQjQlMjAzJTIwJUU3JUE3JTkyJUU1JUJGJTg1JUU5JUExJUJCJUU2JTlDJTg5JUU1JUJDJUJBJUU1JTg2JUIyJUU3JUFBJTgxJUU5JTkyJUE5JUU1JUFEJTkwJUUzJTgwJTgyJUU0JUJCJUE1JUU4JUExJUE4JUU2JUEwJUJDJUU1JUJEJUEyJUU1JUJDJThGJUU4JUJFJTkzJUU1JTg3JUJBJUUzJTgwJTgy",
    hiddenTool: "Runway Gen-3 Alpha 体验入口",
    hiddenToolUrl: "aHR0cHMlM0ElMkYlMkZydW53YXltbC5jb20=",
    activationHash:
      "b9ca69b983ed63667e67f82fe91bd674dfb1445bc97b0b5eefc45ec1d77cead7",
    isLocked: false,
  },
  {
    id: 3,
    role: "跨境电商卖家",
    budget: "追求极致效果",
    target: "量产爆款配图",
    title: "跨境电商亚马逊爆款主图工业化量产",
    tools: ["Midjourney", "Photoroom", "Canva"],
    steps: [
      "Midjourney 生成多场景产品使用图，覆盖生活方式与纯白底两种风格",
      "Photoroom AI 一键抠图换背景，批量输出亚马逊合规白底主图",
      "Canva 套用主图模板，添加卖点图标与 A+ 页面，导出 2000×2000 高清图",
    ],
    hiddenPrompt:
      "RS1jb21tZXJjZSUyMHByb2R1Y3QlMjBoZXJvJTIwc2hvdCUyMG9mJTIwJTVCJUU0JUJBJUE3JUU1JTkzJTgxJUU1JTkwJThEJUU3JUE3JUIwJTVEJTJDJTIwbGlmZXN0eWxlJTIwc2NlbmUlMjB3aXRoJTIwbmF0dXJhbCUyMHByb3BzJTJDJTIwd2FybSUyMGNpbmVtYXRpYyUyMGxpZ2h0aW5nJTJDJTIwc2hhbGxvdyUyMGRlcHRoJTIwb2YlMjBmaWVsZCUyQyUyMHByZW1pdW0lMjBicmFuZCUyMGFlc3RoZXRpYyUyQyUyMEFtYXpvbiUyMG1haW4lMjBpbWFnZSUyMHN0eWxlJTJDJTIwdWx0cmElMjBjbGVhbiUyMGNvbXBvc2l0aW9uJTJDJTIwOEslMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjAtLWFyJTIwMSUzQTElMjAtLXYlMjA2JTIwLS1zJTIwNDAwJTIwLS1xJTIwMg==",
    hiddenTool: "Photoroom 批量处理入口（免费额度充足）",
    hiddenToolUrl: "aHR0cHMlM0ElMkYlMkZ3d3cucGhvdG9yb29tLmNvbQ==",
    activationHash:
      "072bd6fe92341819b5c27b3907060a594c1877672b9f8279eecc512e9dabb004",
    isLocked: false,
  },
];

// 筛选选项配置（只保留有对应配方的选项，杜绝假选项）
export const filterOptions = {
  roles: ["小红书博主", "跨境电商卖家", "自媒体剪辑师"],
  budgets: ["性价比狂魔", "追求极致效果"],
  targets: ["量产爆款配图", "AI 视频一键生成"],
};
