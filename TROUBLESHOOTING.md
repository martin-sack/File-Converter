# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### Issue: Tool "Does Nothing" When Clicking Convert

#### Symptoms
- Click "Convert Now" button
- Button shows "Processing..." briefly
- Nothing happens, no download

#### Root Causes & Fixes

**1. Check Browser Console**
```bash
# Open browser DevTools (F12 or Cmd+Option+I)
# Look for errors in Console tab
```

Common errors:
- `Failed to load FFmpeg` → Internet connection issue, CDN blocked
- `Cannot read property of undefined` → File not properly selected
- `Blob creation failed` → Browser compatibility issue

**2. Verify Tool ID Mapping**

The tool ID in `TOOLS` must match the switch case in `handleConversion()`:

```typescript
// In src/config/tools.ts
{ id: 'image-to-pdf', ... }

// In app/converter/page.tsx
case 'image-to-pdf':
  conversionResult = await converterService.imageToPDF(file);
  break;
```

**3. Check Service Implementation**

Each tool must have a working implementation in `WebConverterService.ts`:

```typescript
async imageToPDF(file: File | string): Promise<ConversionResult> {
  // Must return { success: true, outputBlob, outputUrl, finalSize }
  // OR { success: false, error: 'message' }
}
```

**4. Verify Download Trigger**

The `downloadResult()` function must:
- Check `result?.outputUrl` exists
- Create anchor element
- Set proper filename
- Trigger click

---

### Issue: Image to PDF Not Working

#### Quick Fix
```typescript
// Verify in WebConverterService.ts
async imageToPDF(file: File | string): Promise<ConversionResult> {
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
}
```

#### Test
1. Upload a JPG image
2. Select "Image to PDF"
3. Click "Convert Now"
4. Should download `filename_converted.pdf`

---

### Issue: Text to PDF Not Working

#### Quick Fix
```typescript
// Verify in WebConverterService.ts
async textToPdf(file: File | string): Promise<ConversionResult> {
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
  
  pdf.setFontSize(12);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margins = 20;
  const maxLineWidth = pageWidth - (margins * 2);
  const lines = pdf.splitTextToSize(text, maxLineWidth);
  
  const lineHeight = 7;
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
}
```

#### Test
1. Create a `test.txt` file with some text
2. Upload to "Text to PDF"
3. Click "Convert Now"
4. Should download `test_converted.pdf`

---

### Issue: Create ZIP Not Working

#### Quick Fix
```typescript
// Verify in WebConverterService.ts
async zipFiles(files: (File | string)[]): Promise<ConversionResult> {
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
}
```

#### Test
1. Upload multiple files (Cmd/Ctrl+Click)
2. Select "Create ZIP"
3. Click "Convert Now"
4. Should download `filename_converted.zip`

---

### Issue: Video to Audio Not Working

#### Symptoms
- Takes a long time (30+ seconds first time)
- May show "FFmpeg initialization failed"

#### Solutions

**1. First Load is Slow**
- FFmpeg.wasm is ~30MB
- Downloads from CDN on first use
- Cached after that
- Wait patiently!

**2. Check File Size**
```typescript
if (file.size > 50 * 1024 * 1024) {
  // Error: Video too large (50MB limit)
}
```

**3. Verify FFmpeg Loading**
```typescript
private async loadFFmpeg() {
  if (this.ffmpegLoaded) return;
  
  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const { toBlobURL } = await import('@ffmpeg/util');
  
  this.ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
  await this.ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  
  this.ffmpegLoaded = true;
}
```

#### Test
1. Upload a small MP4 (< 10MB)
2. Select "Video to Audio"
3. Wait for FFmpeg to load (first time only)
4. Click "Convert Now"
5. Wait 10-30 seconds
6. Should download `video_converted.mp3`

---

### Issue: JSON/CSV Tools Show No Configuration

#### This is Normal!
JSON ↔ CSV conversions don't need configuration. The UI shows:
- "JSON array will be converted to CSV format with headers"
- "CSV file will be converted to JSON array format"

This is informational, not a bug.

---

### Issue: PDF Upload Not Auto-Detected

#### This is Expected!
The web version doesn't support PDF → DOCX or other PDF conversions.

PDFs can only be:
- Added to a ZIP file
- Shown in "Pro Conversions (Desktop Only)" section

