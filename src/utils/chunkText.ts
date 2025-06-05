export function chunkText(text: string, chunkSize= 500): string[] {
    const sentences = text.split(/(?<=[.?!])\s+(?=[A-ZÇĞİÖŞÜ])/g);
    const chunks: string[] = [];
    let currentChunk = "";

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length > chunkSize) {
        if (currentChunk) {
            chunks.push(currentChunk.trim());
            currentChunk = "";
        }
        }
        currentChunk += sentence + " ";
    }
    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }
    return chunks;
}