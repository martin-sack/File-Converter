# ✅ Deployment Checklist

Quick reference for deploying the File Converter project.

---

## 📋 Pre-Deployment Tasks

### 1. Git & Repository Setup

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: complete browser-native file converter with 14 tools"

# Add remote
git remote add origin https://github.com/martin-sack/File-Converter.git

# Push
git branch -M main
git push -u origin main
```

**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

### 2. Web App Verification

```bash
cd universal-converter-web
npm install
npm run dev
```

**Test all 14 tools**:
- ⬜ Image Compressor
- ⬜ Image Resizer
- ⬜ Image Converter
- ⬜ Image to PDF
- ⬜ Markdown to HTML
- ⬜ Text to PDF
- ⬜ OCR Text Extract
- ⬜ JSON to CSV
- ⬜ CSV to JSON
- ⬜ JSON to PDF
- ⬜ JSON to Excel
- ⬜ JSON to HTML
- ⬜ Create ZIP
- ⬜ Video to Audio

**Production Build**:
```bash
npm run build
npm start
```

- ⬜ Build succeeds without errors
- ⬜ App runs on localhost:3000
- ⬜ No console errors

---

### 3. Update Download Buttons

**File**: `universal-converter-web/app/converter/page.tsx`

Find and replace:
```typescript
// OLD
href="https://github.com"

// NEW
href="https://github.com/martin-sack/File-Converter/releases/latest"
target="_blank"
rel="noopener noreferrer"
```

**File**: `universal-converter-web/app/page.tsx`

Same replacement for landing page button.

- ⬜ Converter page button updated
- ⬜ Landing page button updated

---

### 4. Desktop App Build

```bash
# Install dependencies
npm install

# Build desktop app
npm run desktop:build

# Package for distribution
npm run desktop:dist
```

**Check output in `release/` folder**:
- ⬜ Windows: `.exe` file generated
- ⬜ macOS: `.dmg` file generated
- ⬜ Linux: `.AppImage` file generated

---

### 5. Create GitHub Release

1. Go to: https://github.com/martin-sack/File-Converter/releases
2. Click "Create a new release"
3. Tag: `v1.0.0`
4. Title: `File Converter v1.0.0`
5. Description:
   ```markdown
   ## 🎉 First Release
   
   ### Web App
   - 14 browser-native conversion tools
   - No server uploads, complete privacy
   - Smart file detection
   
   ### Desktop App
   - Unlimited file sizes
   - Batch processing
   - Advanced conversions
   
   ### Downloads
   - Windows: File-Converter-Setup-1.0.0.exe
   - macOS: File-Converter-1.0.0.dmg
   - Linux: File-Converter-1.0.0.AppImage
   ```
6. Upload installer files
7. Publish release

- ⬜ Release created
- ⬜ Installers uploaded
- ⬜ Release published

---

### 6. Deploy Web App

#### Option A: Vercel

```bash
npm i -g vercel
cd universal-converter-web
vercel
```

**Configuration**:
- Root Directory: `universal-converter-web`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

```bash
# Deploy to production
vercel --prod
```

- ⬜ Vercel account connected
- ⬜ Project configured
- ⬜ Deployed to production
- ⬜ Custom domain configured (optional)

#### Option B: Netlify

```bash
cd universal-converter-web
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

- ⬜ Netlify account connected
- ⬜ Deployed to production

---

### 7. Update Documentation

- ⬜ README.md updated with deployment info
- ⬜ DEPLOYMENT_SETUP.md reviewed
- ⬜ Web app README updated
- ⬜ License file added (if needed)

---

### 8. Final Verification

**Web App**:
- ⬜ Visit production URL
- ⬜ Test 2-3 tools
- ⬜ Verify download button works
- ⬜ Check mobile responsiveness
- ⬜ Test in different browsers

**Desktop App**:
- ⬜ Download installer from GitHub
- ⬜ Install on test machine
- ⬜ Launch application
- ⬜ Test basic conversion
- ⬜ Verify no errors

**GitHub**:
- ⬜ Repository is public
- ⬜ README displays correctly
- ⬜ Release is visible
- ⬜ Download links work

---

## 🚀 Quick Commands Reference

### Web App
```bash
# Development
cd universal-converter-web && npm run dev

# Build
cd universal-converter-web && npm run build

# Deploy (Vercel)
cd universal-converter-web && vercel --prod
```

### Desktop App
```bash
# Build
npm run desktop:build

# Package
npm run desktop:dist
```

### Git
```bash
# Status
git status

# Add all
git add .

# Commit
git commit -m "your message"

# Push
git push origin main
```

---

## 📞 Troubleshooting

### Build Fails
```bash
# Clean and rebuild
rm -rf node_modules .next dist
npm install
npm run build
```

### Git Push Fails
```bash
# Check remote
git remote -v

# Re-add remote
git remote remove origin
git remote add origin https://github.com/martin-sack/File-Converter.git
git push -u origin main
```

### Vercel Deploy Fails
```bash
# Check build locally first
cd universal-converter-web
npm run build

# If successful, try deploy again
vercel --prod
```

---

## ✅ Completion Status

**Overall Progress**: ⬜⬜⬜⬜⬜⬜⬜⬜ 0/8

- ⬜ Git & Repository Setup
- ⬜ Web App Verification
- ⬜ Download Buttons Updated
- ⬜ Desktop App Built
- ⬜ GitHub Release Created
- ⬜ Web App Deployed
- ⬜ Documentation Updated
- ⬜ Final Verification

---

**When all tasks are complete, you're ready to share your project! 🎉**