To add PDF detection:
```typescript
const detectFileType = (file: File): string | null => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  
  if (ext === 'pdf') {
    // Show message: "PDF conversions available in Desktop app"
    return null;
  }
  
  // ... rest of detection
};
```

---

### Issue: Download Has Generic Filename

#### Fixed!
The `downloadResult()` function now generates proper filenames:

```typescript
const downloadResult = () => {
  const originalName = files[0].name.replace(/\.[^.]+$/, '');
  let extension = '';
  
  switch (activeTool) {
    case 'image-to-pdf': extension = 'pdf'; break;
    case 'text-to-pdf': extension = 'pdf'; break;
    case 'video-to-audio': extension = 'mp3'; break;
    case 'markdown-to-html': extension = 'html'; break;
    case 'json-to-csv': extension = 'csv'; break;
    case 'csv-to-json': extension = 'json'; break;
    case 'create-zip': extension = 'zip'; break;
    // ...
  }
  
  a.download = `${originalName}_converted.${extension}`;
};
```

---

## Debugging Checklist

### For Each Tool:

1. **Check Tool Registry**
```bash
# Open: src/config/tools.ts
# Verify tool exists with correct ID
```

2. **Check Service Method**
```bash
# Open: src/services/WebConverterService.ts
# Verify method exists and returns ConversionResult
```

3. **Check UI Mapping**
```bash
# Open: app/converter/page.tsx
# Verify switch case exists for tool ID
```

4. **Check Download Logic**
```bash
# Verify downloadResult() generates correct filename
```

5. **Test in Browser**
```bash
npm run dev
# Open http://localhost:3000/converter
# Upload file
# Check console for errors
# Verify download works
```

---

## Quick Test Script

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
open http://localhost:3000/converter

# 3. Test each tool:

# Image Compressor
# - Upload JPG
# - Set target size: 500KB
# - Convert
# - Download should work

# Image to PDF
# - Upload JPG
# - Convert
# - Download PDF

# Text to PDF
# - Upload TXT
# - Convert
# - Download PDF

# Video to Audio
# - Upload small MP4
# - Wait for FFmpeg
# - Convert
# - Download MP3

# Create ZIP
# - Upload multiple files
# - Convert
# - Download ZIP

# JSON to CSV
# - Upload JSON array
# - Convert
# - Download CSV

# CSV to JSON
# - Upload CSV
# - Convert
# - Download JSON
```

---

## Browser DevTools Tips

### Check Network Tab
- See if FFmpeg.wasm is downloading
- Check for failed requests
- Verify CDN is accessible

### Check Console Tab
- Look for JavaScript errors
- Check for warnings
- Verify method calls

### Check Application Tab
- See if Blob URLs are created
- Check localStorage/cache
- Verify service worker (if any)

---

## Performance Issues

### Slow Conversions
- **Image tools**: Should be < 2s
- **Video to Audio**: 10-30s (first load +30s)
- **OCR**: 5-10s (first load +2s)

### Memory Issues
- Large files (> 100MB) may cause browser to slow down
- Close other tabs
- Use desktop app for large files

### Browser Compatibility
- **Chrome**: Best performance
- **Firefox**: Good performance
- **Safari**: FFmpeg.wasm may be slower
- **Edge**: Good performance

---

## Still Not Working?

### 1. Clear Cache
```bash
# In browser DevTools
# Application → Clear storage → Clear site data
```

### 2. Hard Refresh
```bash
# Cmd+Shift+R (Mac)
# Ctrl+Shift+R (Windows/Linux)
```

### 3. Check Build
```bash
npm run build
# Look for errors
```

### 4. Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

### 5. Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Getting Help

### Check Documentation
- `BROWSER_CONVERSIONS_COMPLETE.md` - Full docs
- `TESTING_GUIDE.md` - Testing instructions
- `QUICK_REFERENCE.md` - Quick reference

### Check Code
- `src/config/tools.ts` - Tool definitions
- `src/services/WebConverterService.ts` - Conversion logic
- `app/converter/page.tsx` - UI logic

### Debug Mode
Add console logs:
```typescript
console.log('Tool ID:', activeTool);
console.log('File:', file);
console.log('Result:', conversionResult);
console.log('Download URL:', result?.outputUrl);
```

---

**Most issues are caused by:**
1. Tool ID mismatch between registry and switch case
2. Service method not returning proper ConversionResult
3. Download function not triggered
4. Browser blocking downloads
5. Network issues (FFmpeg.wasm, Tesseract.js)

**Check these first!** ✅
