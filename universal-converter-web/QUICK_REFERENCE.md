# 🚀 Quick Reference - Browser File Converter

## 📋 11 Tools at a Glance

| Tool | Input | Output | Library | Speed |
|------|-------|--------|---------|-------|
| **Image Compressor** | JPG/PNG/WEBP | Compressed image | browser-image-compression | < 2s |
| **Image Resizer** | JPG/PNG/WEBP | Resized image | Canvas API | < 1s |
| **Image Converter** | JPG/PNG/WEBP | JPG/PNG/WEBP | Canvas API | < 1s |
| **Image to PDF** | JPG/PNG/WEBP | PDF | jsPDF | < 1s |
| **Markdown to HTML** | .md | .html | Showdown | < 1s |
| **Text to PDF** | .txt | .pdf | jsPDF | < 1s |
| **OCR Text Extract** | Image | .txt | Tesseract.js | 5-10s |
| **JSON to CSV** | .json | .csv | PapaParse | < 1s |
| **CSV to JSON** | .csv | .json | PapaParse | < 1s |
| **Create ZIP** | Multiple files | .zip | JSZip | < 2s |
| **Video to Audio** | MP4/WebM | MP3 | FFmpeg.wasm | 10-30s |

---

## 🎯 Tool IDs (for code reference)

```typescript
'image-compressor'    // Image compression
'image-resizer'       // Image resizing
'image-converter'     // Format conversion
'image-to-pdf'        // Image → PDF
'markdown-to-html'    // Markdown → HTML
'text-to-pdf'         // Text → PDF
'ocr-text-extract'    // OCR extraction
'json-to-csv'         // JSON → CSV
'csv-to-json'         // CSV → JSON
'create-zip'          // ZIP creation
'video-to-audio'      // Video → Audio
```

---

## 📂 Key Files

```
src/config/tools.ts              # Tool registry (add new tools here)
src/services/WebConverterService.ts   # Conversion logic
app/converter/page.tsx           # Main UI
src/services/IConverterService.ts     # Interface
```

---

## 🔧 Add a New Tool (5 steps)

### 1. Add to Tool Registry
```typescript
// src/config/tools.ts
{
  id: 'my-new-tool',
  name: 'My New Tool',
  description: 'Does something cool',
  category: 'images',
  icon: 'Sparkles',
  webSupported: true,
  bgColor: 'bg-blue-500/30',
  textColor: 'text-blue-500',
}
```

### 2. Add Method to Interface
```typescript
// src/services/IConverterService.ts
myNewTool(file: File | string): Promise<ConversionResult>;
```

### 3. Implement in WebConverterService
```typescript
// src/services/WebConverterService.ts
async myNewTool(file: File | string): Promise<ConversionResult> {
  // Your conversion logic here
  return { success: true, outputBlob, outputUrl, finalSize };
}
```

### 4. Add to Switch Statement
```typescript
// app/converter/page.tsx
case 'my-new-tool':
  conversionResult = await converterService.myNewTool(file);
  break;
```

### 5. Add Configuration Panel (optional)
```typescript
// app/converter/page.tsx
{activeTool === 'my-new-tool' && (
  <div>
    {/* Your config UI here */}
  </div>
)}
```

---

## 🎨 Color Scheme

```typescript
// Images
bgColor: 'bg-blue-500/30'
textColor: 'text-blue-500'

// Text & Documents
bgColor: 'bg-amber-500/30'
textColor: 'text-amber-500'

// Data
bgColor: 'bg-purple-500/30'
textColor: 'text-purple-500'

// Archives
bgColor: 'bg-green-500/30'
textColor: 'text-green-500'

// Media
bgColor: 'bg-red-500/30'
textColor: 'text-red-500'
```

---

## 🔍 Available Icons (Lucide)

Common icons for tools:
- `Image`, `FileImage` - Image tools
- `FileText`, `FileType` - Document tools
- `FileJson`, `FileCode` - Data tools
- `Archive`, `FolderArchive` - Archive tools
- `Music`, `Video`, `Film` - Media tools
- `Minimize2`, `Maximize2` - Size tools
- `Scan`, `Eye` - OCR/analysis tools
- `Zap`, `Sparkles` - Special effects

Full list: https://lucide.dev/icons/

---

## 📦 NPM Scripts

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🚨 File Size Limits

```typescript
// General limit
200 * 1024 * 1024  // 200MB

// Video limit
50 * 1024 * 1024   // 50MB

// Desktop app
Infinity           // No limit
```

