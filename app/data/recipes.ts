// ============================================================
//  配方数据 - 实战 AI 工作流配方
//
//  字段说明：
//    id            - 唯一标识（数字）
//    role          - 适用身份
//    budget        - 预算倾向
//    target        - 目标产出
//    title         - 配方名称
//    tools         - 组合拳工具链（数组）
//    steps         - 步骤拆解（数组）
//    prompt        - 实战 Prompt 模板（明文存储，全部免费）
//    extraToolName - 配套工具显示名称（明文）
//    extraToolUrl  - 配套工具链接（明文）
// ============================================================

export interface Recipe {
  id: number;
  role: string;
  budget: string;
  target: string;
  title: string;
  tools: string[];
  steps: string[];
  prompt: string;
  extraToolName: string;
  extraToolUrl: string;
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
    prompt:
      "Product photography of [商品名称], placed on pure white background, soft studio lighting from top-left, shallow depth of field, ultra-detailed material texture, commercial advertising style, 8K resolution, --ar 9:16 --v 6 --style raw --s 250",
    extraToolName: "Magnific AI 官网",
    extraToolUrl: "https://magnific.ai",
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
      "Runway 根据分镜描述逐个生成 5-8 秒视频片段，保持画面风格统一",
      "剪映自动拼接片段，AI 配音 + 动态字幕 + 转场特效一键套用导出",
    ],
    prompt:
      "请帮我生成一个60秒短视频脚本，主题是[你的主题]。要求：1) 开头3秒抓人眼球 2) 中间分3-4个分镜，每镜给出画面描述（用于AI生视频）和口播文案 3) 结尾有明确行动号召。格式：分镜1｜画面描述｜口播文案｜时长",
    extraToolName: "Runway 官网",
    extraToolUrl: "https://runwayml.com",
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
    prompt:
      "E-commerce product hero shot of [商品名称], lifestyle scene with natural props, warm cinematic lighting, shallow depth of field, premium brand aesthetic, Amazon main image style, ultra-clean composition, 8K product photography --ar 1:1 --v 6 --s 400 --q 2",
    extraToolName: "Photoroom 官网",
    extraToolUrl: "https://photoroom.com",
  },
];

// 筛选选项配置（只保留有对应配方的选项，杜绝假选项）
export const filterOptions = {
  roles: ["小红书博主", "跨境电商卖家", "自媒体剪辑师"],
  budgets: ["性价比狂魔", "追求极致效果"],
  targets: ["量产爆款配图", "AI 视频一键生成"],
};
