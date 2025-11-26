// Web-Compatible Converter Service using Browser APIs and WASM

import imageCompression from 'browser-image-compression';
import { createWorker } from 'tesseract.js';
import JSZip from 'jszip';
import showdown from 'showdown';
import { IConverterService, ConversionResult, ImageCompressOptions, ImageResizeOptions, VideoConvertOptions, OCROptions } from './IConverterService';

export class WebConverterService implements IConverterService {
  private ffmpeg: any = null;
  private ffmpegLoaded = false;

  constructor() {
    this.initFFmpeg();
  }

  private async initFFmpeg() {
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');
      
      this.ffmpeg = new FFmpeg();
      
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      this.ffmpegLoaded = true;
    } catch (error) {
      console.error('FFmpeg failed to load:', error);
    }
  }

  isElectron(): boolean {
    return false;
  }

  getMaxFileSize(): number {
    return 200 * 1024 * 1024; // 200MB for web
  }

  async compressImage(options: ImageCompressOptions): Promise<ConversionResult> {
    try {
      const file = options.file as File;
      
      if (file.size > this.getMaxFileSize()) {
        return {
          success: false,
          error: 'File too large for web version. Download desktop app for unlimited size.'
        };
      }

      const targetSizeMB = options.targetSizeKB / 1024;
      
      const compressedFile = await imageCompression(file, {
        maxSizeMB: targetSizeMB,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        fileType: file.type
      });

      return {
        success: true,
        outputBlob: compressedFile,
        outputUrl: URL.createObjectURL(compressedFile),
        finalSize: compressedFile.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async resizeImage(options: ImageResizeOptions): Promise<ConversionResult> {
    try {
      const file = options.file as File;
      
      return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        img.onload = () => {
          let { width, height } = options;
          
          if (options.keepAspectRatio) {
            const aspectRatio = img.width / img.height;
            if (width && !height) {
              height = width / aspectRatio;
            } else if (height && !width) {
              width = height * aspectRatio;
            }
          }

          width = width || img.width;
          height = height || img.height;

          if (options.noEnlarge) {
            width = Math.min(width, img.width);
            height = Math.min(height, img.height);
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve({
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
              });
            } else {
              resolve({ success: false, error: 'Failed to create blob' });
            }
          }, file.type);
        };

        img.onerror = () => {
          resolve({ success: false, error: 'Failed to load image' });
        };

        img.src = URL.createObjectURL(file);
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async convertImageFormat(file: File | string, format: string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      
      return new Promise((resolve) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve({
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
              });
            } else {
              resolve({ success: false, error: 'Failed to convert format' });
            }
          }, mimeType, 0.9);
        };

        img.onerror = () => {
          resolve({ success: false, error: 'Failed to load image' });
        };

        img.src = URL.createObjectURL(inputFile);
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async imageToPDF(file: File | string): Promise<ConversionResult> {
    try {
      // Use jsPDF for browser-based PDF generation
      const { jsPDF } = await import('jspdf');
      const inputFile = file as File;

      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: img.width > img.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [img.width, img.height]
          });

          pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
          const pdfBlob = pdf.output('blob');

          resolve({
            success: true,
            outputBlob: pdfBlob,
            outputUrl: URL.createObjectURL(pdfBlob),
            finalSize: pdfBlob.size
          });
        };

        img.onerror = () => {
          resolve({ success: false, error: 'Failed to load image' });
        };

        img.src = URL.createObjectURL(inputFile);
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async videoToAudio(options: VideoConvertOptions): Promise<ConversionResult> {
    try {
      if (!this.ffmpegLoaded) {
        return {
          success: false,
          error: 'FFmpeg not loaded. Please wait or download desktop app.'
        };
      }

      const file = options.file as File;
      
      if (file.size > 50 * 1024 * 1024) {
        return {
          success: false,
          error: 'Video too large for web version (50MB limit). Download desktop app.'
        };
      }

      const inputData = new Uint8Array(await file.arrayBuffer());
      await this.ffmpeg.writeFile('input.mp4', inputData);

      const outputFile = `output.${options.format}`;
      await this.ffmpeg.exec(['-i', 'input.mp4', '-vn', '-acodec', 'libmp3lame', outputFile]);

      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data], { type: `audio/${options.format}` });

      return {
        success: true,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async compressVideo(file: File | string, quality: string): Promise<ConversionResult> {
    return {
      success: false,
      error: 'Video compression requires desktop app for best performance.'
    };
  }

  async markdownToHtml(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const markdown = await inputFile.text();
      
      const converter = new showdown.Converter();
      const html = converter.makeHtml(markdown);
      
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Document</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
${html}
</body>
</html>`;

      const blob = new Blob([fullHtml], { type: 'text/html' });
      
      return {
        success: true,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async jsonToCsv(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const jsonText = await inputFile.text();
      const jsonData = JSON.parse(jsonText);
      
      if (!Array.isArray(jsonData)) {
        return { success: false, error: 'JSON must be an array of objects' };
      }

      const headers = Object.keys(jsonData[0]);
      const csvRows = [headers.join(',')];
      
      for (const row of jsonData) {
        const values = headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        });
        csvRows.push(values.join(','));
      }

      const csv = csvRows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      
      return {
        success: true,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async csvToJson(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const csvText = await inputFile.text();
      
      const lines = csvText.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const jsonData = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = values[index]?.trim();
        });
        return obj;
      });

      const json = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      
      return {
        success: true,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async extractText(options: OCROptions): Promise<ConversionResult & { text?: string }> {
    try {
      const file = options.file as File;
      
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const blob = new Blob([text], { type: 'text/plain' });
      
      return {
        success: true,
        text,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async zipFiles(files: (File | string)[]): Promise<ConversionResult> {
    try {
      const zip = new JSZip();
      
      for (const file of files as File[]) {
        zip.file(file.name, file);
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      
      return {
        success: true,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async unzipFile(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const zip = await JSZip.loadAsync(inputFile);
      
      // For web, we can't extract to filesystem
      // Return a message to download desktop app
      return {
        success: false,
        error: 'Unzip requires desktop app to extract to filesystem.'
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
