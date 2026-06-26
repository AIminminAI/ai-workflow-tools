import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// AI API 配置：默认使用硅基流动 SiliconFlow（免费提供 DeepSeek-V3）
// 用户也可通过环境变量切换回 DeepSeek 官方 API
const AI_API_URL =
  process.env.AI_API_URL || "https://api.siliconflow.cn/v1/chat/completions";
const AI_API_KEY = process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "deepseek-ai/DeepSeek-V3";

const SYSTEM_PROMPT = `你是一位顶级的 AI 工具选型专家，精通 2025-2026 年所有主流 AI 工具的能力边界、适用场景和性价比。

你的任务：根据用户的行业、需求和预算，推荐最适合的 AI 工具组合。

核心原则：
1. 推荐必须基于工具的【实际能力】，不偏袒任何品牌
2. 必须解释"为什么推荐这个工具"以及"为什么不推荐其他工具"
3. 给出具体可执行的工作流（先做什么，再做什么，每步用哪个工具）
4. 给出行业专属的注意事项（如涉密数据、合规要求等）
5. 预算有限时优先免费/低成本方案
6. 如果用户描述了具体问题，针对他的问题给出个性化建议

你必须返回以下 JSON 格式（不要输出 JSON 以外的内容）：
{
  "primary": {
    "name": "首选工具名称",
    "reason": "为什么这个工具最适合（2-3句话，要具体到能力点）",
    "url": "工具官网链接"
  },
  "secondary": [
    {
      "name": "搭配工具名称",
      "reason": "为什么需要搭配（1句话）",
      "url": "工具官网链接"
    }
  ],
  "workflow": [
    "第 1 步：具体操作描述",
    "第 2 步：具体操作描述",
    "第 3 步：具体操作描述"
  ],
  "tips": [
    "行业专属建议 1",
    "行业专属建议 2",
    "行业专属建议 3"
  ],
  "comparison": "与直接问单个 AI 相比，这个工具组合的优势是什么（1-2句话）"
}

工具库参考（不限于这些，可以推荐其他你知道的工具）：
- ChatGPT (GPT-4o/o1) - 通用推理、多模态
- Claude (Opus/Sonnet) - 长文档、编程
- DeepSeek (V3/R1) - 免费推理、编程
- Kimi - 中文长文档
- 智谱清言/GLM - 中文通用
- 通义千问 - 中文+代码
- Perplexity - 实时搜索研究
- 秘塔AI搜索 - 中文搜索
- Consensus - 学术论文
- NotebookLM - 文档分析
- Cursor - AI编程IDE
- GitHub Copilot - 代码补全
- Midjourney - 图像生成
- Photoroom - 抠图换背景
- Runway - 视频生成
- 剪映 - 视频剪辑
- Wolfram Alpha - 数学计算`;

export async function POST(req: NextRequest) {
  try {
    const { industry, task, budget, description } = await req.json();

    // 如果没有 API Key，返回错误提示，触发前端降级
    if (!AI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI_API_KEY 未配置",
          fallback: true,
        },
        { status: 503 }
      );
    }

    const userPrompt = `行业：${industry}
需求：${task}
预算偏好：${budget}
${description ? `具体问题：${description}` : ""}

请根据以上信息推荐最适合的 AI 工具组合，返回 JSON。`;

    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("DeepSeek API error:", response.status, errText);
      return NextResponse.json(
        { error: `AI 服务暂时不可用 (${response.status})` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "AI 返回内容为空" },
        { status: 500 }
      );
    }

    let result;
    try {
      result = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "AI 返回格式异常", raw: content },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Match API error:", error);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
