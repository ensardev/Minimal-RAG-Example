import axios from 'axios';

interface OllamaEmbeddingsResponse {
  embedding: number[];
}

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

export async function getEmbedding(text: string): Promise<number[]> {
    const response = await axios.post<OllamaEmbeddingsResponse>(`${OLLAMA_URL}/api/embeddings`, {
        model: "nomic-embed-text",
        prompt: text,
    });
    return response.data.embedding;
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  return await Promise.all(texts.map(getEmbedding));
}