// Electron Converter Service using Node.js libraries

import { IConverterService, ConversionResult, ImageCompressOptions, ImageResizeOptions, VideoConvertOptions, OCROptions } from './IConverterService';

export class ElectronConverterService implements IConverterService {
  isElectron(): boolean {
    return true;
  }

  getMaxFileSize(): number {
    return Infinity; // No limit for desktop
  }

  async compressImage(options: ImageCompressOptions): Promise<ConversionResult> {
    const inputPath = typeof options.file === 'string' ? options.file : (options.file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, '_compressed$&');
    
    const result = await window.electronAPI.imageCompress({
      inputPath,
      outputPath,
      targetSizeKB: options.targetSizeKB
    });

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async resizeImage(options: ImageResizeOptions): Promise<ConversionResult> {
    const inputPath = typeof options.file === 'string' ? options.file : (options.file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, '_resized$&');
    
    const result = await window.electronAPI.imageResize({
      inputPath,
      outputPath,
      width: options.width,
      height: options.height,
      keepAspectRatio: options.keepAspectRatio,
      noEnlarge: options.noEnlarge
    });

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async convertImageFormat(file: File | string, format: string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, `.${format}`);
    
    const result = await window.electronAPI.imageConvert(inputPath, outputPath, format);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async imageToPDF(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, '.pdf');
    
    const result = await window.electronAPI.imageToPDF(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async videoToAudio(options: VideoConvertOptions): Promise<ConversionResult> {
    const inputPath = typeof options.file === 'string' ? options.file : (options.file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, `.${options.format}`);
    
    const result = options.format === 'mp3'
      ? await window.electronAPI.videoToMp3(inputPath, outputPath)
      : await window.electronAPI.videoToAAC(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async compressVideo(file: File | string, quality: string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, `_${quality}$&`);
    
    const result = await window.electronAPI.videoCompress({
      inputPath,
      outputPath,
      preset: quality as any,
      codec: 'h264'
    });

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async markdownToHtml(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace('.md', '.html');
    
    const result = await window.electronAPI.markdownToHtml(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async textToPdf(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace(/\.(txt|md)$/, '.pdf');
    
    const result = await window.electronAPI.textToPdf(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async jsonToCsv(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace('.json', '.csv');
    
    const result = await window.electronAPI.jsonToCsv(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async csvToJson(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace('.csv', '.json');
    
    const result = await window.electronAPI.csvToJson(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async jsonToPdf(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace('.json', '.pdf');
    
    const result = await window.electronAPI.jsonToPdf(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async jsonToXlsx(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace('.json', '.xlsx');
    
    const result = await window.electronAPI.jsonToXlsx(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async jsonToHtml(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputPath = inputPath.replace('.json', '.html');
    
    const result = await window.electronAPI.jsonToHtml(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async extractText(options: OCROptions): Promise<ConversionResult & { text?: string }> {
    const inputPath = typeof options.file === 'string' ? options.file : (options.file as any).path;
    const outputPath = inputPath.replace(/\.[^.]+$/, '_extracted.txt');
    
    const result = await window.electronAPI.ocrExtract(inputPath, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async zipFiles(files: (File | string)[]): Promise<ConversionResult> {
    const inputPaths = files.map(f => typeof f === 'string' ? f : (f as any).path);
    const outputPath = inputPaths[0].replace(/\.[^.]+$/, '.zip');
    
    const result = await window.electronAPI.zipFiles(inputPaths, outputPath);

    return {
      ...result,
      outputUrl: outputPath
    };
  }

  async unzipFile(file: File | string): Promise<ConversionResult> {
    const inputPath = typeof file === 'string' ? file : (file as any).path;
    const outputDir = inputPath.replace('.zip', '_extracted');
    
    const result = await window.electronAPI.unzipFiles(inputPath, outputDir);

    return {
      ...result,
      outputUrl: outputDir
    };
  }
}
