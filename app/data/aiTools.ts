// AI 工具数据库 + 智能匹配引擎

export interface AITool {
  id: string;
  name: string;
  emoji: string;
  category: "对话推理" | "搜索研究" | "编程开发" | "图像生成" | "视频创作" | "学术文献" | "数学计算";
  desc: string;
  pricing: "免费" | "免费+付费" | "付费";
  region: "国内" | "国际" | "都可用";
  url: string;
}

export interface Industry {
  id: string;
  name: string;
  emoji: string;
}

export interface TaskType {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

export interface MatchResult {
  primary: AITool;
  primaryReason: string;
  secondary: AITool[];
  workflow: string[];
  tips: string[];
  searchPrompt: string;
}

// ============ AI 工具数据库（20+ 工具） ============

export const AI_TOOLS: AITool[] = [
  // 对话推理类
  {
    id: "chatgpt-4o",
    name: "ChatGPT (GPT-4o)",
    emoji: "🤖",
    category: "对话推理",
    desc: "OpenAI 旗舰模型，通用能力最强，支持文字/图片/语音多模态",
    pricing: "免费+付费",
    region: "国际",
    url: "https://chatgpt.com",
  },
  {
    id: "chatgpt-o1",
    name: "ChatGPT (o1/o3)",
    emoji: "🧠",
    category: "对话推理",
    desc: "OpenAI 深度推理模型，擅长复杂数学、科研、逻辑链分析",
    pricing: "付费",
    region: "国际",
    url: "https://chatgpt.com",
  },
  {
    id: "claude-opus",
    name: "Claude (Opus)",
    emoji: "📚",
    category: "对话推理",
    desc: "Anthropic 旗舰，超长文档分析（20万字+）、深度写作最强",
    pricing: "付费",
    region: "国际",
    url: "https://claude.ai",
  },
  {
    id: "claude-sonnet",
    name: "Claude (Sonnet)",
    emoji: "⚡",
    category: "对话推理",
    desc: "Anthropic 快速模型，编程与代码分析能力顶尖",
    pricing: "免费+付费",
    region: "国际",
    url: "https://claude.ai",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek (R1)",
    emoji: "💎",
    category: "对话推理",
    desc: "国产开源推理模型，数学/编程/逻辑比肩 o1，完全免费",
    pricing: "免费",
    region: "国内",
    url: "https://chat.deepseek.com",
  },
  {
    id: "kimi",
    name: "Kimi (月之暗面)",
    emoji: "🌙",
    category: "对话推理",
    desc: "中文长文档之王，支持 200 万字超长上下文，PDF/网页直接读",
    pricing: "免费",
    region: "国内",
    url: "https://kimi.moonshot.cn",
  },
  {
    id: "glm",
    name: "智谱清言 (GLM-4)",
    emoji: "🔮",
    category: "对话推理",
    desc: "清华系国产大模型，中文理解强，支持文档/图片/代码",
    pricing: "免费",
    region: "国内",
    url: "https://chatglm.cn",
  },
  {
    id: "qwen",
    name: "通义千问",
    emoji: "🌐",
    category: "对话推理",
    desc: "阿里大模型，中文+代码能力均衡，免费可用",
    pricing: "免费",
    region: "国内",
    url: "https://tongyi.aliyun.com",
  },

  // 搜索研究类
  {
    id: "perplexity",
    name: "Perplexity",
    emoji: "🔍",
    category: "搜索研究",
    desc: "AI 搜索引擎，实时联网+引用来源，研究类问题首选",
    pricing: "免费+付费",
    region: "国际",
    url: "https://perplexity.ai",
  },
  {
    id: "metaso",
    name: "秘塔 AI 搜索",
    emoji: "🇨🇳",
    category: "搜索研究",
    desc: "国产 AI 搜索，中文资料覆盖全，无墙免费，自动生成报告",
    pricing: "免费",
    region: "国内",
    url: "https://metaso.cn",
  },

  // 编程开发类
  {
    id: "cursor",
    name: "Cursor",
    emoji: "💻",
    category: "编程开发",
    desc: "AI 原生编程 IDE，整项目代码理解+重构，程序调试最强",
    pricing: "免费+付费",
    region: "都可用",
    url: "https://cursor.com",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    emoji: "🐙",
    category: "编程开发",
    desc: "代码补全助手，支持 VS Code/JetBrains，按 Tab 自动补全",
    pricing: "付费",
    region: "都可用",
    url: "https://github.com/features/copilot",
  },

  // 图像生成类
  {
    id: "midjourney",
    name: "Midjourney",
    emoji: "🎨",
    category: "图像生成",
    desc: "AI 绘图天花板，质感与美感最强，适合设计/营销图",
    pricing: "付费",
    region: "国际",
    url: "https://midjourney.com",
  },
  {
    id: "photoroom",
    name: "Photoroom",
    emoji: "🖼️",
    category: "图像生成",
    desc: "AI 一键抠图换背景，电商/产品图批量化最强",
    pricing: "免费+付费",
    region: "都可用",
    url: "https://photoroom.com",
  },

  // 视频创作类
  {
    id: "runway",
    name: "Runway",
    emoji: "🎬",
    category: "视频创作",
    desc: "AI 视频生成，文字/图片转视频，Gen-3 模型质量高",
    pricing: "免费+付费",
    region: "国际",
    url: "https://runwayml.com",
  },
  {
    id: "jianying",
    name: "剪映",
    emoji: "✂️",
    category: "视频创作",
    desc: "抖音系剪辑工具，AI 配音/字幕/模板一键套用",
    pricing: "免费",
    region: "国内",
    url: "https://jianying.com",
  },

  // 学术文献类
  {
    id: "consensus",
    name: "Consensus",
    emoji: "📄",
    category: "学术文献",
    desc: "AI 学术论文搜索引擎，2亿+论文库，自动总结研究结论",
    pricing: "免费+付费",
    region: "国际",
    url: "https://consensus.app",
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    emoji: "📓",
    category: "学术文献",
    desc: "Google 文档分析工具，上传 PDF 自动生成摘要/问答/播客",
    pricing: "免费",
    region: "国际",
    url: "https://notebooklm.google.com",
  },

  // 数学计算类
  {
    id: "wolfram",
    name: "Wolfram Alpha",
    emoji: "🔢",
    category: "数学计算",
    desc: "计算知识引擎，数学/物理/工程公式计算与可视化",
    pricing: "免费+付费",
    region: "都可用",
    url: "https://wolframalpha.com",
  },
];

// ============ 行业列表 ============

export const INDUSTRIES: Industry[] = [
  { id: "aerospace", name: "航天航空", emoji: "🚀" },
  { id: "rail", name: "火车/轨道交通", emoji: "🚄" },
  { id: "mining", name: "矿产/采矿", emoji: "⛏️" },
  { id: "manufacturing", name: "制造业", emoji: "🏭" },
  { id: "ecommerce", name: "电商/跨境", emoji: "🛒" },
  { id: "content", name: "自媒体/内容", emoji: "📱" },
  { id: "education", name: "教育/科研", emoji: "🎓" },
  { id: "finance", name: "金融/财务", emoji: "💰" },
  { id: "medical", name: "医疗/健康", emoji: "⚕️" },
  { id: "legal", name: "法律/合规", emoji: "⚖️" },
  { id: "software", name: "软件/IT", emoji: "💻" },
  { id: "other", name: "其他行业", emoji: "🔧" },
];

// ============ 需求列表 ============

export const TASKS: TaskType[] = [
  {
    id: "principle",
    name: "理解原理/学习",
    emoji: "📖",
    desc: "想搞懂某个技术/概念的底层原理",
  },
  {
    id: "frontier",
    name: "了解前沿/研究",
    emoji: "🔭",
    desc: "追踪行业最新技术动态与论文",
  },
  {
    id: "problem",
    name: "解决技术难题",
    emoji: "🧩",
    desc: "遇到具体的工程/技术问题需要方案",
  },
  {
    id: "coding",
    name: "编程/图纸问题",
    emoji: "💻",
    desc: "代码调试、程序优化、图纸分析",
  },
  {
    id: "data",
    name: "数据分析/计算",
    emoji: "📊",
    desc: "数据处理、公式计算、建模仿真",
  },
  {
    id: "content",
    name: "内容创作/营销",
    emoji: "✍️",
    desc: "写文案、做图、做视频、搞推广",
  },
  {
    id: "document",
    name: "文档/报告写作",
    emoji: "📝",
    desc: "写报告、整理资料、翻译文档",
  },
  {
    id: "image",
    name: "图像/设计处理",
    emoji: "🎨",
    desc: "产品图、设计图、效果图生成与编辑",
  },
];

// ============ 匹配引擎 ============

// 任务 → 主力工具 ID 映射
const TASK_PRIMARY: Record<string, string> = {
  principle: "kimi",
  frontier: "perplexity",
  problem: "chatgpt-o1",
  coding: "cursor",
  data: "wolfram",
  content: "chatgpt-4o",
  document: "claude-opus",
  image: "midjourney",
};

// 任务 → 辅助工具 ID 列表
const TASK_SECONDARY: Record<string, string[]> = {
  principle: ["perplexity", "chatgpt-4o", "glm"],
  frontier: ["consensus", "metaso", "notebooklm"],
  problem: ["deepseek-r1", "claude-opus", "perplexity"],
  coding: ["claude-sonnet", "deepseek-r1", "copilot"],
  data: ["chatgpt-4o", "deepseek-r1", "kimi"],
  content: ["midjourney", "runway", "jianying"],
  document: ["kimi", "chatgpt-4o", "qwen"],
  image: ["photoroom", "chatgpt-4o", "qwen"],
};

// 任务 → 工作流
const TASK_WORKFLOW: Record<string, string[]> = {
  principle: [
    "第 1 步：用 Kimi 上传相关 PDF/文档，让 AI 用大白话解释原理",
    "第 2 步：用 Perplexity 搜索该原理的最新应用案例",
    "第 3 步：用 ChatGPT 追问细节，生成可操作的学习笔记",
  ],
  frontier: [
    "第 1 步：用 Perplexity 搜索行业关键词 + 'latest 2025/2026'",
    "第 2 步：用 Consensus 搜索相关学术论文，自动总结研究结论",
    "第 3 步：用 NotebookLM 上传多篇论文，生成综合研究报告",
  ],
  problem: [
    "第 1 步：用 ChatGPT o1 描述你的问题，让它做深度推理分析",
    "第 2 步：用 DeepSeek R1 免费做交叉验证（国产免费推理模型）",
    "第 3 步：用 Perplexity 搜索类似问题的已知解决方案",
  ],
  coding: [
    "第 1 步：用 Cursor 打开你的代码项目，AI 自动理解整个项目结构",
    "第 2 步：在 Cursor 中描述问题，AI 定位 bug 并给出修复方案",
    "第 3 步：用 Claude Sonnet 做代码审查，优化性能与可维护性",
  ],
  data: [
    "第 1 步：用 Wolfram Alpha 做精确公式计算与可视化",
    "第 2 步：用 ChatGPT 4o 编写 Python 数据处理脚本",
    "第 3 步：用 DeepSeek R1 验证计算结果的正确性",
  ],
  content: [
    "第 1 步：用 ChatGPT 4o 生成文案/脚本框架",
    "第 2 步：用 Midjourney 生成配图，用 Runway 生成视频片段",
    "第 3 步：用剪映拼接成片，AI 配音+字幕一键导出",
  ],
  document: [
    "第 1 步：用 Claude Opus 上传所有参考资料，生成报告大纲",
    "第 2 步：用 Kimi 阅读超长文档，提取关键数据与结论",
    "第 3 步：用通义千问做中文润色与翻译",
  ],
  image: [
    "第 1 步：用 Midjourney 生成高质量设计图/产品图",
    "第 2 步：用 Photoroom 一键抠图换背景",
    "第 3 步：用 ChatGPT 4o 分析图片并优化构图",
  ],
};

// 行业 → 搜索提示词
const INDUSTRY_PROMPT: Record<string, string> = {
  aerospace: "航天航空 结构强度 热防护 推进系统 最新技术",
  rail: "轨道交通 列车门系统 信号控制 轨道检测 技术标准",
  mining: "采矿工程 矿山安全 选矿工艺 智能矿山 行业前沿",
  manufacturing: "智能制造 工业自动化 生产线优化 数字孪生",
  ecommerce: "跨境电商 选品策略 Listing优化 广告投放",
  content: "小红书爆款 短视频算法 内容创作 流量增长",
  education: "教学方法 教育技术 学习科学 课程设计",
  finance: "财务分析 风险管理 投资策略 金融科技",
  medical: "医学前沿 临床研究 药物开发 医疗AI",
  legal: "法律法规 合规审查 合同风险 知识产权",
  software: "软件架构 系统设计 性能优化 技术选型",
  other: "行业技术 原理 应用案例 最新趋势",
};

// 行业 → 专属建议
const INDUSTRY_TIPS: Record<string, string[]> = {
  aerospace: [
    "航天领域涉密内容多，切勿将涉密资料上传到任何在线 AI，只输入公开技术原理",
    "结构/热力学计算推荐 Wolfram Alpha + DeepSeek R1 交叉验证",
    "追踪前沿用 Consensus 搜 AIAA/IEEE 学术论文",
  ],
  rail: [
    "列车门系统涉及安全标准（EN 45545 等），用 Perplexity 搜索最新标准更新",
    "图纸/PLC 程序问题用 Cursor 打开代码直接调试",
    "行业前沿关注 IRSE（国际铁路信号工程师协会）相关动态",
  ],
  mining: [
    "矿山安全规程严格，用 Kimi 上传安全规程 PDF 让 AI 帮你快速检索条款",
    "选矿工艺参数计算用 Wolfram Alpha",
    "智能矿山前沿用秘塔 AI 搜索中文资料，Perplexity 搜英文论文",
  ],
  manufacturing: [
    "数字孪生/工业仿真用 ChatGPT o1 做方案推理",
    "PLC/SCADA 编程问题用 Cursor + Claude Sonnet",
    "生产数据用 DeepSeek R1 做统计分析（免费且强）",
  ],
  ecommerce: [
    "选品用 Perplexity 搜市场趋势，用 ChatGPT 分析竞品评论",
    "产品图用 Midjourney 生成 + Photoroom 抠白底",
    "Listing 文案用 Claude Opus 写，多语言翻译用通义千问",
  ],
  content: [
    "爆款选题用 Perplexity 搜热点，ChatGPT 生成脚本",
    "配图用 Midjourney，视频用 Runway + 剪映",
    "小红书/抖音算法变化用秘塔 AI 搜索追踪",
  ],
  education: [
    "教学方案用 Claude Opus 生成，支持上传教材 PDF",
    "学术论文用 Consensus 搜索 + NotebookLM 综合分析",
    "课件制作用 ChatGPT 生成大纲 + Midjourney 配图",
  ],
  finance: [
    "财报分析用 Kimi 上传年报 PDF 自动提取数据",
    "建模计算用 Wolfram Alpha + DeepSeek R1",
    "法规更新用 Perplexity 实时搜索",
  ],
  medical: [
    "文献检索用 Consensus 搜 PubMed 论文，自动总结结论",
    "影像分析用 ChatGPT 4o 多模态（注意脱敏，勿上传患者信息）",
    "用药指南用 Perplexity 搜最新临床指南",
  ],
  legal: [
    "合同审查用 Claude Opus 上传合同 PDF，AI 标注风险条款",
    "法规检索用秘塔 AI 搜索中文法条，Perplexity 搜国际法",
    "案例检索用 Consensus 搜法学论文",
  ],
  software: [
    "架构设计用 ChatGPT o1 做深度推理",
    "编码用 Cursor（最强 AI IDE）+ GitHub Copilot 补全",
    "Code Review 用 Claude Sonnet",
  ],
  other: [
    "先用 Perplexity 搜索你的行业关键词，了解有哪些 AI 应用",
    "再用 Kimi 上传行业资料让 AI 总结要点",
    "最后用 ChatGPT 针对具体问题做深度分析",
  ],
};

// 任务 → 主力工具推荐理由
const TASK_REASON: Record<string, string> = {
  principle: "Kimi 支持上传 PDF/文档，用大白话解释复杂原理，中文免费无门槛",
  frontier: "Perplexity 实时联网搜索，自动引用来源，追踪前沿最快",
  problem: "ChatGPT o1 深度推理模型，擅长拆解复杂工程问题，逐步推理给出方案",
  coding: "Cursor 是 AI 原生 IDE，能理解整个项目代码，直接定位和修复 bug",
  data: "Wolfram Alpha 是专业计算引擎，数学/物理/工程公式精确计算与可视化",
  content: "ChatGPT 4o 通用能力最强，文案/脚本/策划一条龙搞定",
  document: "Claude Opus 超长文档分析之王，上传资料自动生成结构化报告",
  image: "Midjourney AI 绘图天花板，质感与美感远超其他工具",
};

function getToolById(id: string): AITool | undefined {
  return AI_TOOLS.find((t) => t.id === id);
}

function filterByBudget(
  tools: AITool[],
  budget: string
): AITool[] {
  if (budget === "free") {
    return tools.filter((t) => t.pricing === "免费" || t.pricing === "免费+付费");
  }
  if (budget === "low") {
    return tools.filter(
      (t) => t.pricing === "免费" || t.pricing === "免费+付费"
    );
  }
  return tools;
}

export function matchTools(
  industryId: string,
  taskId: string,
  budget: string
): MatchResult {
  const primaryId = TASK_PRIMARY[taskId] || "chatgpt-4o";
  const secondaryIds = TASK_SECONDARY[taskId] || ["chatgpt-4o", "kimi"];
  const workflow = TASK_WORKFLOW[taskId] || TASK_WORKFLOW.principle;
  const tips = INDUSTRY_TIPS[industryId] || INDUSTRY_TIPS.other;
  const searchPrompt = INDUSTRY_PROMPT[industryId] || INDUSTRY_PROMPT.other;
  const primaryReason = TASK_REASON[taskId] || TASK_REASON.principle;

  const primary = getToolById(primaryId) || AI_TOOLS[0];

  const secondary = secondaryIds
    .map((id) => getToolById(id))
    .filter((t): t is AITool => t !== undefined)
    .filter((t) => t.id !== primary.id);

  // 预算过滤辅助工具（主力工具不过滤，单独标注）
  const filteredSecondary = filterByBudget(secondary, budget);

  return {
    primary,
    primaryReason,
    secondary: filteredSecondary.length > 0 ? filteredSecondary : secondary,
    workflow,
    tips,
    searchPrompt,
  };
}
