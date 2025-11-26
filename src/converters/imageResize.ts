import sharp from 'sharp';

interface ResizeOptions {
  inputPath: string;
  outputPath: string;
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
  noEnlarge?: boolean;
}

export async function imageResize(options: ResizeOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const { inputPath, outputPath, width, height, keepAspectRatio = true, noEnlarge = true } = options;
    
    let resizer = sharp(inputPath);
    
    const resizeOptions: any = {
      fit: keepAspectRatio ? 'inside' : 'fill',
      withoutEnlargement: noEnlarge
    };
    
    resizer = resizer.resize(width, height, resizeOptions);
    
    await resizer.toFile(outputPath);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
