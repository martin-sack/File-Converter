export interface ElectronAPI {
  // File selection
  selectFile: () => Promise<string>;
  selectFiles: () => Promise<string[]>;
  selectFolder: () => Promise<string>;
  saveFile: (defaultPath: string) => Promise<string>;
  
  // Image conversions
  imageToPDF: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  imageResize: (options: ImageResizeOptions) => Promise<ConversionResult>;
  imageCompress: (options: ImageCompressOptions) => Promise<ConversionResult>;
  imageConvert: (inputPath: string, outputPath: string, format: string) => Promise<ConversionResult>;
  
  // Document conversions
  pdfToWord: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  wordToPDF: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  markdownToHtml: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  htmlToPDF: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  
  // Media conversions
  videoToMp3: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  videoToAAC: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  audioConvert: (inputPath: string, outputPath: string, format: string) => Promise<ConversionResult>;
  videoCompress: (options: VideoCompressOptions) => Promise<ConversionResult>;
  
  // Data conversions
  jsonToCsv: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  csvToJson: (inputPath: string, outputPath: string) => Promise<ConversionResult>;
  
  // Archive operations
  zipFiles: (inputPaths: string[], outputPath: string) => Promise<ConversionResult>;
  unzipFiles: (inputPath: string, outputDir: string) => Promise<ConversionResult>;
  
  // OCR
  ocrExtract: (inputPath: string, outputPath: string) => Promise<OCRResult>;
  
  // Batch operations
  processFolderBatch: (options: FolderBatchOptions) => Promise<BatchResult>;
  
  // Utilities
  openFolder: (folderPath: string) => Promise<void>;
}

export interface ConversionResult {
  success: boolean;
  error?: string;
  finalSize?: number;
}

export interface OCRResult extends ConversionResult {
  text?: string;
}

export interface BatchResult extends ConversionResult {
  count?: number;
}

export interface ImageResizeOptions {
  inputPath: string;
  outputPath: string;
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
  noEnlarge?: boolean;
}

export interface ImageCompressOptions {
  inputPath: string;
  outputPath: string;
  targetSizeKB: number;
}

export interface VideoCompressOptions {
  inputPath: string;
  outputPath: string;
  preset: '1080p' | '720p' | '480p';
  codec?: 'h264' | 'h265';
}

export interface FolderBatchOptions {
  folderPath: string;
  operation: 'compress-images' | 'extract-audio' | 'zip-all';
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
