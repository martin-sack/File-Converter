# 🚀 Deployment Setup Guide

## Project Structure

This is a monorepo containing:
- **Web App**: `universal-converter-web/` - Next.js browser-only converter
- **Desktop App**: Root directory - Electron desktop application

---

## ✅ Task 1: Git & Repo Setup

### Initialize and Push to GitHub

```bash
# 1. Check if git is initialized
git status

# 2. If not initialized
git init

# 3. Add all files
git add .

# 4. Create initial commit
git commit -m "feat: complete browser-native file converter with 14 tools"

# 5. Add remote (if not already added)
git remote add origin https://github.com/martin-sack/File-Converter.git

# 6. Push to main
git branch -M main
git push -u origin main
```

### .gitignore (Already exists, verify it includes)

```gitignore
# Dependencies
node_modules/
*/node_modules/

# Build outputs
.next/
out/
dist/
build/

# Environment
.env
.env.local
.env*.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*

# Electron
release/
```

---

## ✅ Task 2: Web App Verification

### Install & Run

```bash
cd universal-converter-web
npm install
npm run dev
```

Visit: `http://localhost:3000/converter`

### Test All 14 Tools

| # | Tool | Test File | Expected Output |
|---|------|-----------|-----------------|
| 1 | Image Compressor | photo.jpg | Compressed JPG |
| 2 | Image Resizer | photo.png | Resized PNG |
| 3 | Image Converter | photo.jpg | Converted WEBP/PNG |
| 4 | Image to PDF | photo.jpg | PDF with image |
| 5 | Markdown to HTML | README.md | Styled HTML |
| 6 | Text to PDF | document.txt | Formatted PDF |
| 7 | OCR Text Extract | screenshot.png | Extracted text |
| 8 | JSON to CSV | data.json | CSV file |
| 9 | CSV to JSON | data.csv | JSON file |
| 10 | JSON to PDF | data.json | Formatted PDF |
| 11 | JSON to Excel | data.json | XLSX file |
| 12 | JSON to HTML | data.json | HTML table |
| 13 | Create ZIP | multiple files | ZIP archive |
| 14 | Video to Audio | video.mp4 | MP3 audio |

### Production Build

```bash
npm run build
npm start
```

Verify no errors and app runs on `http://localhost:3000`

---

## ✅ Task 3: Separate Web vs Desktop Builds

### Update Root package.json

```json
{
  "name": "file-converter",
  "version": "1.0.0",
  "scripts": {
    "web:dev": "cd universal-converter-web && npm run dev",
    "web:build": "cd universal-converter-web && npm run build",
    "web:start": "cd universal-converter-web && npm start",
    "web:install": "cd universal-converter-web && npm install",
    
    "desktop:dev": "concurrently \"npm run desktop:build:watch\" \"electron .\"",
    "desktop:build": "tsc -p tsconfig.main.json && electron-builder",
    "desktop:build:watch": "tsc -p tsconfig.main.json --watch",
    "desktop:package": "electron-builder --dir",
    "desktop:dist": "electron-builder"
  }
}
```

### Folder Structure

```
File-Converter/
├── universal-converter-web/     # Next.js Web App
│   ├── app/
│   ├── components/
│   ├── src/
│   ├── package.json
│   └── next.config.ts
│
├── src/                         # Electron Desktop App
│   ├── main.ts
│   ├── preload.ts
│   ├── converters/
│   ├── services/
│   └── renderer/
│
├── package.json                 # Root package.json
└── electron-builder.yml         # Electron builder config
```

---

## ✅ Task 4: Desktop App Packaging

### Install electron-builder

```bash
npm install --save-dev electron-builder
```

### Create electron-builder.yml

```yaml
appId: com.fileconverter.app
productName: File Converter
copyright: Copyright © 2024 File Converter

directories:
  output: release
  buildResources: build

files:
  - dist/**/*
  - node_modules/**/*
  - package.json

mac:
  category: public.app-category.productivity
  icon: build/icon.icns
  target:
    - dmg
    - zip

win:
  icon: build/icon.ico
  target:
    - nsis
    - portable

linux:
  icon: build/icon.png
  target:
    - AppImage
    - deb

nsis:
  oneClick: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true
```

### Build Desktop App

```bash
# Build TypeScript
npm run desktop:build

# Package for current platform
npm run desktop:dist

# Output will be in: release/
```

### Expected Output Files

- **Windows**: `File-Converter-Setup-1.0.0.exe`
- **macOS**: `File-Converter-1.0.0.dmg`
- **Linux**: `File-Converter-1.0.0.AppImage`

---

## ✅ Task 5: "Download Desktop App" Button

### Create GitHub Release

