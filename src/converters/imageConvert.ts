import sharp from 'sharp';

export async function imageConvert(
  inputPath: string, 
  outputPath: string, 
  format: string
): Promise<{ success: boolean; error?: string }> {
  try {
    let converter = sharp(inputPath);
    
    switch (format.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        converter = converter.jpeg({ quality: 90 });
        break;
      case 'png':
        converter = converter.png();
        break;
      case 'webp':
        converter = converter.webp({ quality: 90 });
        break;
      default:
        return { success: false, error: `Unsupported format: ${format}` };
    }
    
    await converter.toFile(outputPath);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
