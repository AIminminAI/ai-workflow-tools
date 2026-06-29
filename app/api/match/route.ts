import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// AI API 配置：默认使用硅基流动 SiliconFlow 免费模型 Qwen2.5-7B（不消耗余额）
// 用户也可通过环境变量 AI_MODEL 切换其他模型
const AI_API_URL =
  process.env.AI_API_URL || "https://api.siliconflow.cn/v1/chat/completions";
const AI_API_KEY = process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "Qwen/Qwen2.5-7B-Instruct";

const SYSTEM_PROMPT = `你是AI工具选型专家。根据用户的行业、需求、预算，推荐最适合的AI工具组合。

原则：
1. 中立推荐，基于工具实际能力，不要因为自己是某AI就推荐自己
2. 解释为什么推荐，具体到能力点（如"Kimi支持200万字上下文"）
3. 给出可执行工作流（每步用哪个工具做什么）
4. 行业合规提醒（如涉密数据禁止上传在线AI、医疗隐私脱敏）
5. 预算有限时优先免费工具，标注是否免费

只返回JSON，不要其他内容：
{
  "primary": {"name":"首选工具","reason":"为什么适合（2句话，具体到能力点）","url":"官网链接"},
  "secondary": [{"name":"搭配工具","reason":"互补关系（1句话）","url":"官网链接"}],
  "workflow": ["第1步：用X做Y，产出Z","第2步：...","第3步：..."],
  "tips": ["行业建议1","行业建议2","行业建议3"],
  "comparison": "相比直接问单个AI，这个组合的优势（1句话，要具体）"
}`;

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

    // 9 秒超时：在 Vercel Edge Function 10 秒超时前主动 abort，返回错误让前端降级
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    let response;
    try {
      response = await fetch(AI_API_URL, {
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
        max_tokens: 900,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      // 超时或网络错误：返回 fallback 标记，触发前端降级
      return NextResponse.json(
        { error: "AI 响应超时，请稍后重试", fallback: true },
        { status: 504 }
      );
    }

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
