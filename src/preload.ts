import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // File selection
  selectFile: () => ipcRenderer.invoke('select-file'),
  selectFiles: () => ipcRenderer.invoke('select-files'),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  saveFile: (defaultPath: string) => ipcRenderer.invoke('save-file', defaultPath),
  
  // Image conversions
  imageToPDF: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:image-to-pdf', inputPath, outputPath),
  imageResize: (options: any) => 
    ipcRenderer.invoke('convert:image-resize', options),
  imageCompress: (options: any) => 
    ipcRenderer.invoke('convert:image-compress', options),
  imageConvert: (inputPath: string, outputPath: string, format: string) => 
    ipcRenderer.invoke('convert:image-convert', inputPath, outputPath, format),
  
  // Document conversions
  pdfToWord: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:pdf-to-word', inputPath, outputPath),
  wordToPDF: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:word-to-pdf', inputPath, outputPath),
  markdownToHtml: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:markdown-to-html', inputPath, outputPath),
  htmlToPDF: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:html-to-pdf', inputPath, outputPath),
  
  // Media conversions
  videoToMp3: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:video-to-mp3', inputPath, outputPath),
  videoToAAC: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:video-to-aac', inputPath, outputPath),
  audioConvert: (inputPath: string, outputPath: string, format: string) => 
    ipcRenderer.invoke('convert:audio-convert', inputPath, outputPath, format),
  
  // Data conversions
  jsonToCsv: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:json-to-csv', inputPath, outputPath),
  csvToJson: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:csv-to-json', inputPath, outputPath),
  
  // Archive operations
  zipFiles: (inputPaths: string[], outputPath: string) => 
    ipcRenderer.invoke('convert:zip-files', inputPaths, outputPath),
  unzipFiles: (inputPath: string, outputDir: string) => 
    ipcRenderer.invoke('convert:unzip-files', inputPath, outputDir),
  
  // Video compression
  videoCompress: (options: any) => 
    ipcRenderer.invoke('convert:video-compress', options),
  
  // OCR
  ocrExtract: (inputPath: string, outputPath: string) => 
    ipcRenderer.invoke('convert:ocr-extract', inputPath, outputPath),
  
  // Folder batch processing
  processFolderBatch: (options: any) => 
    ipcRenderer.invoke('convert:folder-batch', options),
  
  // Utilities
  openFolder: (folderPath: string) => 
    ipcRenderer.invoke('open-folder', folderPath)
});

declare global {
  interface Window {
    electronAPI: any;
  }
}
