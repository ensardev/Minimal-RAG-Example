import { Request, Response } from "express";
import { parseAndChunkFile } from "../services/fileService";
import { getEmbeddings } from "../services/embeddingService";
import { addVectors } from "../services/vectorDbService";

export const uploadFileHandler = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
    res.status(400).json({ error: "No file uploaded!" });
    return;
    }

    try {
        const { content, chunks } = await parseAndChunkFile(req.file.path, req.file.originalname);
        const embeddings = await getEmbeddings(chunks);
        await addVectors(chunks, embeddings, req.file.filename);

        res.json({
        message: "File uploaded and parsed successfully!",
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        path: req.file.path,
        content: content.slice(0, 1000) + (content.length > 1000 ? "... [truncated]" : ""),
        chunks: chunks.length,
        chunkSample: chunks.slice(0, 3)
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message || "File parsing failed!" });
    }
};