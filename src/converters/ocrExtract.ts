import { createWorker } from 'tesseract.js';
import fs from 'fs/promises';

export async function ocrExtract(
  inputPath: string,
  outputPath: string,
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; error?: string; text?: string }> {
  try {
    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (onProgress && m.status === 'recognizing text') {
          onProgress(Math.round(m.progress * 100));
        }
      }
    });
    
    const { data: { text } } = await worker.recognize(inputPath);
    await worker.terminate();
    
    await fs.writeFile(outputPath, text);
    
    return { success: true, text };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
