import JSZip from 'jszip';
import fs from 'fs/promises';
import path from 'path';

export async function zipFiles(
  inputPaths: string[], 
  outputPath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const zip = new JSZip();
    
    for (const filePath of inputPaths) {
      const fileName = path.basename(filePath);
      const fileData = await fs.readFile(filePath);
      zip.file(fileName, fileData);
    }
    
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    await fs.writeFile(outputPath, zipBuffer);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function unzipFiles(
  inputPath: string, 
  outputDir: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const zipData = await fs.readFile(inputPath);
    const zip = await JSZip.loadAsync(zipData);
    
    await fs.mkdir(outputDir, { recursive: true });
    
    const promises = Object.keys(zip.files).map(async (filename) => {
      const file = zip.files[filename];
      if (!file.dir) {
        const content = await file.async('nodebuffer');
        const filePath = path.join(outputDir, filename);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content);
      }
    });
    
    await Promise.all(promises);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
