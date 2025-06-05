import { parseFile } from "../utils/parseFile";
import { chunkText } from "../utils/chunkText";

export async function parseAndChunkFile(filePath: string, originalName: string): Promise<{ content: string, chunks: string[] }> {
  const content = await parseFile(filePath, originalName);
  const chunks = chunkText(content, 500);
  return { content, chunks };
}