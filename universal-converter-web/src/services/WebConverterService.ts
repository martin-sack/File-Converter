// Web-Compatible Converter Service using Browser APIs ONLY

import imageCompression from 'browser-image-compression';
import { createWorker } from 'tesseract.js';
import JSZip from 'jszip';
import showdown from 'showdown';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import { IConverterService, ConversionResult, ImageCompressOptions, ImageResizeOptions, VideoConvertOptions, OCROptions } from './IConverterService';

export class WebConverterService implements IConverterService {
  isElectron(): boolean {
    return false;
  }

  getMaxFileSize(): number {
    return 200 * 1024 * 1024; // 200MB for web
  }

  // ============ IMAGE COMPRESSION ============
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
        fileType: file.type,
        initialQuality: options.quality || 0.8
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

  // ============ IMAGE RESIZING ============
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
              height = Math.round(width / aspectRatio);
            } else if (height && !width) {
              width = Math.round(height * aspectRatio);
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
          }, file.type, 0.95);
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

  // ============ IMAGE FORMAT CONVERSION ============
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
          }, mimeType, 0.95);
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

  // ============ IMAGE TO PDF ============
  async imageToPDF(file: File | string): Promise<ConversionResult> {
    try {
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

  // ============ VIDEO TO AUDIO (FFmpeg.wasm) ============
  private ffmpeg: any = null;
  private ffmpegLoaded = false;

  private async loadFFmpeg() {
    if (this.ffmpegLoaded) return;
    
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
      throw new Error('FFmpeg initialization failed');
    }
  }

  async videoToAudio(options: VideoConvertOptions): Promise<ConversionResult> {
    try {
      const file = options.file as File;
      
      if (file.size > 50 * 1024 * 1024) {
        return {
          success: false,
          error: 'Video too large for web version (50MB limit). Please use the desktop app for larger files.'
        };
      }

      await this.loadFFmpeg();

      const inputData = new Uint8Array(await file.arrayBuffer());
      await this.ffmpeg.writeFile('input.mp4', inputData);

      const outputFormat = options.format || 'mp3';
      const outputFile = `output.${outputFormat}`;
      
      await this.ffmpeg.exec(['-i', 'input.mp4', '-vn', '-acodec', 'libmp3lame', '-q:a', '2', outputFile]);

      const data = await this.ffmpeg.readFile(outputFile);
      const blob = new Blob([data], { type: `audio/${outputFormat}` });

      return {
        success: true,
        outputBlob: blob,
        outputUrl: URL.createObjectURL(blob),
        finalSize: blob.size
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: `Video conversion failed: ${error.message}. Try a smaller file or use the desktop app.` 
      };
    }
  }

  async compressVideo(file: File | string, quality: string): Promise<ConversionResult> {
    return {
      success: false,
      error: 'Video compression requires the Desktop App for optimal performance. Please download the desktop version.'
    };
  }

  // ============ MARKDOWN TO HTML ============
  async markdownToHtml(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const markdown = await inputFile.text();
      
      const converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
        tasklists: true,
        ghCodeBlocks: true
      });
      const html = converter.makeHtml(markdown);
      
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Document</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px; 
      margin: 40px auto; 
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    code { 
      background: #f4f4f4; 
      padding: 2px 6px; 
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre { 
      background: #f4f4f4; 
      padding: 15px; 
      border-radius: 5px; 
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 0;
      padding-left: 20px;
      color: #666;
    }
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

  // ============ JSON TO CSV ============
  async jsonToCsv(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const jsonText = await inputFile.text();
      const jsonData = JSON.parse(jsonText);
      
      if (!Array.isArray(jsonData)) {
        return { success: false, error: 'JSON must be an array of objects' };
      }

      if (jsonData.length === 0) {
        return { success: false, error: 'JSON array is empty' };
      }

      const csv = Papa.unparse(jsonData);
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

  // ============ CSV TO JSON ============
  async csvToJson(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const csvText = await inputFile.text();
      
      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });

      if (result.errors.length > 0) {
        return { success: false, error: `CSV parsing error: ${result.errors[0].message}` };
      }

      const json = JSON.stringify(result.data, null, 2);
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

  // ============ OCR TEXT EXTRACTION ============
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

  // ============ ZIP FILES ============
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

  // ============ TEXT TO PDF ============
  async textToPdf(file: File | string): Promise<ConversionResult> {
    try {
      let text: string;
      
      if (file instanceof File) {
        text = await file.text();
      } else {
        text = file;
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set font and size
      pdf.setFontSize(12);
      
      // Split text into lines that fit the page width
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margins = 20;
      const maxLineWidth = pageWidth - (margins * 2);
      
      const lines = pdf.splitTextToSize(text, maxLineWidth);
      
      // Add text with pagination
      const lineHeight = 7;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const maxLinesPerPage = Math.floor((pageHeight - margins * 2) / lineHeight);
      
      let currentPage = 1;
      let currentLine = 0;
      
      for (let i = 0; i < lines.length; i++) {
        if (currentLine >= maxLinesPerPage) {
          pdf.addPage();
          currentPage++;
          currentLine = 0;
        }
        
        pdf.text(lines[i], margins, margins + (currentLine * lineHeight));
        currentLine++;
      }

      const pdfBlob = pdf.output('blob');

      return {
        success: true,
        outputBlob: pdfBlob,
        outputUrl: URL.createObjectURL(pdfBlob),
        finalSize: pdfBlob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // ============ JSON TO PDF ============
  async jsonToPdf(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const jsonText = await inputFile.text();
      const jsonData = JSON.parse(jsonText);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.setFontSize(10);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margins = 15;
      const maxLineWidth = pageWidth - (margins * 2);

      // Pretty print JSON
      const prettyJson = JSON.stringify(jsonData, null, 2);
      const lines = pdf.splitTextToSize(prettyJson, maxLineWidth);

      const lineHeight = 5;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const maxLinesPerPage = Math.floor((pageHeight - margins * 2) / lineHeight);

      let currentLine = 0;

      for (let i = 0; i < lines.length; i++) {
        if (currentLine >= maxLinesPerPage) {
          pdf.addPage();
          currentLine = 0;
        }

        pdf.text(lines[i], margins, margins + (currentLine * lineHeight));
        currentLine++;
      }

      const pdfBlob = pdf.output('blob');

      return {
        success: true,
        outputBlob: pdfBlob,
        outputUrl: URL.createObjectURL(pdfBlob),
        finalSize: pdfBlob.size
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // ============ JSON TO XLSX ============
  async jsonToXlsx(file: File | string): Promise<ConversionResult> {
    try {
      const XLSX = await import('xlsx');
      const inputFile = file as File;
      const jsonText = await inputFile.text();
      const jsonData = JSON.parse(jsonText);

      if (!Array.isArray(jsonData)) {
        return { success: false, error: 'JSON must be an array of objects for Excel conversion' };
      }

      if (jsonData.length === 0) {
        return { success: false, error: 'JSON array is empty' };
      }

      // Create worksheet from JSON
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });

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

  // ============ JSON TO HTML ============
  async jsonToHtml(file: File | string): Promise<ConversionResult> {
    try {
      const inputFile = file as File;
      const jsonText = await inputFile.text();
      const jsonData = JSON.parse(jsonText);

      let htmlContent = '';

      if (Array.isArray(jsonData) && jsonData.length > 0) {
        // Create HTML table
        const keys = Object.keys(jsonData[0]);
        
        htmlContent = `
          <table>
            <thead>
              <tr>
                ${keys.map(key => `<th>${key}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${jsonData.map(row => `
                <tr>
                  ${keys.map(key => `<td>${JSON.stringify(row[key])}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      } else {
        // Pretty print JSON
        htmlContent = `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`;
      }

      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSON Data</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 1200px;
      margin: 40px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px;
      text-align: left;
      border: 1px solid #ddd;
    }
    th {
      background: #4CAF50;
      color: white;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    tr:hover {
      background: #f5f5f5;
    }
    pre {
      background: white;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>JSON Data</h1>
  ${htmlContent}
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

  // ============ UNZIP (DISABLED FOR WEB) ============
  async unzipFile(file: File | string): Promise<ConversionResult> {
    return {
      success: false,
      error: 'Unzip requires desktop app to extract to filesystem. Please download the desktop version.'
    };
  }
}
