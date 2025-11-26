# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser File Converter                   │
│                      (Next.js 16 + React 19)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        UI Layer                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  app/converter/page.tsx                              │  │
│  │  - Dashboard with tool grid                          │  │
│  │  - Drag-and-drop file upload                         │  │
│  │  - Tool-specific configuration panels                │  │
│  │  - Result display & download                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Configuration Layer                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  src/config/tools.ts                                 │  │
│  │  - Tool registry (11 tools)                          │  │
│  │  - Category definitions                              │  │
│  │  - Icon mappings                                     │  │
│  │  - Helper functions                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  IConverterService (Interface)                       │  │
│  │  - Defines conversion methods                        │  │
│  │  - Type-safe contracts                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│              ┌───────────────┴───────────────┐              │
│              ▼                               ▼              │
│  ┌─────────────────────┐       ┌─────────────────────┐    │
│  │ WebConverterService │       │ElectronConverter    │    │
│  │ (Browser-native)    │       │Service (Desktop)    │    │
│  │ - Canvas API        │       │ - Sharp             │    │
│  │ - FFmpeg.wasm       │       │ - FFmpeg native     │    │
│  │ - Tesseract.js      │       │ - Tesseract native  │    │
│  │ - jsPDF             │       │ - Pandoc            │    │
│  │ - JSZip             │       │ - Node.js libs      │    │
│  │ - Showdown          │       │ - No limits         │    │
│  │ - PapaParse         │       │                     │    │
│  └─────────────────────┘       └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Conversion Libraries                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Images:  browser-image-compression, Canvas API      │  │
│  │  PDF:     jsPDF, pdf-lib                             │  │
│  │  Video:   FFmpeg.wasm (30MB, lazy loaded)            │  │
│  │  OCR:     Tesseract.js (2MB, lazy loaded)            │  │
│  │  Data:    PapaParse                                  │  │
│  │  Archive: JSZip                                      │  │
│  │  Text:    Showdown                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
User Action
    │
    ▼
┌─────────────────┐
│ File Upload     │ ← Drag & drop or click
│ (File object)   │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ File Detection  │ ← detectFileType()
│ (Smart Mode)    │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Tool Selection  │ ← User picks tool or auto-selected
│ (Tool ID)       │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Configuration   │ ← User sets options (quality, size, etc.)
│ (Options)       │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Conversion      │ ← WebConverterService.method()
│ (Processing)    │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Result          │ ← { success, outputBlob, outputUrl }
│ (Blob + URL)    │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Download        │ ← User clicks download button
│ (File saved)    │
└─────────────────┘
```

---

## Component Hierarchy

```
app/converter/page.tsx
│
├── Dashboard View (no tool selected)
│   ├── Drop Zone
│   │   └── File Input (hidden)
│   ├── Tool Grid
│   │   └── Tool Cards (11 cards)
│   │       ├── Icon
│   │       ├── Name
│   │       └── Description
│   └── Pro Tools Section
│       ├── Pro Tool Cards (6 cards)
│       └── Download Desktop Button
│
└── Tool View (tool selected)
    ├── Back Button
    ├── Tool Header
    ├── File Drop Zone (if no file)
    ├── File Display (if file selected)
    ├── Configuration Panel
    │   ├── Image Compressor Config
    │   ├── Image Resizer Config
    │   ├── Image Converter Config
    │   ├── Video to Audio Config
    │   └── Other Tool Configs
    ├── Convert Button
    └── Result Display
        ├── Success State
        │   ├── File Size
        │   └── Download Button
        └── Error State
            └── Error Message
```

---

## Tool Registry Structure

```typescript
TOOLS: ToolDefinition[]
    │
    ├── Images (4 tools)
    │   ├── image-compressor
    │   ├── image-resizer
    │   ├── image-converter
    │   └── image-to-pdf
    │
    ├── Text (3 tools)
    │   ├── markdown-to-html
    │   ├── text-to-pdf
    │   └── ocr-text-extract
    │
    ├── Data (2 tools)
    │   ├── json-to-csv
    │   └── csv-to-json
    │
    ├── Archives (1 tool)
    │   └── create-zip
    │
    └── Media (1 tool)
        └── video-to-audio
```

---

## Service Layer Pattern

```typescript
interface IConverterService {
  // Image operations
  compressImage(options): Promise<ConversionResult>
  resizeImage(options): Promise<ConversionResult>
  convertImageFormat(file, format): Promise<ConversionResult>
  imageToPDF(file): Promise<ConversionResult>
  
  // Video operations
  videoToAudio(options): Promise<ConversionResult>
  compressVideo(file, quality): Promise<ConversionResult>
  
  // Document operations
  markdownToHtml(file): Promise<ConversionResult>
  textToPdf(file): Promise<ConversionResult>
  jsonToCsv(file): Promise<ConversionResult>
  csvToJson(file): Promise<ConversionResult>
  
  // OCR
  extractText(options): Promise<ConversionResult & { text?: string }>
  
  // Archive
  zipFiles(files): Promise<ConversionResult>
  unzipFile(file): Promise<ConversionResult>
  
  // Utility
  isElectron(): boolean
  getMaxFileSize(): number
}
```

---

## Conversion Pipeline

### Image Compression
```
File → browser-image-compression → Compressed Blob → Download
       (Web Worker)
```

### Image Resize
```
File → Canvas API → drawImage() → toBlob() → Download
```

### Image Format Conversion
```
File → Canvas API → drawImage() → toBlob(mimeType) → Download
```

### Image to PDF
```
File → Image → jsPDF.addImage() → PDF Blob → Download
```

### Video to Audio
```
File → FFmpeg.wasm → Extract Audio → MP3 Blob → Download
       (First load: Download 30MB WASM from CDN)
