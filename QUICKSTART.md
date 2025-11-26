# Quick Start Guide

## Installation

```bash
# Clone or download the project
cd universal-file-converter

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## First Time Setup

### 1. Install FFmpeg (Required for video/audio conversions)

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
1. Download from https://ffmpeg.org/download.html
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to PATH

**Linux:**
```bash
sudo apt install ffmpeg
```

### 2. Verify Installation

```bash
ffmpeg -version
```

## Usage Guide

### 🎯 Quick Conversions

#### Method 1: Drag & Drop (Recommended)
1. Launch the app
2. Drag files onto the drop zone
3. Single file → Smart Auto Mode with AI suggestions
4. Multiple files → Batch Queue for processing

#### Method 2: Manual Selection
1. Click on a converter card (e.g., "Image Compressor")
2. Select your file
3. Configure settings
4. Click convert

### 🖼️ Image Operations

**Compress Image:**
1. Dashboard → Image Compressor
2. Select image
3. Set target size (e.g., 2048 KB = 2MB)
4. Click "Compress Image"

**Resize Image:**
1. Dashboard → Image Resizer
2. Select image
3. Set width/height
4. Toggle aspect ratio/no-enlarge
5. Click "Resize Image"

**Convert Format:**
1. Dashboard → Image Converter
2. Select image
3. Choose output format (JPG/PNG/WEBP)
4. Click "Convert Image"

### 🎬 Video Operations

**Compress Video:**
1. Dashboard → Video Compressor
2. Select video
3. Choose preset (1080p/720p/480p)
4. Select codec (H.264/H.265)
5. Click "Compress Video"

**Extract Audio:**
1. Dashboard → Media Converter
2. Select video
3. Choose format (MP3/AAC)
4. Click "Convert Media"

### 📄 Document Operations

**Markdown to HTML:**
1. Dashboard → Document Converter
2. Select "Markdown → HTML"
3. Choose .md file
4. Click "Convert Document"

**JSON to CSV:**
1. Dashboard → Document Converter
2. Select "JSON → CSV"
3. Choose .json file
4. Click "Convert Document"

### 🔍 OCR Text Extraction

1. Dashboard → OCR Text Extractor
2. Select image or PDF
3. Click "Extract Text"
4. View extracted text
5. Text is saved as .txt file

### 📦 Batch Processing

**Process Multiple Files:**
1. Drag multiple files onto drop zone
2. Batch Queue opens automatically
3. Choose Sequential or Parallel mode
4. Click "Start Processing"
5. Monitor progress for each file

**Process Entire Folder:**
1. Dashboard → (Coming soon: Folder Converter)
2. Select folder
3. Choose operation:
   - Compress all images to 2MB
   - Extract audio from all videos
   - ZIP entire folder
4. Click "Process Folder"

### 🤖 Smart Auto Mode

1. Drop or select a single file
2. App analyzes file type
3. Shows AI-powered suggestions:
   - Images: Compress, Resize, Convert, PDF
   - Videos: Extract audio, Compress
   - Documents: Convert formats
4. Click suggested action
5. Done!

### 🗜️ Archive Operations

**Create ZIP:**
1. Dashboard → Archive Tools
2. Select "ZIP Files" mode
3. Choose multiple files
4. Click "Create ZIP"
5. Choose save location

**Extract ZIP:**
1. Dashboard → Archive Tools
2. Select "Unzip Archive" mode
3. Choose .zip file
4. Click "Extract ZIP"
5. Choose output folder

## Tips & Tricks

### 💡 Pro Tips

1. **Batch Processing**: Drop multiple files for automatic batch processing
2. **Smart Mode**: Drop single files for AI suggestions
3. **Dark Mode**: Click Settings → Choose Dark theme
4. **Quick Access**: Use drag & drop for fastest workflow
5. **Parallel Mode**: Use for faster batch processing (if CPU allows)

### ⚡ Performance

- **Sequential Mode**: Processes one file at a time (safer, less CPU)
- **Parallel Mode**: Processes multiple files simultaneously (faster, more CPU)
- **Video Compression**: Can take time depending on file size and preset
- **OCR**: Processing time depends on image quality and text amount

### 🎨 Customization

**Change Theme:**
1. Click Settings (⚙️) in header
2. Select Light or Dark
3. Theme applies immediately

**Output Location:**
- Files are saved in the same directory as input
- Suffix added to filename (e.g., `_compressed`, `_resized`)

## Keyboard Shortcuts

- `Cmd/Ctrl + O`: Open file picker (when in converter view)
- `Cmd/Ctrl + ,`: Open settings
- `Esc`: Go back to dashboard

## Troubleshooting

### FFmpeg Not Found
**Error**: "FFmpeg not found" or video conversion fails

**Solution**:
1. Install FFmpeg (see setup above)
2. Restart the app
3. Try conversion again

### OCR Not Working
**Error**: OCR extraction fails

**Solution**:
1. Ensure image has clear, readable text
2. Try higher resolution image
3. Check console for errors

### Batch Processing Stuck
**Issue**: Batch queue not progressing

**Solution**:
1. Click "Cancel"
2. Check individual file errors
3. Remove problematic files
4. Try again

### App Won't Start
**Issue**: Electron app doesn't launch

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Rebuild native modules
npm rebuild

# Try again
npm run dev
```

## Building for Production

```bash
# Build the app
npm run build

# Create distributable for your platform
npm run dist

# Or specify platform
npm run dist:mac   # macOS
npm run dist:win   # Windows
```

Output will be in `release/` directory.

## Next Steps

- Read [FEATURES.md](FEATURES.md) for detailed feature documentation
- Check [README.md](README.md) for technical details
- Explore the app and try different converters!

## Support

For issues or questions:
1. Check this guide first
2. Review error messages
3. Check console logs (View → Toggle Developer Tools)
4. File an issue on GitHub

Happy converting! 🚀
