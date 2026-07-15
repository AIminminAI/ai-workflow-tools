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
  comparison: string;
}

// ============ AI 工具数据库（20 款工具） ============

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
  {
    id: "doubao",
    name: "豆包",
    emoji: "🫘",
    category: "对话推理",
    desc: "字节跳动 AI 助手，免费好用，对话/写作/翻译都能做",
    pricing: "免费",
    region: "国内",
    url: "https://www.doubao.com",
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
  { id: "student", name: "学生/考研", emoji: "🎓" },
  { id: "office", name: "上班族/职场", emoji: "�" },
  { id: "content", name: "自媒体/博主", emoji: "📱" },
  { id: "ecommerce", name: "电商/卖货", emoji: "🛒" },
  { id: "design", name: "设计/创意", emoji: "🎨" },
  { id: "software", name: "程序员/开发", emoji: "�" },
  { id: "manufacturing", name: "工程/制造", emoji: "�" },
  { id: "finance", name: "财务/数据", emoji: "💰" },
  { id: "medical", name: "医疗/健康", emoji: "⚕️" },
  { id: "legal", name: "法律/合同", emoji: "⚖️" },
  { id: "education", name: "教师/培训", emoji: "�" },
  { id: "other", name: "其他", emoji: "🔧" },
];

// ============ 需求列表 ============

