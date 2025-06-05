import { Request, Response } from "express";
import { getEmbedding } from "../services/embeddingService";
import { queryVectors } from "../services/vectorDbService";
import { askDeepseek } from "../services/deepseekService";

export async function askQuestion(req: Request, res: Response) {
    const { question } = req.body;

    if (!question) {
        res.status(400).json({ error: "Question is required!" });
        return;
    }

    try { 
        const embedding = await getEmbedding(question);
        const results = await queryVectors(embedding, 3);
        
        console.log("Received question:", question);
        console.log("Search results:", results);

        if (results.length === 0) {
            res.status(404).json({ answer: "No relevant information found." });
            return;
        }

        const context = results.map(r => r.text).join("\n---\n");
        const answer = await askDeepseek(context, question);
        
        console.log("Answer from Deepseek:", answer);

        res.json({ answer });
    } catch (err: any) {
        console.error("Error in askQuestion:", err);
        res.status(500).json({ error: err.message || "An error occurred while processing your request." });
    }
}