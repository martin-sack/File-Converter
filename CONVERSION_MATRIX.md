# Conversion Matrix - Web vs Desktop

## ✅ Web Version (Browser-Safe)

### Images (Canvas API + browser-image-compression)
- ✅ JPG ↔ PNG ↔ WEBP
- ✅ Image Compression (reduce file size)
- ✅ Image Resizing (change dimensions)
- ✅ Image to PDF (jsPDF)

### Documents (Showdown + PapaParse + jsPDF)
- ✅ Markdown → HTML (styled output)
- ✅ JSON ↔ CSV (with proper parsing)
- ✅ TXT → PDF (jsPDF)
- ✅ Image → TXT (OCR with Tesseract.js)

### Archives (JSZip)
- ✅ Multiple files → ZIP
- ✅ View ZIP contents

### OCR (Tesseract.js)
- ✅ Extract text from images
- ✅ Support for English (expandable)

## ❌ Desktop Only (Requires Electron + Node.js)

### Advanced Documents (Pandoc + LibreOffice)
- ❌ PDF → DOCX
- ❌ DOCX → PDF (full fidelity)
- ❌ PDF → PPTX
- ❌ DOCX → HTML (beyond basic)
- ❌ PPTX conversions

### Video/Audio (FFmpeg native)
- ❌ Video compression (H.264/H.265)
- ❌ MP4 → MP3 (reliable, fast)
- ❌ Video format conversions
- ❌ Audio normalization

### Advanced Features
- ❌ Batch processing (100+ files)
- ❌ Folder watching
- ❌ Automated workflows
- ❌ No file size limits

## 🎯 Implementation Status

### Web App (`universal-converter-web/`)
**9 Working Tools:**
1. Image Compressor ✅
2. Image Resizer ✅
3. Image Converter ✅
4. Image to PDF ✅
5. Markdown to HTML ✅
6. JSON to CSV ✅
7. CSV to JSON ✅
8. OCR Text Extract ✅
9. Create ZIP ✅

**Libraries Used:**
- browser-image-compression
- jspdf
- showdown
- jszip
- papaparse
- tesseract.js
- pdf-lib
- xlsx

### Desktop App (`src/`)
**Additional Tools:**
- PDF to DOCX
- DOCX to PDF
- Video Compression
- Advanced OCR
- Batch Processing
- No limits

**Libraries Needed:**
- Pandoc (via node-pandoc)
- FFmpeg (via fluent-ffmpeg)
- LibreOffice (for Office docs)
- Sharp (for advanced image processing)

## 📊 User Experience

### Web Version
- ✅ No installation required
- ✅ Works on any device
- ✅ 100% private (browser-only)
- ⚠️ 200MB file size limit
- ⚠️ Limited to 9 conversion types

### Desktop Version
- ✅ Unlimited file sizes
- ✅ 25+ conversion types
- ✅ Native performance
- ✅ Batch processing
- ⚠️ Requires installation

## 🎨 UI Strategy

**Web App:**
- Show 9 web-safe tool cards
- Add "Pro Conversions" section at bottom
- Clear messaging: "Download desktop for advanced features"
- No broken promises - only show what works

**Desktop App:**
- Show all 25+ tools
- No limitations
- Professional workflows
- Automation features
