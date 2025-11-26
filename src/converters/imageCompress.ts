import sharp from 'sharp';
import fs from 'fs/promises';

interface CompressOptions {
  inputPath: string;
  outputPath: string;
  targetSizeKB: number;
}

export async function imageCompress(options: CompressOptions): Promise<{ success: boolean; error?: string; finalSize?: number }> {
  try {
    const { inputPath, outputPath, targetSizeKB } = options;
    const targetSizeBytes = targetSizeKB * 1024;
    
    const metadata = await sharp(inputPath).metadata();
    const format = metadata.format;
    
    let quality = 90;
    let buffer: Buffer;
    let finalQuality = quality;
    
    // Iteratively reduce quality until target size is met
    while (quality >= 10) {
      if (format === 'jpeg' || format === 'jpg') {
        buffer = await sharp(inputPath).jpeg({ quality }).toBuffer();
      } else if (format === 'png') {
        buffer = await sharp(inputPath).png({ quality }).toBuffer();
      } else if (format === 'webp') {
        buffer = await sharp(inputPath).webp({ quality }).toBuffer();
      } else {
        // Convert to JPEG for other formats
        buffer = await sharp(inputPath).jpeg({ quality }).toBuffer();
      }
      
      if (buffer.length <= targetSizeBytes) {
        finalQuality = quality;
        await fs.writeFile(outputPath, buffer);
        return { success: true, finalSize: buffer.length };
      }
      
      quality -= 5;
    }
    
    // If we couldn't reach target, save the smallest version
    await fs.writeFile(outputPath, buffer!);
    return { 
      success: true, 
      finalSize: buffer!.length,
      error: `Could not reach target size. Final size: ${(buffer!.length / 1024).toFixed(2)}KB at quality ${finalQuality}`
    };
    
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