export const TASKS: TaskType[] = [
  {
    id: "principle",
    name: "学新东西",
    emoji: "📖",
    desc: "想学会某个知识或技能",
  },
  {
    id: "frontier",
    name: "查资料/了解",
    emoji: "🔭",
    desc: "想了解某个话题或最新动态",
  },
  {
    id: "problem",
    name: "解决问题",
    emoji: "🧩",
    desc: "遇到具体问题需要答案",
  },
  {
    id: "coding",
    name: "写代码",
    emoji: "💻",
    desc: "编程、调试、优化程序",
  },
  {
    id: "data",
    name: "算数/分析",
    emoji: "📊",
    desc: "数据处理、计算、做表格",
  },
  {
    id: "content",
    name: "写文案/营销",
    emoji: "✍️",
    desc: "写广告、文案、推广内容",
  },
  {
    id: "document",
    name: "写报告/文档",
    emoji: "📝",
    desc: "写报告、总结、整理资料",
  },
  {
    id: "image",
    name: "做图/设计",
    emoji: "🎨",
    desc: "生成图片、设计、P图",
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
  student: "学习方法 考研备考 论文写作 知识理解",
  office: "职场效率 报告写作 PPT制作 邮件沟通",
  content: "小红书爆款 短视频算法 内容创作 流量增长",
  ecommerce: "电商选品 商品图 详情页 广告投放",
  design: "设计灵感 创意工具 配色排版 品牌设计",
  software: "编程学习 技术选型 系统设计 性能优化",
  manufacturing: "工程制造 生产优化 质量管理 工业自动化",
  finance: "财务分析 数据处理 报表制作 投资理财",
  medical: "医学知识 健康科普 用药指南 临床研究",
  legal: "法律法规 合同审查 知识产权 合规风险",
  education: "教学备课 课件制作 出题评分 教育方法",
  other: "学习 技能提升 效率工具 实用技巧",
};

// 行业 → 专属建议
const INDUSTRY_TIPS: Record<string, string[]> = {
  student: [
    "写论文先用 Kimi 上传参考文档，让 AI 帮你总结要点和列大纲",
    "考研政治/专业课用 DeepSeek 免费问答，不花钱也能学到",
    "查学术资料用 Consensus 搜论文，自动总结研究结论",
  ],
  office: [
    "写报告/总结用 Claude，上传资料自动生成结构化文档",
    "做 PPT 大纲用 ChatGPT，先出框架再填充内容",
    "翻译邮件/文档用通义千问，中英互译免费又准确",
  ],
  content: [
    "爆款选题用 Perplexity 搜热点，ChatGPT 生成脚本",
    "配图用 Midjourney，视频用 Runway + 剪映",
    "小红书/抖音算法变化用秘塔 AI 搜索追踪",
  ],
  ecommerce: [
    "选品用 Perplexity 搜市场趋势，用 ChatGPT 分析竞品评论",
    "产品图用 Midjourney 生成 + Photoroom 抠白底",
    "商品文案用 Claude 写，多语言翻译用通义千问",
  ],
  design: [
    "找设计灵感用 Midjourney 生成参考图，再用 PS 精修",
    "配色方案用 ChatGPT 推荐，说清风格和场景",
    "品牌 Logo 用 Midjourney 出多个方案再挑选",
  ],
  software: [
    "写代码用 Cursor（AI 原生 IDE），能理解整个项目",
    "代码补全用 GitHub Copilot，编程效率翻倍",
    "技术难题用 ChatGPT o1 深度推理，逐步分析给方案",
  ],
  manufacturing: [
    "生产优化方案用 ChatGPT 做推理分析",
    "PLC/设备编程问题用 Cursor + Claude",
    "生产数据用 DeepSeek 做统计分析（免费且强）",
  ],
  finance: [
    "财报分析用 Kimi 上传年报 PDF 自动提取数据",
    "计算建模用 Wolfram Alpha，公式精确不出错",
    "法规更新用 Perplexity 实时搜索",
  ],
  medical: [
    "查医学资料用 Consensus 搜论文，自动总结结论",
    "健康科普用 ChatGPT 写，通俗易懂",
    "注意：患者隐私信息切勿上传到任何在线 AI",
  ],
  legal: [
    "合同审查用 Claude 上传合同 PDF，AI 标注风险条款",
    "查法规用秘塔 AI 搜索中文法条",
    "案例检索用 Consensus 搜法学论文",
  ],
  education: [
    "备课用 Claude 生成教案，支持上传教材 PDF",
    "出题用 ChatGPT 按知识点生成练习题",
    "课件配图用 Midjourney，让课件更生动",
  ],
  other: [
    "先用 Perplexity 搜索你想了解的话题",
    "再用 Kimi 上传资料让 AI 总结要点",
    "最后用 ChatGPT 针对具体问题深入分析",
  ],
};

// 任务 → 主力工具推荐理由（含与 DeepSeek 的功能差异对比，证明推荐合理性）
const TASK_REASON: Record<string, string> = {
  principle: "Kimi 专做长文档，200 万字上下文能一次读完一整本教材+笔记；DeepSeek 也能读但长文总结 Kimi 更专业",
  frontier: "Perplexity 是 AI 搜索引擎，实时联网+自动带来源；DeepSeek 不能联网，查最新动态必须用 Perplexity",
  problem: "ChatGPT o1 是深度推理模型，复杂逻辑/科研难题分析更稳；DeepSeek R1 也能推理但 o1 在难题上更准",
  coding: "Cursor 是 AI 原生 IDE，能读懂整个项目并直接改代码；DeepSeek 只能对话问答，改大项目 Cursor 效率高得多",
  data: "Wolfram Alpha 是专用计算引擎，公式计算精确不出错；DeepSeek 是大语言模型，算复杂公式可能出错",
  content: "ChatGPT 4o 多模态强，能写文案+生图+做语音；DeepSeek 只能文字，做内容创作 ChatGPT 更全能",
  document: "Claude Opus 是长文档分析之王，20 万字上下文；DeepSeek 写文档不错但深度分析不如 Claude",
  image: "Midjourney 是 AI 绘图天花板；DeepSeek 根本不能画图，必须用 Midjourney",
};

// 任务 → 与 DeepSeek 的功能差异对比（证明为什么不用 DeepSeek）
const TASK_COMPARISON: Record<string, string> = {
  principle: "DeepSeek 也能读文档，但 Kimi 专注长文档场景，200 万字上下文能一次读完一整本教材+笔记不漏内容。如果你只读几页短文档，DeepSeek 够用；要读长资料，Kimi 更靠谱。",
  frontier: "DeepSeek 不能联网搜索，知识有截止日期。Perplexity 实时联网+自动带引用来源，查'2026 年最新政策''昨天刚发布的新闻'这类信息必须用 Perplexity，DeepSeek 给不出实时答案。",
  problem: "DeepSeek R1 推理能力已经很强（AIME 数学竞赛接近 o1），但 o1 在超复杂科研难题、多步逻辑链上仍略胜一筹。普通问题用 DeepSeek R1 免费就够；难题要追求最高准确率，用 o1。",
  coding: "DeepSeek 只能对话问答，你得手动复制粘贴代码。Cursor 能直接打开你的整个项目，AI 自动理解项目结构、定位 bug、直接改文件。改小问题 DeepSeek 够用；改整个项目，Cursor 效率高 10 倍。",
  data: "DeepSeek 是大语言模型，算复杂公式可能算错（这是 LLM 通病）。Wolfram Alpha 是专用计算引擎，公式计算 100% 精确。算'∫sin(x²)dx'这种，DeepSeek 可能给你错的答案，Wolfram Alpha 不会。",
  content: "DeepSeek 只能输出文字。ChatGPT 4o 能写文案+直接生成配图+做语音旁白，一条龙搞定。做小红书图文/短视频脚本，ChatGPT 4o 比 DeepSeek 全能得多。",
  document: "DeepSeek 写短文档不错，但分析超长报告（年报/合同/论文集）容易漏信息。Claude Opus 支持 20 万字上下文，能一次吃透整份年报，深度分析更强。写短总结用 DeepSeek；分析长文档用 Claude。",
  image: "DeepSeek 根本不能画图（它是文字模型）。做商品主图、设计图、插画，必须用 Midjourney。这是功能差异，不是'谁更好'的问题——DeepSeek 干不了这活。",
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
  const comparison = TASK_COMPARISON[taskId] || TASK_COMPARISON.principle;

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
    comparison,
  };
}
