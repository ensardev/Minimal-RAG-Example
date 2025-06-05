import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseFile(filePath: string, originalname: string): Promise<string> {
    const ext = path.extname(originalname).toLowerCase();

    if (ext === '.pdf') {
        const data = await fs.readFile(filePath);
        const pdf = await pdfParse(data);
        return pdf.text;
    } else if (ext === '.docx') {
        const data = await fs.readFile(filePath);
        const result = await mammoth.extractRawText({ buffer: data });
        return result.value;
    } else if (ext === '.txt') {
        const data = await fs.readFile(filePath, 'utf-8');
        return data;
    } else {
        throw new Error(`Unsupported file type: ${ext}`);
    }
} 