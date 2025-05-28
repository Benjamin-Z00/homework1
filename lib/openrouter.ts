// Define types for the AI response
export interface AIResponse {
  content: string[];
  isLoading: boolean;
  error?: string;
}

// Function to get anti-procrastination responses
export async function getAntiProcrastinationResponses(
  procrastinationThought: string,
  severityLevel: number
): Promise<string[]> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_KEY || ''}`,
        'HTTP-Referer': 'https://rejectprocrastination.com',
        'X-Title': 'Reject Procrastination',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 
              '你是一位专业的反拖延教练，提供直接、有力和富有激励性的建议。' +
              '你的目标是通过深刻的心理洞察帮助用户克服拖延。' +
              '回答要简洁、有力和富有启发性。每个回应应该在2-4句话之内。' +
              '关注以下几个方面：1) 拖延的心理代价，' +
              '2) 克服拖延的具体行动步骤，3) 一句有力的激励名言或见解。' +
              '请用中文回复。'
          },
          {
            role: 'user',
            content: `我正在拖延这件事："${procrastinationThought}"。` +
                    `在1-10分的严重程度上，我的拖延程度是 ${severityLevel} 分。` +
                    `请给我3个有力的、不同角度的见解来帮助我克服这个拖延问题。`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });
      throw new Error(`获取AI回复失败 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', data);
      throw new Error('API返回格式错误');
    }
    
    // Extract the content and split it into separate insights
    const fullContent = data.choices[0].message.content;
    
    // Split by numbered points, newlines, or other potential separators
    const insights = fullContent
      .split(/(?:\d+\.|\n\n|\n|\r\n)/)
      .map((text: string) => text.trim())
      .filter((text: string) => text.length > 0)
      .slice(0, 3); // Ensure we get max 3 responses
    
    // If we don't have 3 insights, try to extract them differently
    if (insights.length < 3) {
      return fullContent
        .split(/(?:\n)/)
        .map((text: string) => text.trim())
        .filter((text: string) => text.length > 0)
        .slice(0, 3);
    }
    
    return insights;
  } catch (error) {
    console.error('Error in getAntiProcrastinationResponses:', error);
    if (error instanceof Error) {
      throw new Error(`获取AI回复失败: ${error.message}`);
    } else {
      throw new Error('获取AI回复失败，请稍后重试');
    }
  }
}