```

### Markdown to HTML
```
File → Read Text → Showdown.makeHtml() → HTML Blob → Download
```

### Text to PDF
```
File → Read Text → jsPDF.text() → PDF Blob → Download
       (Auto-pagination)
```

### OCR Text Extract
```
File → Tesseract.js → recognize() → Text Blob → Download
       (First load: Download 2MB from CDN)
```

### JSON to CSV
```
File → Parse JSON → PapaParse.unparse() → CSV Blob → Download
```

### CSV to JSON
```
File → PapaParse.parse() → JSON.stringify() → JSON Blob → Download
```

### Create ZIP
```
Files → JSZip.file() → generateAsync() → ZIP Blob → Download
```

---

## State Management

```typescript
// UI State
const [files, setFiles] = useState<File[]>([])
const [activeTool, setActiveTool] = useState<string | null>(null)
const [isDragging, setIsDragging] = useState(false)
const [isProcessing, setIsProcessing] = useState(false)
const [result, setResult] = useState<any>(null)
const [showToolSelector, setShowToolSelector] = useState(false)

// Configuration State
const [conversionOptions, setConversionOptions] = useState({
  format: 'webp',
  quality: 0.8,
  width: 800,
  height: 600,
  targetSizeKB: 500
})

// Service Instance
const converterService = useRef(new WebConverterService()).current
```

---

## Error Handling Flow

```
User Action
    │
    ▼
Try Conversion
    │
    ├─ Success ──────────────────┐
    │                            │
    └─ Error                     │
        │                        │
        ├─ File too large        │
        ├─ Invalid format        │
        ├─ Parse error           │
        ├─ Network error         │
        └─ Unknown error         │
                                 │
                                 ▼
                        Display Result
                                 │
                        ├─ Success UI
                        │   ├─ File size
                        │   └─ Download button
                        │
                        └─ Error UI
                            ├─ Error message
                            └─ Desktop app suggestion
```

---

## Performance Optimizations

### 1. Lazy Loading
```typescript
// FFmpeg.wasm (30MB)
const { FFmpeg } = await import('@ffmpeg/ffmpeg');

// Tesseract.js (2MB)
const worker = await createWorker('eng');
```

### 2. Web Workers
```typescript
// Image compression
await imageCompression(file, {
  useWebWorker: true  // Non-blocking
});
```

### 3. Memory Management
```typescript
// Create Blob URL
const url = URL.createObjectURL(blob);

// Clean up when done
URL.revokeObjectURL(url);
```

### 4. CDN Caching
```typescript
// FFmpeg WASM files cached by browser
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
```

---

## Security Considerations

### 1. File Size Limits
```typescript
if (file.size > this.getMaxFileSize()) {
  return { success: false, error: 'File too large' };
}
```

### 2. Client-Side Only
- No server uploads
- No data leaves browser
- Privacy-first design

### 3. Type Validation
```typescript
// Validate file types
const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!validTypes.includes(file.type)) {
  return { success: false, error: 'Invalid file type' };
}
```

### 4. Error Boundaries
```typescript
try {
  const result = await conversion();
} catch (error) {
  return { success: false, error: error.message };
}
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CDN (Vercel)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static Assets                                       │  │
│  │  - HTML, CSS, JS bundles                             │  │
│  │  - Images, fonts                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      User's Browser                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Next.js App                                         │  │
│  │  - React components                                  │  │
│  │  - Conversion logic                                  │  │
│  │  - File processing                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  External CDN (unpkg.com)                            │  │
│  │  - FFmpeg.wasm (30MB)                                │  │
│  │  - Tesseract.js (2MB)                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

```
Frontend Framework
├── Next.js 16 (App Router)
├── React 19
└── TypeScript 5

Styling
├── Tailwind CSS 4
└── Framer Motion (animations)

Conversion Libraries
├── browser-image-compression (images)
├── jsPDF (PDF generation)
├── FFmpeg.wasm (video/audio)
├── Tesseract.js (OCR)
├── JSZip (archives)
├── Showdown (markdown)
├── PapaParse (CSV)
└── pdf-lib (PDF manipulation)

Development
├── ESLint (linting)
├── TypeScript (type checking)
└── npm (package management)

Deployment
├── Vercel (hosting)
├── CDN (static assets)
└── Edge Network (global distribution)
```

---

## File Structure

```
universal-converter-web/
│
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   └── converter/
│       └── page.tsx                # Main converter dashboard
│
├── src/
│   ├── config/
│   │   └── tools.ts                # Tool registry
│   │
│   └── services/
│       ├── IConverterService.ts    # Interface
│       ├── WebConverterService.ts  # Browser implementation
│       ├── ElectronConverterService.ts  # Desktop implementation
│       └── ConverterFactory.ts     # Service factory
│
├── components/                      # Reusable UI components
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── ...
│
├── public/                          # Static assets
│   ├── images/
│   └── icons/
│
├── docs/                            # Documentation
│   ├── BROWSER_CONVERSIONS_COMPLETE.md
│   ├── TESTING_GUIDE.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── QUICK_REFERENCE.md
│   └── ARCHITECTURE.md (this file)
│
└── package.json                     # Dependencies
```

---

## Future Enhancements

### Phase 1: UI Polish
- Loading animations
- Progress bars
- Tooltips
- Keyboard shortcuts

### Phase 2: More Tools
- Image cropping
- PDF merge/split
- More video formats
- Multi-language OCR

### Phase 3: Desktop App
- Electron wrapper
- Native file system
- FFmpeg native (faster)
- Pandoc integration
- No file size limits

---

**Architecture designed for scalability, maintainability, and performance! 🚀**
