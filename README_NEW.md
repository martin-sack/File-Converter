# 🚀 Universal File Converter

A powerful, privacy-first file converter with **14 browser-native tools** and a full-featured desktop application. Convert images, videos, documents, and data formats—all without uploading files to any server.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Electron](https://img.shields.io/badge/Electron-Latest-47848F)](https://www.electronjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🌐 Web App (Browser-Native)

**14 Working Tools - No Server Required:**

- 🖼️ **Image Tools** (4): Compress, Resize, Convert (JPG/PNG/WEBP), Image → PDF
- 📝 **Text & Documents** (4): Markdown → HTML, Text → PDF, JSON → PDF, OCR Text Extract
- 📊 **Data Conversion** (5): JSON ↔ CSV, JSON → Excel, JSON → HTML
- 📦 **Archives** (1): Create ZIP
- 🎬 **Media** (1): Video → Audio (MP4/WebM → MP3)

**Key Features:**
- ✅ 100% client-side processing
- ✅ No file uploads, complete privacy
- ✅ Smart file detection
- ✅ Preview before download
- ✅ 200MB file size limit (50MB for video)

### 💻 Desktop App (Electron)

**Pro Features:**
- ✅ Unlimited file sizes
- ✅ Batch processing (100+ files)
- ✅ Advanced conversions (PDF ↔ DOCX, Video compression)
- ✅ Native performance with GPU acceleration
- ✅ Offline operation

---

## 🚀 Quick Start

### Web App (Browser)

**Try it now**: [https://your-domain.com](https://your-domain.com)

Or run locally:

```bash
cd universal-converter-web
npm install
npm run dev
```

Visit: `http://localhost:3000/converter`

### Desktop App

**Download**: [Latest Release](https://github.com/martin-sack/File-Converter/releases/latest)

Or build from source:

```bash
npm install
npm run desktop:build
```

---

## 📦 Installation

### Prerequisites

- Node.js 20+
- npm or yarn

### Clone Repository

```bash
git clone https://github.com/martin-sack/File-Converter.git
cd File-Converter
npm install
```

### Install Web App Dependencies

```bash
cd universal-converter-web
npm install
```

---

## 🛠️ Development

### Web App

```bash
# Development server
npm run web:dev

# Production build
npm run web:build

# Start production server
npm run web:start
```

### Desktop App

```bash
# Development mode
npm run desktop:dev

# Build TypeScript
npm run desktop:build

# Package for distribution
npm run desktop:dist
```

---

## 📁 Project Structure

```
File-Converter/
├── universal-converter-web/     # Next.js Web App
│   ├── app/                     # Next.js pages
│   │   ├── page.tsx            # Landing page
│   │   └── converter/          # Converter dashboard
│   ├── components/             # React components
│   ├── src/
│   │   ├── config/
│   │   │   └── tools.ts        # Tool registry
│   │   └── services/
│   │       └── WebConverterService.ts
│   └── package.json
│
├── src/                         # Electron Desktop App
│   ├── main.ts                 # Electron main process
│   ├── preload.ts              # Preload script
│   ├── converters/             # Conversion logic
│   ├── services/               # Service layer
│   └── renderer/               # React UI
│
├── package.json                # Root package.json
├── electron-builder.yml        # Electron builder config
└── README.md                   # This file
```

---

## 🎯 Usage

### Web App

1. Visit the converter page
2. Upload a file (drag & drop or click)
3. Choose a tool (or let Smart Mode detect)
4. Configure options if needed
5. Click "Convert Now"
6. Preview or Download result

### Desktop App

1. Launch the application
2. Select conversion tool
3. Choose file(s)
4. Configure settings
5. Convert and save

---

## 🧪 Testing

### Test All Web Tools

```bash
cd universal-converter-web
npm run dev
```

Visit `http://localhost:3000/converter` and test:

- Image Compressor (upload JPG)
- Image Resizer (upload PNG)
- Image Converter (JPG → WEBP)
- Image to PDF (upload image)
- Markdown to HTML (upload .md file)
- Text to PDF (upload .txt file)
- OCR Text Extract (upload screenshot)
- JSON to CSV (upload .json array)
- CSV to JSON (upload .csv file)
- JSON to PDF (upload .json)
- JSON to Excel (upload .json array)
- JSON to HTML (upload .json array)
- Create ZIP (upload multiple files)
- Video to Audio (upload .mp4 < 50MB)

---

## 🚀 Deployment

### Web App (Vercel)

```bash
cd universal-converter-web
vercel
```

**Configuration:**
- Root Directory: `universal-converter-web`
- Build Command: `npm run build`
- Output Directory: `.next`

### Desktop App (GitHub Releases)

```bash
npm run desktop:dist
```

Upload installers to GitHub Releases:
- Windows: `File-Converter-Setup-1.0.0.exe`
- macOS: `File-Converter-1.0.0.dmg`
- Linux: `File-Converter-1.0.0.AppImage`

---

## 🛠️ Tech Stack

### Web App
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Framer Motion
- **Conversion Libraries**:
  - Images: browser-image-compression, Canvas API
  - PDF: jsPDF, pdf-lib
  - Video: FFmpeg.wasm
  - OCR: Tesseract.js
  - Data: PapaParse, xlsx
  - Archives: JSZip
  - Markdown: Showdown

### Desktop App
- **Framework**: Electron
- **Build**: electron-builder
- **Conversion Libraries**:
  - Images: Sharp
  - Video: FFmpeg (native)
  - Documents: Pandoc
  - OCR: Tesseract (native)

---

## 📚 Documentation

- **[DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)** - Complete deployment guide
- **[Web App README](./universal-converter-web/README.md)** - Web app documentation
- **[Testing Guide](./universal-converter-web/TESTING_GUIDE.md)** - Testing instructions
- **[Architecture](./universal-converter-web/ARCHITECTURE.md)** - System design
- **[Troubleshooting](./universal-converter-web/TROUBLESHOOTING.md)** - Common issues

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Electron](https://www.electronjs.org/) - Desktop app framework
- [FFmpeg.wasm](https://ffmpegwasm.netlify.app/) - Video processing in browser
- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR in browser
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
- All other amazing open-source libraries

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/martin-sack/File-Converter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/martin-sack/File-Converter/discussions)
- **Documentation**: See `/universal-converter-web/` folder

---

## 🎉 Status

**✅ Production Ready**

- 14 web tools fully implemented and tested
- Desktop app with advanced features
- Comprehensive documentation
- Ready for deployment

---

**Made with ❤️ using Next.js, React, and Electron**