---

## 🎯 Smart File Detection

```typescript
const detectFileType = (file: File): string | null => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) 
    return 'image-compressor';
  
  if (['mp4', 'webm'].includes(ext)) 
    return 'video-to-audio';
  
  if (ext === 'md') return 'markdown-to-html';
  if (ext === 'json') return 'json-to-csv';
  if (ext === 'csv') return 'csv-to-json';
  if (ext === 'txt') return 'text-to-pdf';
  
  return null;
};
```

---

## 🔧 Configuration Options

### Image Compressor
```typescript
{
  targetSizeKB: number;  // Target file size
  quality: number;       // 0.1 - 1.0
}
```

### Image Resizer
```typescript
{
  width: number;
  height: number;
  keepAspectRatio: boolean;
  noEnlarge: boolean;
}
```

### Image Converter
```typescript
{
  format: 'jpg' | 'png' | 'webp';
}
```

### Video to Audio
```typescript
{
  format: 'mp3' | 'aac';
}
```

---

## 🎨 UI Components

### Tool Card
```tsx
<button className="p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-xl hover:scale-[1.02] transition-all">
  <div className="w-10 h-10 bg-blue-500/30 text-blue-500 rounded-lg">
    <Icon className="w-5 h-5" />
  </div>
  <h3>{tool.name}</h3>
  <p>{tool.description}</p>
</button>
```

### Drop Zone
```tsx
<div className="bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-16 hover:bg-white/[0.07]">
  <CloudUpload className="w-16 h-16 text-blue-500" />
  <h3>Drop file here</h3>
</div>
```

### Result Display
```tsx
<div className="p-6 rounded-xl border bg-green-500/10 border-green-500/30">
  <h3 className="text-green-400">✓ Success!</h3>
  <button onClick={downloadResult}>Download</button>
</div>
```

---

## 🔒 Error Handling

```typescript
try {
  const result = await converterService.convert(file);
  if (!result.success) {
    setResult({ success: false, error: result.error });
  }
} catch (error: any) {
  setResult({ success: false, error: error.message });
}
```

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test all 11 tools
- [ ] Check console for errors
- [ ] Test on mobile
- [ ] Test file size limits
- [ ] Verify downloads work
- [ ] Check error messages
- [ ] Test drag-and-drop
- [ ] Verify smart detection
- [ ] Test tool selector modal

---

## 📊 Performance Tips

1. **Lazy load heavy libraries**
   ```typescript
   const { FFmpeg } = await import('@ffmpeg/ffmpeg');
   ```

2. **Use Web Workers**
   ```typescript
   useWebWorker: true  // in browser-image-compression
   ```

3. **Clean up Blob URLs**
   ```typescript
   URL.revokeObjectURL(blobUrl);
   ```

4. **Cache WASM files**
   - FFmpeg.wasm cached by browser
   - Tesseract.js cached after first load

---

## 🐛 Debug Tips

### Check if tool is registered
```typescript
import { getToolById } from '@/src/config/tools';
const tool = getToolById('my-tool-id');
console.log(tool);
```

### Check conversion result
```typescript
const result = await converterService.convert(file);
console.log('Success:', result.success);
console.log('Error:', result.error);
console.log('Size:', result.finalSize);
```

### Check file type detection
```typescript
const detectedTool = detectFileType(file);
console.log('Detected tool:', detectedTool);
```

---

## 📞 Common Issues

### "Tool not implemented yet"
→ Check switch statement in `handleConversion()`

### "Property does not exist on type"
→ Add method to `IConverterService` interface

### "Cannot find module"
→ Run `npm install` to install dependencies

### "FFmpeg not loading"
→ Check internet connection, CDN may be blocked

### "Build failed"
→ Run `npm run build` and check TypeScript errors

---

## 🎉 Quick Test

```bash
# 1. Start server
npm run dev

# 2. Open browser
open http://localhost:3000/converter

# 3. Test image compression
# - Click "Image Compressor"
# - Upload a JPG
# - Click "Convert Now"
# - Download result

# 4. Test video to audio
# - Click "Video to Audio"
# - Upload a small MP4
# - Wait for FFmpeg to load
# - Download MP3
```

---

## 📚 Documentation

- `BROWSER_CONVERSIONS_COMPLETE.md` - Full documentation
- `TESTING_GUIDE.md` - Testing instructions
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_REFERENCE.md` - This file

---

**Happy Converting! 🚀**
