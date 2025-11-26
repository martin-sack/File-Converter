// Central Tool Registry for Web Converter

export type ToolCategory = 'images' | 'text' | 'data' | 'archives' | 'media';

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  webSupported: boolean;
  bgColor: string;
  textColor: string;
}

export const TOOLS: ToolDefinition[] = [
  // ===== IMAGES =====
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce file size',
    category: 'images',
    icon: 'Minimize2',
    webSupported: true,
    bgColor: 'bg-blue-500/30',
    textColor: 'text-blue-500',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Change dimensions',
    category: 'images',
    icon: 'Image',
    webSupported: true,
    bgColor: 'bg-blue-500/30',
    textColor: 'text-blue-500',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'JPG ↔ PNG ↔ WEBP',
    category: 'images',
    icon: 'FileType',
    webSupported: true,
    bgColor: 'bg-blue-500/30',
    textColor: 'text-blue-500',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert images to PDF',
    category: 'images',
    icon: 'FileText',
    webSupported: true,
    bgColor: 'bg-purple-500/30',
    textColor: 'text-purple-500',
  },

  // ===== TEXT & OCR =====
  {
    id: 'markdown-to-html',
    name: 'Markdown to HTML',
    description: 'Convert .md files to HTML',
    category: 'text',
    icon: 'FileCode',
    webSupported: true,
    bgColor: 'bg-amber-500/30',
    textColor: 'text-amber-500',
  },
  {
    id: 'text-to-pdf',
    name: 'Text to PDF',
    description: 'Generate a PDF from text',
    category: 'text',
    icon: 'FileText',
    webSupported: true,
    bgColor: 'bg-purple-500/30',
    textColor: 'text-purple-500',
  },
  {
    id: 'ocr-text-extract',
    name: 'OCR Text Extract',
    description: 'Extract text from images',
    category: 'text',
    icon: 'Scan',
    webSupported: true,
    bgColor: 'bg-amber-500/30',
    textColor: 'text-amber-500',
  },

  // ===== DATA =====
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON data to CSV',
    category: 'data',
    icon: 'FileJson',
    webSupported: true,
    bgColor: 'bg-purple-500/30',
    textColor: 'text-purple-500',
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data to JSON',
    category: 'data',
    icon: 'FileJson',
    webSupported: true,
    bgColor: 'bg-purple-500/30',
    textColor: 'text-purple-500',
  },
  {
    id: 'json-to-pdf',
    name: 'JSON to PDF',
    description: 'Convert JSON to formatted PDF',
    category: 'data',
    icon: 'FileText',
    webSupported: true,
    bgColor: 'bg-purple-500/30',
    textColor: 'text-purple-500',
  },
  {
    id: 'json-to-xlsx',
    name: 'JSON to Excel',
    description: 'Convert JSON to XLSX spreadsheet',
    category: 'data',
    icon: 'Sheet',
    webSupported: true,
    bgColor: 'bg-green-500/30',
    textColor: 'text-green-500',
  },
  {
    id: 'json-to-html',
    name: 'JSON to HTML',
    description: 'Convert JSON to HTML table',
    category: 'data',
    icon: 'Table',
    webSupported: true,
    bgColor: 'bg-amber-500/30',
    textColor: 'text-amber-500',
  },

  // ===== ARCHIVES =====
  {
    id: 'create-zip',
    name: 'Create ZIP',
    description: 'Archive multiple files',
    category: 'archives',
    icon: 'Archive',
    webSupported: true,
    bgColor: 'bg-green-500/30',
    textColor: 'text-green-500',
  },

  // ===== MEDIA =====
  {
    id: 'video-to-audio',
    name: 'Video to Audio',
    description: 'Extract MP3 from video',
    category: 'media',
    icon: 'Music',
    webSupported: true,
    bgColor: 'bg-red-500/30',
    textColor: 'text-red-500',
  },
];

// Helper functions
export const getWebSupportedTools = () => TOOLS.filter(t => t.webSupported);

export const getToolsByCategory = (category: ToolCategory) => 
  TOOLS.filter(t => t.category === category && t.webSupported);

export const getToolById = (id: string) => 
  TOOLS.find(t => t.id === id);

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  images: 'Image Tools',
  text: 'Text & Documents',
  data: 'Data Conversion',
  archives: 'Archives',
  media: 'Media Tools',
};
