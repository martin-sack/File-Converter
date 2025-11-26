'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudUpload, Image, FileText, Archive, Zap, 
  Home, Download, Minimize2, FileType, FileJson, 
  FileCode, Scan, Music, ArrowLeft, X, Crown
} from 'lucide-react';

// Import the web converter service and tool registry
import { WebConverterService } from '@/src/services/WebConverterService';
import { TOOLS, getWebSupportedTools, CATEGORY_LABELS, type ToolCategory } from '@/src/config/tools';
import * as LucideIcons from 'lucide-react';

export default function ConverterPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [isToastMinimized, setIsToastMinimized] = useState(false);
  const [conversionOptions, setConversionOptions] = useState({
    format: 'webp',
    quality: 0.8,
    width: 800,
    height: 600,
    targetSizeKB: 500
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const converterService = useRef(new WebConverterService()).current;

  const detectFileType = (file: File): string | null => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    // Images - show tool selector (handled in handleFileSelect)
    const imageExts = ['jpg', 'jpeg', 'png', 'webp'];
    if (imageExts.includes(ext || '')) return null; // Tool selector will handle
    
    // Documents - auto-route
    if (ext === 'txt') return 'text-to-pdf';
    if (ext === 'md') return 'markdown-to-html';
    if (ext === 'csv') return 'csv-to-json';
    // JSON - show tool selector (handled in handleFileSelect)
    if (ext === 'json') return null; // Tool selector will handle
    
    // Media - auto-route
    const videoExts = ['mp4', 'webm'];
    if (videoExts.includes(ext || '')) return 'video-to-audio';
    
    // Everything else - no auto-detection
    return null;
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
      setResult(null);
      
      const ext = fileArray[0].name.split('.').pop()?.toLowerCase();
      
      // Smart Detection for supported file types only
      const imageExts = ['jpg', 'jpeg', 'png', 'webp'];
      const autoRouteExts = ['txt', 'md', 'csv', 'mp4', 'webm'];
      const unsupportedExts = ['pdf', 'mp3', 'wav', 'aac', 'docx', 'xlsx', 'pptx'];
      
      if (imageExts.includes(ext || '')) {
        // Images: Show tool selector
        setShowToolSelector(true);
      } else if (ext === 'json') {
        // JSON: Show tool selector
        setShowToolSelector(true);
      } else if (autoRouteExts.includes(ext || '')) {
        // Supported documents/media: Auto-route
        const detectedTool = detectFileType(fileArray[0]);
        if (detectedTool) {
          setActiveTool(detectedTool);
        }
      } else if (unsupportedExts.includes(ext || '')) {
        // Unsupported files: Auto-route to Create ZIP with helpful notice
        setActiveTool('create-zip');
      } else {
        // Unknown files: Also route to Create ZIP
        setActiveTool('create-zip');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleToolClick = (toolId: string) => {
    // Just open the tool, don't trigger file picker
    setActiveTool(toolId);
    setResult(null);
    setFiles([]); // Clear any previous files
  };

  const handleBackToDashboard = () => {
    setActiveTool(null);
    setFiles([]);
    setResult(null);
  };

  const handleConversion = async () => {
    if (files.length === 0 || !activeTool) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const file = files[0];
      let conversionResult;

      switch (activeTool) {
        case 'image-compressor':
          conversionResult = await converterService.compressImage({
            file,
            targetSizeKB: conversionOptions.targetSizeKB,
            quality: conversionOptions.quality
          });
          break;
        case 'image-resizer':
          conversionResult = await converterService.resizeImage({
            file,
            width: conversionOptions.width,
            height: conversionOptions.height,
            keepAspectRatio: true
          });
          break;
        case 'image-converter':
          conversionResult = await converterService.convertImageFormat(file, conversionOptions.format);
          break;
        case 'image-to-pdf':
          conversionResult = await converterService.imageToPDF(file);
          break;
        case 'video-to-audio':
          conversionResult = await converterService.videoToAudio({
            file,
            format: 'mp3'
          });
          break;
        case 'markdown-to-html':
          conversionResult = await converterService.markdownToHtml(file);
          break;
        case 'text-to-pdf':
          conversionResult = await converterService.textToPdf(file);
          break;
        case 'json-to-csv':
          conversionResult = await converterService.jsonToCsv(file);
          break;
        case 'csv-to-json':
          conversionResult = await converterService.csvToJson(file);
          break;
        case 'json-to-pdf':
          conversionResult = await converterService.jsonToPdf(file);
          break;
        case 'json-to-xlsx':
          conversionResult = await converterService.jsonToXlsx(file);
          break;
        case 'json-to-html':
          conversionResult = await converterService.jsonToHtml(file);
          break;
        case 'ocr-text-extract':
          conversionResult = await converterService.extractText({ file });
          break;
        case 'create-zip':
          conversionResult = await converterService.zipFiles(files);
          break;
        default:
          conversionResult = { success: false, error: 'Tool not implemented yet' };
      }

      setResult(conversionResult);
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const previewResult = () => {
    if (result?.outputUrl) {
      window.open(result.outputUrl, '_blank');
    }
  };

  const canPreview = () => {
    if (!result?.success) return false;
    
    const previewableTools = [
      'image-compressor',
      'image-resizer', 
      'image-converter',
      'image-to-pdf',
      'text-to-pdf',
      'markdown-to-html',
      'json-to-pdf',
      'json-to-html'
    ];
    
    return previewableTools.includes(activeTool || '');
  };

  const downloadResult = () => {
    if (result?.outputUrl && files.length > 0) {
      const a = document.createElement('a');
      a.href = result.outputUrl;
      
      // Generate appropriate filename based on tool
      const originalName = files[0].name.replace(/\.[^.]+$/, '');
      let extension = '';
      
      switch (activeTool) {
        case 'image-compressor':
        case 'image-resizer':
          extension = files[0].name.split('.').pop() || 'jpg';
          break;
        case 'image-converter':
          extension = conversionOptions.format;
          break;
        case 'image-to-pdf':
        case 'text-to-pdf':
        case 'json-to-pdf':
          extension = 'pdf';
          break;
        case 'video-to-audio':
          extension = 'mp3';
          break;
        case 'markdown-to-html':
        case 'json-to-html':
          extension = 'html';
          break;
        case 'json-to-csv':
          extension = 'csv';
          break;
        case 'csv-to-json':
          extension = 'json';
          break;
        case 'json-to-xlsx':
          extension = 'xlsx';
          break;
        case 'ocr-text-extract':
          extension = 'txt';
          break;
        case 'create-zip':
          extension = 'zip';
          break;
        default:
          extension = 'file';
      }
      
      a.download = `${originalName}_converted.${extension}`;
      a.click();
    }
  };

  // Get icon component from string name
  const getIconComponent = (iconName: string) => {
    return (LucideIcons as any)[iconName] || FileText;
  };

  // Get web-supported tools from registry
  const webTools = getWebSupportedTools();

  const proTools = [
    { title: 'PDF to DOCX', desc: 'Full fidelity conversion' },
    { title: 'DOCX to PDF', desc: 'Professional documents' },
    { title: 'PDF to PPTX', desc: 'Presentation conversion' },
    { title: 'Video Compression', desc: 'H.264/H.265 encoding' },
    { title: 'Batch Processing', desc: '100+ files at once' },
    { title: 'Advanced OCR', desc: 'Multi-language support' },
  ];

  const currentTool = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {activeTool ? (
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Dashboard</span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </Link>
          )}
          
          {currentTool && (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${currentTool.bgColor} ${currentTool.textColor} rounded-lg flex items-center justify-center`}>
                {(() => {
                  const IconComponent = getIconComponent(currentTool.icon);
                  return <IconComponent className="w-4 h-4" />;
                })()}
              </div>
              <span className="font-semibold">{currentTool.name}</span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!activeTool ? (
          /* Dashboard View */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-6 py-12 max-w-6xl"
          >
            {/* Drop Zone */}
            <div className="mb-12">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
              
              <div
                onClick={handleDropZoneClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative cursor-pointer
                  bg-white/5 border border-white/10 rounded-3xl
                  p-24 text-center
                  transition-all duration-300
                  ${isDragging ? 'bg-white/10 border-white/20' : 'hover:bg-white/[0.07]'}
                `}
              >
                <CloudUpload className={`w-20 h-20 mx-auto mb-6 ${isDragging ? 'text-cyan-400' : 'text-blue-500'}`} />
                
                <h2 className="text-3xl font-bold mb-3 text-white">
                  Drop files to convert
                </h2>
                <p className="text-zinc-500 text-lg">
                  or click to browse from your computer
                </p>
                <p className="text-zinc-600 text-sm mt-2">
                  Smart Mode: Files are auto-detected and routed to the right tool
                </p>
              </div>
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {webTools.map((tool, idx) => {
                const IconComponent = getIconComponent(tool.icon);
                return (
                  <button
                    key={idx}
                    onClick={() => handleToolClick(tool.id)}
                    className="group relative p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/5 border-t-white/10 rounded-xl hover:scale-[1.02] hover:border-white/20 hover:border-t-white/20 transition-all duration-200 text-left shadow-inner"
                  >
                    <div className={`w-10 h-10 ${tool.bgColor} ${tool.textColor} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                    <p className="text-zinc-500 text-sm">{tool.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Pro Conversions Section */}
            <div className="mt-16 p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-3xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro Conversions (Desktop Only)</h3>
                  <p className="text-zinc-400">
                    Need advanced conversions like PDF ↔ DOCX, video compression, or batch processing? 
                    Download the desktop app for full power.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {proTools.map((tool, idx) => (
                  <div key={idx} className="p-4 bg-black/30 border border-white/10 rounded-xl">
                    <h4 className="font-semibold text-white mb-1">{tool.title}</h4>
                    <p className="text-sm text-zinc-500">{tool.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://github.com/martin-sack/File-Converter/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Desktop App (Free)
              </a>
            </div>
          </motion.div>
        ) : (
          /* Tool View */
          <motion.div
            key="tool"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="container mx-auto px-6 py-12 max-w-4xl relative z-50 pointer-events-auto"
          >
            {/* File Drop Zone for Tool */}
            {files.length === 0 ? (
              <div className="mb-8">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                
                <div
                  onClick={handleDropZoneClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    relative cursor-pointer
                    bg-white/5 border-2 border-dashed border-white/10 rounded-2xl
                    p-16 text-center
                    transition-all duration-300
                    ${isDragging ? 'bg-white/10 border-white/20' : 'hover:bg-white/[0.07]'}
                  `}
                >
                  <CloudUpload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-cyan-400' : 'text-blue-500'}`} />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Drop file here or click to browse
                  </h3>
                  <p className="text-zinc-500">
                    Select a file to use with {currentTool?.name}
                  </p>
                </div>
              </div>
            ) : (
              /* File Display */
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Selected Files</h3>
                  <button
                    onClick={() => {
                      setFiles([]);
                      setResult(null);
                    }}
                    className="relative z-50 text-zinc-400 hover:text-white transition-colors cursor-pointer pointer-events-auto"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <span className="text-white/80 truncate">{file.name}</span>
                      <span className="text-zinc-500 text-sm ml-4">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Configuration Options */}
            {files.length > 0 && !result && (
              <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Configuration</h3>
                
                {activeTool === 'image-compressor' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Target Size (KB)</label>
                      <input
                        type="number"
                        value={conversionOptions.targetSizeKB}
                        onChange={(e) => setConversionOptions({...conversionOptions, targetSizeKB: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Quality: {conversionOptions.quality}</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={conversionOptions.quality}
                        onChange={(e) => setConversionOptions({...conversionOptions, quality: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
                
                {activeTool === 'image-resizer' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Width (px)</label>
                      <input
                        type="number"
                        value={conversionOptions.width}
                        onChange={(e) => setConversionOptions({...conversionOptions, width: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Height (px)</label>
                      <input
                        type="number"
                        value={conversionOptions.height}
                        onChange={(e) => setConversionOptions({...conversionOptions, height: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
                
                {activeTool === 'image-converter' && (
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Output Format</label>
                    <select
                      value={conversionOptions.format}
                      onChange={(e) => setConversionOptions({...conversionOptions, format: e.target.value})}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none cursor-pointer"
                    >
                      <option value="webp">WEBP</option>
                      <option value="png">PNG</option>
                      <option value="jpg">JPG</option>
                    </select>
                  </div>
                )}
                
                {(activeTool === 'json-to-csv' || activeTool === 'csv-to-json') && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      {activeTool === 'json-to-csv' 
                        ? 'JSON array will be converted to CSV format with headers'
                        : 'CSV file will be converted to JSON array format'
                      }
                    </p>
                  </div>
                )}
                
                {activeTool === 'json-to-pdf' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      JSON data will be formatted and converted to a PDF document with syntax highlighting
                    </p>
                  </div>
                )}
                
                {activeTool === 'json-to-xlsx' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      JSON array will be converted to an Excel spreadsheet (.xlsx) with proper columns
                    </p>
                  </div>
                )}
                
                {activeTool === 'json-to-html' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      JSON data will be converted to a styled HTML table (arrays) or formatted view (objects)
                    </p>
                  </div>
                )}
                
                {activeTool === 'markdown-to-html' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      Markdown file will be converted to a styled HTML document
                    </p>
                  </div>
                )}
                
                {activeTool === 'video-to-audio' && (
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Output Format</label>
                    <select
                      value={conversionOptions.format}
                      onChange={(e) => setConversionOptions({...conversionOptions, format: e.target.value})}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none cursor-pointer"
                    >
                      <option value="mp3">MP3</option>
                      <option value="wav">WAV</option>
                      <option value="aac">AAC</option>
                    </select>
                  </div>
                )}
                
                {activeTool === 'text-to-pdf' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      Text file will be converted to a formatted PDF document with proper pagination
                    </p>
                  </div>
                )}
                
                {activeTool === 'image-to-pdf' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      Image will be embedded in a PDF document with automatic orientation detection
                    </p>
                  </div>
                )}
                
                {activeTool === 'create-zip' && (
                  <div>
                    <p className="text-sm text-zinc-400 mb-3">
                      {files.length} file{files.length > 1 ? 's' : ''} will be archived into a ZIP file
                    </p>
                    {files.length > 0 && (() => {
                      const ext = files[0].name.split('.').pop()?.toLowerCase();
                      const unsupportedExts = ['pdf', 'mp3', 'wav', 'aac', 'docx', 'xlsx', 'pptx'];
                      if (unsupportedExts.includes(ext || '')) {
                        return (
                          <div className="mt-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div className="flex-1">
                                <p className="text-sm text-amber-400 font-semibold mb-1">
                                  Limited Web Support
                                </p>
                                <p className="text-xs text-amber-300/90 mb-3">
                                  {ext?.toUpperCase()} files can only be archived in ZIP format in the web version. 
                                  For advanced conversions like PDF editing or audio processing, download the desktop app.
                                </p>
                                <a
                                  href="https://github.com"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  Get Desktop App
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
                
                {activeTool === 'ocr-text-extract' && (
                  <div>
                    <p className="text-sm text-zinc-400">
                      Text will be extracted from the image using OCR technology (may take 5-10 seconds)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Conversion Button */}
            {files.length > 0 && !result && (
              <button
                onClick={handleConversion}
                disabled={isProcessing || files.length === 0}
                className="w-full py-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed font-semibold rounded-xl transition-all mb-8 cursor-pointer z-50 pointer-events-auto"
              >
                {isProcessing ? 'Processing...' : 'Convert Now'}
              </button>
            )}

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl border ${result.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
              >
                {result.success ? (
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-4">✓ Conversion Successful!</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80">File Size: {(result.finalSize / 1024).toFixed(1)} KB</p>
                        {result.text && <p className="text-white/60 text-sm mt-2">Extracted text available</p>}
                      </div>
                      <div className="flex gap-3">
                        {canPreview() && (
                          <button
                            onClick={previewResult}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Preview
                          </button>
                        )}
                        <button
                          onClick={downloadResult}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Download className="w-5 h-5" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2">✗ Conversion Failed</h3>
                    <p className="text-white/70">{result.error}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Selector Modal */}
      <AnimatePresence>
        {showToolSelector && files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 pointer-events-auto"
            onClick={() => setShowToolSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/20 rounded-2xl p-8 max-w-md w-full relative z-50 pointer-events-auto"
            >
              {(() => {
                const ext = files[0].name.split('.').pop()?.toLowerCase();
                const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'];
                const isImage = imageExts.includes(ext || '');
                const isJSON = ext === 'json';
                
                let toolsToShow: typeof TOOLS = [];
                let title = 'What would you like to do?';
                let subtitle = 'Choose a tool';
                
                if (isImage) {
                  toolsToShow = TOOLS.filter(t => t.category === 'images' && t.webSupported);
                  subtitle = 'Choose a tool for your image';
                } else if (isJSON) {
                  toolsToShow = TOOLS.filter(t => 
                    (t.id.startsWith('json-') || t.id === 'create-zip') && t.webSupported
                  );
                  subtitle = 'Choose a conversion format for your JSON';
                }
                
                return (
                  <>
                    <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                    <p className="text-zinc-400 mb-6">{subtitle}</p>
                    
                    <div className="space-y-3">
                      {toolsToShow.map((tool) => {
                        const IconComponent = getIconComponent(tool.icon);
                        return (
                          <button
                            key={tool.id}
                            onClick={() => {
                              setActiveTool(tool.id);
                              setShowToolSelector(false);
                            }}
                            className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all text-left flex items-center gap-4 cursor-pointer z-50 pointer-events-auto"
                          >
                            <div className={`w-10 h-10 ${tool.bgColor} ${tool.textColor} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">{tool.name}</div>
                              <div className="text-sm text-zinc-500">{tool.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimizable Upsell Toast */}
      <div className={`fixed bottom-6 right-6 bg-[#1a1500] border border-yellow-900/50 rounded-xl shadow-2xl transition-all duration-300 ${isToastMinimized ? 'w-16' : 'w-80'}`}>
        {isToastMinimized ? (
          <button
            onClick={() => setIsToastMinimized(false)}
            className="p-4 w-full flex items-center justify-center cursor-pointer hover:bg-yellow-500/10 rounded-xl transition-colors"
          >
            <Zap className="w-6 h-6 text-yellow-500" />
          </button>
        ) : (
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-white font-semibold">Web Version Limits</h4>
                  <button
                    onClick={() => setIsToastMinimized(true)}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <p className="text-zinc-400 text-sm mb-3">
                  200MB max file size. Desktop app has no limits.
                </p>
                <a
                  href="https://github.com"
                  className="inline-block px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Get Desktop App
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
