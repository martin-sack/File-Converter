import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';

export async function imageToPDF(inputPath: string, outputPath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const pdfDoc = await PDFDocument.create();
    
    // Read and process image
    const imageBuffer = await fs.readFile(inputPath);
    const metadata = await sharp(imageBuffer).metadata();
    
    let embeddedImage;
    const format = metadata.format;
    
    if (format === 'jpeg' || format === 'jpg') {
      embeddedImage = await pdfDoc.embedJpg(imageBuffer);
    } else if (format === 'png') {
      embeddedImage = await pdfDoc.embedPng(imageBuffer);
    } else {
      // Convert to PNG first
      const pngBuffer = await sharp(imageBuffer).png().toBuffer();
      embeddedImage = await pdfDoc.embedPng(pngBuffer);
    }
    
    const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: embeddedImage.width,
      height: embeddedImage.height
    });
    
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
