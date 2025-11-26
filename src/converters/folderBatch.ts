import fs from 'fs/promises';
import path from 'path';
import { imageCompress } from './imageCompress';
import { videoToMp3 } from './videoToMp3';
import { zipFiles } from './zipFiles';

interface FolderBatchOptions {
  folderPath: string;
  operation: 'compress-images' | 'extract-audio' | 'zip-all';
}

export async function processFolderBatch(
  options: FolderBatchOptions
): Promise<{ success: boolean; error?: string; count?: number }> {
  try {
    const { folderPath, operation } = options;
    const files = await fs.readdir(folderPath);
    let processedCount = 0;

    switch (operation) {
      case 'compress-images': {
        const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (imageExts.includes(ext)) {
            const inputPath = path.join(folderPath, file);
            const outputPath = path.join(folderPath, `compressed_${file}`);
            
            const result = await imageCompress({
              inputPath,
              outputPath,
              targetSizeKB: 2048
            });
            
            if (result.success) processedCount++;
          }
        }
        break;
      }

      case 'extract-audio': {
        const videoExts = ['.mp4', '.avi', '.mov', '.mkv'];
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (videoExts.includes(ext)) {
            const inputPath = path.join(folderPath, file);
            const outputPath = path.join(folderPath, `${path.parse(file).name}.mp3`);
            
            const result = await videoToMp3(inputPath, outputPath);
            
            if (result.success) processedCount++;
          }
        }
        break;
      }

      case 'zip-all': {
        const filePaths = files.map(f => path.join(folderPath, f));
        const outputPath = path.join(path.dirname(folderPath), `${path.basename(folderPath)}.zip`);
        
        const result = await zipFiles(filePaths, outputPath);
        
        if (result.success) processedCount = files.length;
        break;
      }
    }

    return { success: true, count: processedCount };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
