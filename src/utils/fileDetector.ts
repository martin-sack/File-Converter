import path from 'path';

export interface FileInfo {
  path: string;
  name: string;
  extension: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'archive' | 'unknown';
  suggestedConverter?: string;
  suggestedOutput?: string;
}

export function detectFileType(filePath: string): FileInfo {
  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath);
  
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];
  const videoExts = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.webm'];
  const audioExts = ['.mp3', '.wav', '.aac', '.flac', '.ogg', '.m4a'];
  const documentExts = ['.pdf', '.doc', '.docx', '.txt', '.md', '.html', '.json', '.csv', '.xml'];
  const archiveExts = ['.zip', '.rar', '.7z', '.tar', '.gz'];
  
  let type: FileInfo['type'] = 'unknown';
  let suggestedConverter: string | undefined;
  let suggestedOutput: string | undefined;
  
  if (imageExts.includes(ext)) {
    type = 'image';
    suggestedConverter = 'image-compress';
    suggestedOutput = 'Compress & optimize';
  } else if (videoExts.includes(ext)) {
    type = 'video';
    suggestedConverter = 'video-compress';
    suggestedOutput = 'Extract audio or compress';
  } else if (audioExts.includes(ext)) {
    type = 'audio';
    suggestedConverter = 'audio-convert';
    suggestedOutput = 'Convert format';
  } else if (documentExts.includes(ext)) {
    type = 'document';
    if (ext === '.md') {
      suggestedConverter = 'markdown-to-html';
      suggestedOutput = 'Convert to HTML';
    } else if (ext === '.json') {
      suggestedConverter = 'json-to-csv';
      suggestedOutput = 'Convert to CSV';
    } else if (ext === '.csv') {
      suggestedConverter = 'csv-to-json';
      suggestedOutput = 'Convert to JSON';
    }
  } else if (archiveExts.includes(ext)) {
    type = 'archive';
    suggestedConverter = 'unzip';
    suggestedOutput = 'Extract files';
  }
  
  return {
    path: filePath,
    name,
    extension: ext,
    type,
    suggestedConverter,
    suggestedOutput
  };
}

export function detectMultipleFiles(filePaths: string[]): FileInfo[] {
  return filePaths.map(detectFileType);
}
