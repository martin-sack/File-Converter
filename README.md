# Universal File Converter

A production-ready desktop application built with Electron + TypeScript + React for converting files between various formats.

## Features

### 🎯 Smart Features
- **Drag & Drop Zone**: Drop files anywhere to auto-detect type and suggest conversions
- **Smart Auto Mode**: AI-powered suggestions for best conversion based on file type
- **Batch Queue System**: Process multiple files with sequential or parallel mode
- **Folder Converter**: Convert entire folders at once (compress images, extract audio, zip all)

### 🖼️ Image Tools
- **Image Format Converter**: Convert between JPG, PNG, WEBP
- **Image Compressor**: Compress images to target file size with automatic quality adjustment
- **Image Resizer**: Resize images with aspect ratio control and no-enlarge option

### 📄 Document Tools
- **Markdown → HTML**: Convert Markdown files to styled HTML
- **JSON ↔ CSV**: Bidirectional conversion between JSON and CSV formats
- **OCR Text Extractor**: Extract text from images and PDFs using Tesseract.js

### 🎬 Media Tools
- **Video Compressor**: Compress videos to 1080p, 720p, or 480p with H.264/H.265 codec
- **Video → MP3**: Extract audio from video files as MP3
- **Video → AAC**: Extract audio from video files as AAC

### 🗜️ Archive Tools
- **ZIP Files**: Compress multiple files into a ZIP archive
- **Unzip Files**: Extract files from ZIP archives

### ✨ UI Features
- Light & Dark theme support
- Drag & drop file selection with auto-detection
- Progress bars and notifications
- Animated transitions and hover effects
- Batch processing with status tracking
- Clean, modern interface
- Settings panel

## Installation

### Prerequisites
- Node.js 18+ and npm
- FFmpeg (for media conversions)

### Install FFmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html and add to PATH

**Linux:**
```bash
sudo apt install ffmpeg
```

### Install Dependencies
```bash
npm install
```

## Development

### Run in Development Mode
```bash
npm run dev
```

This starts both the Electron main process and the Vite dev server.

### Build for Production
```bash
npm run build
```

### Create Distributable
```bash
# For current platform
npm run dist

# For macOS
npm run dist:mac

# For Windows
npm run dist:win
```

## Project Structure

```
/
├── src/
│   ├── main.ts              # Electron main process
│   ├── preload.ts           # Preload script (IPC bridge)
│   ├── converters/          # Conversion logic
│   │   ├── imageToPDF.ts
│   │   ├── imageResize.ts
│   │   ├── imageCompress.ts
│   │   ├── imageConvert.ts
│   │   ├── videoCompress.ts      # NEW: Video compression
│   │   ├── markdownToHtml.ts
│   │   ├── csvJson.ts
│   │   ├── videoToMp3.ts
│   │   ├── videoToAAC.ts
│   │   ├── audioConvert.ts
│   │   ├── ocrExtract.ts         # NEW: OCR text extraction
│   │   ├── folderBatch.ts        # NEW: Folder batch processing
│   │   └── zipFiles.ts
│   ├── utils/
│   │   └── fileDetector.ts       # NEW: Smart file type detection
│   └── renderer/            # React frontend
│       ├── index.tsx
│       ├── App.tsx
│       ├── styles.css
│       └── components/
│           ├── Dashboard.tsx
│           ├── DropZone.tsx           # NEW: Drag & drop zone
│           ├── BatchQueue.tsx         # NEW: Batch processing UI
│           ├── SmartAutoMode.tsx      # NEW: AI-powered suggestions
│           ├── ImageConverter.tsx
│           ├── ImageCompressor.tsx
│           ├── ImageResizer.tsx
│           ├── VideoCompressor.tsx    # NEW: Video compression UI
│           ├── DocumentConverter.tsx
│           ├── MediaConverter.tsx
│           ├── OCRExtractor.tsx       # NEW: OCR UI
│           ├── FolderConverter.tsx    # NEW: Folder batch UI
│           ├── ArchiveTools.tsx
│           └── Settings.tsx
├── package.json
├── tsconfig.json
├── tsconfig.main.json
├── vite.config.ts
├── README.md
└── FEATURES.md              # NEW: Detailed feature documentation
```

## Technology Stack

### Core
- **Electron**: Desktop app framework
- **TypeScript**: Type-safe development
- **React**: UI framework
- **Vite**: Fast build tool

### Conversion Libraries
- **sharp**: Image processing (resize, compress, convert)
- **pdf-lib**: PDF generation
- **fluent-ffmpeg**: Video/audio conversions and compression
- **ffmpeg-static**: Bundled FFmpeg binary
- **tesseract.js**: OCR text extraction
- **jszip**: ZIP/unzip operations
- **showdown**: Markdown to HTML
- **csv-parser & json2csv**: CSV/JSON conversions
- **path-browserify**: Path utilities for renderer process

## Security

The app uses Electron's security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Secure IPC communication via preload script
- No remote module usage

## Notes

### PDF to Word & Word to PDF
These conversions require additional tools:
- **PDF → Word**: Requires OCR libraries or external services
- **Word → PDF**: Requires LibreOffice headless or MS Office

To enable Word → PDF, install LibreOffice and use:
```bash
soffice --headless --convert-to pdf input.docx
```

### HTML to PDF
Requires Puppeteer or similar headless browser. Install:
```bash
npm install puppeteer
```

## Building Installers

The app uses electron-builder for packaging:

**macOS**: Creates DMG and ZIP
**Windows**: Creates NSIS installer and portable exe

Output files are in the `release/` directory.

## License

MIT
