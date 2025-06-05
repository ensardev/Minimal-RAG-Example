import { QdrantClient } from "@qdrant/js-client-rest";

type ChunkPayload = {
  text: string;
  chunkIndex: number;
  docId: string;
};

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333"
const COLLECTION_NAME = "documents";

export const qdrantClient = new QdrantClient({ url: QDRANT_URL });

export async function ensureCollection(vectorSize: number) {
  const collections = await qdrantClient.getCollections();
  if (!collections.collections.some((col) => col.name === COLLECTION_NAME)) {
    await qdrantClient.createCollection(COLLECTION_NAME, {
      vectors: {
        size: vectorSize,
        distance: "Cosine",
      },
    });
  }
}
export async function addVectors(chunks: string[], embeddings: number[][], docId: string) {
    const vectorSize = embeddings[0]?.length || 768;
    await ensureCollection(vectorSize);

    const points = chunks.map((chunk, i) => ({
        id: Date.now() + i,
        payload: {
        docId,
        chunkIndex: i,
        text: chunk,
        },
        vector: embeddings[i],
    }));

    await qdrantClient.upsert(COLLECTION_NAME, { points });
}

export async function queryVectors(embedding: number[], topK = 3): Promise<{ text: string; score: number; chunkIndex: number; docId: string }[]> {
    const searchResult = await qdrantClient.search(COLLECTION_NAME, {
        vector: embedding,
        limit: topK,
        with_payload: true,
    });

    console.log("QDRANT SEARCH RESULT:", searchResult);

    return searchResult.map((hit) => {
      const payload = hit.payload as ChunkPayload;
      return {
        text: typeof payload.text === "string" ? payload.text : "",
        score: hit.score,
        chunkIndex: Number(payload.chunkIndex),
        docId: String(payload.docId),
      };
    });
}