1. Go to: https://github.com/martin-sack/File-Converter/releases
2. Click "Create a new release"
3. Tag: `v1.0.0`
4. Title: `File Converter v1.0.0`
5. Upload built installers:
   - `File-Converter-Setup-1.0.0.exe` (Windows)
   - `File-Converter-1.0.0.dmg` (macOS)
   - `File-Converter-1.0.0.AppImage` (Linux)
6. Publish release

### Update Download Button

**File**: `universal-converter-web/app/converter/page.tsx`

Find the "Download Desktop App" button and update:

```typescript
// OLD
<a href="https://github.com" ...>
  Download Desktop App (Free)
</a>

// NEW
<a 
  href="https://github.com/martin-sack/File-Converter/releases/latest"
  target="_blank"
  rel="noopener noreferrer"
  ...
>
  <Download className="w-5 h-5" />
  Download Desktop App (Free)
</a>
```

**File**: `universal-converter-web/app/page.tsx`

Update landing page button:

```typescript
<a
  href="https://github.com/martin-sack/File-Converter/releases/latest"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2"
>
  <Download className="w-5 h-5" />
  Download for Desktop
</a>
```

### Alternative: Platform-Specific Downloads

Create a download page: `universal-converter-web/app/download/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function DownloadPage() {
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) setPlatform('windows');
    else if (userAgent.indexOf('Mac') !== -1) setPlatform('mac');
    else if (userAgent.indexOf('Linux') !== -1) setPlatform('linux');
  }, []);

  const downloads = {
    windows: 'https://github.com/martin-sack/File-Converter/releases/latest/download/File-Converter-Setup-1.0.0.exe',
    mac: 'https://github.com/martin-sack/File-Converter/releases/latest/download/File-Converter-1.0.0.dmg',
    linux: 'https://github.com/martin-sack/File-Converter/releases/latest/download/File-Converter-1.0.0.AppImage'
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">Download File Converter</h1>
        
        <div className="grid gap-4">
          <a
            href={downloads.windows}
            className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold">Windows</h3>
              <p className="text-zinc-400">Windows 10/11 (64-bit)</p>
            </div>
            <Download className="w-8 h-8" />
          </a>

          <a
            href={downloads.mac}
            className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold">macOS</h3>
              <p className="text-zinc-400">macOS 10.15+ (Intel & Apple Silicon)</p>
            </div>
            <Download className="w-8 h-8" />
          </a>

          <a
            href={downloads.linux}
            className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold">Linux</h3>
              <p className="text-zinc-400">Ubuntu, Debian, Fedora (64-bit)</p>
            </div>
            <Download className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## ✅ Task 6: Documentation

### Update README.md

See the comprehensive README below.

---

## 🚀 Deployment

### Web App (Vercel)

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   cd universal-converter-web
   vercel
   ```

2. **Configure**:
   - Root Directory: `universal-converter-web`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables**: None required (all client-side)

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Alternative: Netlify

```bash
cd universal-converter-web
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Desktop App Distribution

1. **GitHub Releases**: Upload installers to releases
2. **Auto-updates**: Configure electron-updater in `main.ts`
3. **Code Signing**: 
   - Windows: Sign with certificate
   - macOS: Sign with Apple Developer ID

---

## 📋 Checklist

### Pre-Deployment
- [ ] All 14 web tools tested and working
- [ ] Production build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] Desktop app builds successfully
- [ ] Installers generated for all platforms

### Git & GitHub
- [ ] Repository initialized
- [ ] All files committed
- [ ] Pushed to GitHub
- [ ] .gitignore configured correctly

### Web App
- [ ] Deployed to Vercel/Netlify
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] All routes working

### Desktop App
- [ ] GitHub Release created
- [ ] Installers uploaded
- [ ] Download buttons updated
- [ ] Release notes written

### Documentation
- [ ] README.md updated
- [ ] DEPLOYMENT_SETUP.md created
- [ ] Contributing guidelines added
- [ ] License file added

---

## 🔧 Troubleshooting

### Web App Build Fails
```bash
cd universal-converter-web
rm -rf .next node_modules
npm install
npm run build
```

### Desktop App Won't Build
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run desktop:build
```

### FFmpeg.wasm Not Loading
- Check CDN is accessible
- Verify CORS headers
- Test in incognito mode

### Download Button Not Working
- Verify GitHub release is published
- Check asset URLs are correct
- Test in different browsers

---

## 📞 Support

- **Issues**: https://github.com/martin-sack/File-Converter/issues
- **Discussions**: https://github.com/martin-sack/File-Converter/discussions
- **Documentation**: See README.md

---

**Status**: Ready for deployment! 🚀
