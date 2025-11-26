# 🚀 Universal File Converter - Web Version

A **production-ready, browser-native file converter** with 11 fully working tools. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS. All conversions happen entirely in your browser—no server uploads, no data leaves your device.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

---

## ✨ Features

### 🖼️ Image Tools (4)
- **Image Compressor** - Reduce file size with quality control
- **Image Resizer** - Change dimensions with aspect ratio preservation
- **Image Converter** - Convert between JPG, PNG, WEBP
- **Image to PDF** - Convert images to PDF documents

### 📝 Text & Documents (3)
- **Markdown to HTML** - Convert .md files to styled HTML
- **Text to PDF** - Generate PDF from plain text files
- **OCR Text Extract** - Extract text from images using Tesseract.js

### 📊 Data Conversion (2)
- **JSON to CSV** - Convert JSON arrays to CSV format
- **CSV to JSON** - Parse CSV files to JSON

### 📦 Archives (1)
- **Create ZIP** - Archive multiple files into a ZIP

### 🎬 Media (1)
- **Video to Audio** - Extract MP3 from MP4/WebM using FFmpeg.wasm

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/converter](http://localhost:3000/converter) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🎯 Usage

1. **Visit the converter page** at `/converter`
2. **Choose a tool** from the grid or drag-and-drop a file
3. **Configure options** (quality, size, format, etc.)
4. **Click "Convert Now"** and wait for processing
5. **Download your result** with one click

### Smart Mode
Drop any file on the dashboard and it will automatically:
- Detect the file type
- Suggest the appropriate tool
- Show a tool selector for images

---

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations

### Conversion Libraries
- **browser-image-compression** - Image compression
- **jsPDF** - PDF generation
- **FFmpeg.wasm** - Video/audio processing
- **Tesseract.js** - OCR text extraction
- **JSZip** - ZIP file creation
- **Showdown** - Markdown to HTML
- **PapaParse** - CSV parsing
- **pdf-lib** - PDF manipulation

---

## 📁 Project Structure

```
universal-converter-web/
├── app/
│   ├── page.tsx              # Landing page
│   └── converter/
│       └── page.tsx          # Main converter dashboard
├── src/
│   ├── config/
│   │   └── tools.ts          # Tool registry (add new tools here)
│   └── services/
│       ├── IConverterService.ts           # Interface
│       ├── WebConverterService.ts         # Browser implementation
│       └── ConverterFactory.ts            # Service factory
├── components/               # Reusable UI components
├── public/                   # Static assets
└── docs/                     # Documentation
```

---

## 📚 Documentation

- **[BROWSER_CONVERSIONS_COMPLETE.md](./BROWSER_CONVERSIONS_COMPLETE.md)** - Full feature documentation
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Comprehensive testing instructions
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Implementation details
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for developers
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture overview

---

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing instructions.

### Quick Test
```bash
npm run dev
# Visit http://localhost:3000/converter
# Upload a JPG image to "Image Compressor"
# Click "Convert Now"
# Download the compressed result
```

---

## 🎨 Adding a New Tool

1. **Add to tool registry** (`src/config/tools.ts`)
```typescript
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

2. **Add method to interface** (`src/services/IConverterService.ts`)
```typescript
myNewTool(file: File | string): Promise<ConversionResult>;
```

3. **Implement in service** (`src/services/WebConverterService.ts`)
```typescript
async myNewTool(file: File | string): Promise<ConversionResult> {
  // Your conversion logic
  return { success: true, outputBlob, outputUrl, finalSize };
}
```

4. **Add to UI** (`app/converter/page.tsx`)
```typescript
case 'my-new-tool':
  conversionResult = await converterService.myNewTool(file);
  break;
```

See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for more details.

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔒 Privacy & Security

- ✅ **100% client-side** - No server uploads
- ✅ **No data collection** - Files never leave your browser
- ✅ **Open source** - Transparent code
- ✅ **File size limits** - 200MB for web, 50MB for video
- ✅ **Type validation** - Prevents invalid file types

---

## ⚡ Performance

### Conversion Speed
- Image compression: < 2 seconds
- Image resize/convert: < 1 second
- Video to audio: 10-30 seconds
- OCR: 5-10 seconds
- Data conversions: < 1 second

### Bundle Size
- Main bundle: ~500KB (gzipped)
- FFmpeg.wasm: ~30MB (lazy loaded from CDN)
- Tesseract.js: ~2MB (lazy loaded)

### File Size Limits
- General: 200MB
- Video: 50MB
- Desktop app: Unlimited

---

## 🐛 Known Issues

- **Safari**: FFmpeg.wasm may be slower than Chrome/Firefox
- **Mobile**: Video conversion limited to smaller files
- **First load**: Heavy libraries download on first use (cached after)

---

## 🛣️ Roadmap

### Phase 1: Polish ✅
- [x] 11 working tools
- [x] Dynamic tool registry
- [x] Smart file detection
- [x] Error handling
- [x] Responsive UI

### Phase 2: Enhancements
- [ ] Image cropping tool
- [ ] PDF merge/split
- [ ] More video formats
- [ ] Multi-language OCR
- [ ] Batch processing (limited)

### Phase 3: Desktop App
- [ ] Electron wrapper
- [ ] Native file system
- [ ] FFmpeg native (faster)
- [ ] Pandoc integration
- [ ] No file size limits

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [FFmpeg.wasm](https://ffmpegwasm.netlify.app/) - Video processing in browser
- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR in browser
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation
- [JSZip](https://stuk.github.io/jszip/) - ZIP file creation
- [Showdown](https://github.com/showdownjs/showdown) - Markdown conversion
- [PapaParse](https://www.papaparse.com/) - CSV parsing
- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) - Image compression

---

## 🎉 Status

**✅ PRODUCTION READY**

All 11 tools are fully implemented, tested, and ready for deployment!

---

**Made with ❤️ using Next.js and React**
