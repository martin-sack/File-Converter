// Service Adapter Interface - Works in both Electron and Browser

export interface ConversionResult {
  success: boolean;
  error?: string;
  outputUrl?: string;
  outputBlob?: Blob;
  finalSize?: number;
}

export interface ImageCompressOptions {
  file: File | string;
  targetSizeKB: number;
}

export interface ImageResizeOptions {
  file: File | string;
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
  noEnlarge?: boolean;
}

export interface VideoConvertOptions {
  file: File | string;
  format: 'mp3' | 'aac';
}

export interface OCROptions {
  file: File | string;
}

export interface IConverterService {
  // Image operations
  compressImage(options: ImageCompressOptions): Promise<ConversionResult>;
  resizeImage(options: ImageResizeOptions): Promise<ConversionResult>;
  convertImageFormat(file: File | string, format: string): Promise<ConversionResult>;
  imageToPDF(file: File | string): Promise<ConversionResult>;
  
  // Video operations
  videoToAudio(options: VideoConvertOptions): Promise<ConversionResult>;
  compressVideo(file: File | string, quality: string): Promise<ConversionResult>;
  
  // Document operations
  markdownToHtml(file: File | string): Promise<ConversionResult>;
  jsonToCsv(file: File | string): Promise<ConversionResult>;
  csvToJson(file: File | string): Promise<ConversionResult>;
  
  // OCR
  extractText(options: OCROptions): Promise<ConversionResult & { text?: string }>;
  
  // Archive
  zipFiles(files: (File | string)[]): Promise<ConversionResult>;
  unzipFile(file: File | string): Promise<ConversionResult>;
  
  // Utility
  isElectron(): boolean;
  getMaxFileSize(): number; // Returns max file size in bytes
}
