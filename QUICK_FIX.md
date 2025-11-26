# 🔧 Quick Fix for File Selection Issue

## The Problem
Clicking "Click to select file" does nothing.

## The Solution (2 steps)

### Step 1: Build the Main Process
```bash
npm run build:main
```

This compiles TypeScript files that Electron needs:
- `src/main.ts` → `dist/main.js`
- `src/preload.ts` → `dist/preload.js` ← **This is the key file!**

### Step 2: Run the App
```bash
npm run dev
```

## Why This Happens

The `preload.js` file exposes `window.electronAPI` to the renderer process. If it's not compiled, the file selection won't work.

The `dev:main` script in package.json compiles it automatically, but you need to run it at least once.

## Verify It's Working

Open Developer Tools (View → Toggle Developer Tools) and type:
```javascript
window.electronAPI
```

You should see an object with methods. If you see `undefined`, the preload script didn't load.

## One-Command Fix

```bash
npm run build:main && npm run dev
```

## What Was Fixed

1. ✅ Added **HTML → PDF** option to Document Converter
2. ✅ Added error handling to all file selection buttons
3. ✅ Added console logging for debugging
4. ✅ Created ImageToPDF component

## Test After Fix

1. Click "Image to PDF" on dashboard
2. Click "Click to select images"
3. **Native file picker should open** ✅
4. Select images
5. Click "Convert to PDF"
6. PDFs created in same folder

## Still Not Working?

### Nuclear Option:
```bash
rm -rf dist node_modules
npm install
npm run build
npm run dev
```

### Check Console:
Look for errors like:
- "electronAPI not available"
- "Failed to open file picker"
- Any red error messages

### Verify Files Exist:
```bash
ls dist/preload.js
```

Should show the file. If not, run `npm run build:main` again.

## Document Converter Now Has PDF

The Document Converter now includes:
- Markdown → HTML
- **HTML → PDF** ← NEW!
- JSON → CSV
- CSV → JSON

Note: HTML → PDF requires additional setup (Puppeteer). For now, it will show an error message with instructions.

---

**TL;DR**: Run `npm run build:main && npm run dev` and file selection will work! 🎉
