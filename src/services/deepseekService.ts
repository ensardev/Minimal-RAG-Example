import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

const deepseek = new OpenAI({
    baseURL: "https://api.deepseek.com/v1",
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function askDeepseek(context: string, question: string): Promise<string> {
    const messages : ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: "You are a helpful assistant. Use the provided context to answer the user's question. If the context does not have the answer, say so.",
        },
        {
            role: "user",
            content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
    ];

    const completion = await deepseek.chat.completions.create({
        messages,
        model: "deepseek-chat",
    });

    return completion.choices[0].message.content || "";
}