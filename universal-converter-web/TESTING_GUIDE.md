# 🧪 Testing Guide - Browser File Converter

## 🚀 Quick Start

```bash
cd universal-converter-web
npm run dev
```

Visit: **http://localhost:3000/converter**

---

## ✅ Test All 11 Tools

### 🖼️ Image Tools

#### 1. Image Compressor
**Test Files:** JPG, PNG, WEBP  
**Steps:**
1. Click "Image Compressor" card
2. Upload a large image (> 1MB)
3. Adjust target size (e.g., 500 KB)
4. Adjust quality slider (0.1 - 1.0)
5. Click "Convert Now"
6. Download compressed image
7. Verify file size is reduced

**Expected:** Smaller file size, maintained quality

---

#### 2. Image Resizer
**Test Files:** JPG, PNG, WEBP  
**Steps:**
1. Click "Image Resizer" card
2. Upload any image
3. Set width: 800px
4. Set height: 600px
5. Click "Convert Now"
6. Download resized image
7. Check dimensions

**Expected:** Image resized to 800x600 (or proportional if aspect ratio kept)

---

#### 3. Image Converter
**Test Files:** JPG, PNG, WEBP  
**Steps:**
1. Click "Image Converter" card
2. Upload a JPG image
3. Select output format: WEBP
4. Click "Convert Now"
5. Download converted image
6. Verify format changed

**Expected:** Image converted to selected format

---

#### 4. Image to PDF
**Test Files:** JPG, PNG, WEBP  
**Steps:**
1. Click "Image to PDF" card
2. Upload any image
3. Click "Convert Now"
4. Download PDF
5. Open PDF and verify image is embedded

**Expected:** PDF with image, correct orientation

---

### 📝 Text & Document Tools

#### 5. Markdown to HTML
**Test File:** Create `test.md`:
```markdown
# Hello World

This is a **test** document.

- Item 1
- Item 2

```javascript
console.log('code block');
```
```

**Steps:**
1. Click "Markdown to HTML" card
2. Upload test.md
3. Click "Convert Now"
4. Download HTML file
5. Open in browser

**Expected:** Styled HTML with proper formatting, code highlighting

---

#### 6. Text to PDF
**Test File:** Create `test.txt`:
```
This is a test document.

It has multiple paragraphs.

And should be converted to PDF with proper formatting.
```

**Steps:**
1. Click "Text to PDF" card
2. Upload test.txt
3. Click "Convert Now"
4. Download PDF
5. Open and verify text is formatted

**Expected:** PDF with text, proper line breaks, pagination

---

#### 7. OCR Text Extract
**Test File:** Image with text (screenshot, photo of document)  
**Steps:**
1. Click "OCR Text Extract" card
2. Upload image with text
3. Click "Convert Now" (may take 5-10 seconds)
4. Download extracted text file
5. Verify text accuracy

**Expected:** Text file with extracted content

---

### 📊 Data Conversion Tools

#### 8. JSON to CSV
**Test File:** Create `test.json`:
```json
[
  { "name": "John", "age": 30, "city": "New York" },
  { "name": "Jane", "age": 25, "city": "London" },
  { "name": "Bob", "age": 35, "city": "Paris" }
]
```

**Steps:**
1. Click "JSON to CSV" card
2. Upload test.json
3. Click "Convert Now"
4. Download CSV
5. Open in Excel/Numbers

**Expected:** CSV with headers and data rows

---

#### 9. CSV to JSON
**Test File:** Create `test.csv`:
```csv
name,age,city
John,30,New York
Jane,25,London
Bob,35,Paris
```

**Steps:**
1. Click "CSV to JSON" card
2. Upload test.csv
3. Click "Convert Now"
4. Download JSON
5. Verify JSON structure

**Expected:** JSON array with objects

---

### 📦 Archive Tools

#### 10. Create ZIP
**Test Files:** Multiple files (images, text, etc.)  
**Steps:**
1. Click "Create ZIP" card
2. Upload multiple files (use Cmd/Ctrl+Click)
3. Click "Convert Now"
4. Download ZIP file
5. Extract and verify all files are present

**Expected:** ZIP archive with all uploaded files

---

### 🎬 Media Tools

#### 11. Video to Audio
**Test File:** MP4 or WebM video (< 50MB)  
**Steps:**
1. Click "Video to Audio" card
2. Upload video file
3. Select output format: MP3
4. Click "Convert Now" (may take 10-30 seconds)
5. Download MP3
6. Play audio and verify

**Expected:** MP3 audio file extracted from video

**Note:** First use will download FFmpeg.wasm (~30MB) from CDN

---

## 🎯 Smart Mode Testing

### Auto-Detection
1. Go to main dashboard
2. Drag and drop different file types:
   - **Image (JPG/PNG)** → Shows tool selector modal
   - **Video (MP4)** → Auto-selects "Video to Audio"
   - **Markdown (.md)** → Auto-selects "Markdown to HTML"
   - **JSON** → Auto-selects "JSON to CSV"
   - **CSV** → Auto-selects "CSV to JSON"
   - **Text (.txt)** → Auto-selects "Text to PDF"

---

## 🚨 Error Handling Tests

### File Size Limits
1. Try uploading file > 200MB
2. **Expected:** Error message with desktop app recommendation

### Video Size Limit
1. Try uploading video > 50MB to "Video to Audio"
2. **Expected:** Error message about 50MB limit

### Invalid JSON
1. Upload invalid JSON to "JSON to CSV"
2. **Expected:** Parse error message

### Invalid CSV
1. Upload malformed CSV to "CSV to JSON"
2. **Expected:** Parse error message

---

## 🎨 UI/UX Tests

### Drag and Drop
- [x] Drag file over drop zone → Border highlights
- [x] Drop file → File selected
- [x] Multiple files → All files listed

### Tool Cards
- [x] Hover effect → Card scales up
- [x] Click → Opens tool view
- [x] Icons display correctly
- [x] Colors match category

### Configuration Panels
- [x] Image Compressor → Quality slider works
- [x] Image Resizer → Width/height inputs work
- [x] Image Converter → Format dropdown works
- [x] Video to Audio → Format selector works

### Results Display
- [x] Success → Green border, download button
- [x] Error → Red border, error message
- [x] File size displayed correctly

### Navigation
- [x] "Back to Dashboard" → Returns to tool grid
- [x] "Back to Home" → Goes to landing page
- [x] Tool selector modal → Can close with X or backdrop click

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- [x] 3-column tool grid
- [x] Full-width drop zone
- [x] All elements visible

### Tablet (768x1024)
- [x] 2-column tool grid
- [x] Responsive drop zone
- [x] Touch-friendly buttons

### Mobile (375x667)
- [x] 1-column tool grid
- [x] Stacked layout
- [x] Mobile-optimized controls

---

## ⚡ Performance Tests

### Image Compression
- Small (< 1MB): < 2 seconds
- Medium (1-5MB): 2-5 seconds
- Large (5-20MB): 5-10 seconds

### Image Resize/Convert
- Any size: < 1 second

### Video to Audio
- 1 minute video: ~10 seconds
- 5 minute video: ~30 seconds
- First load: +30 seconds (FFmpeg download)

### OCR
- Simple image: 5 seconds
- Complex image: 10 seconds
- First load: +2 seconds (Tesseract download)

---

## 🔍 Browser Compatibility

### Tested Browsers
- [x] Chrome 120+ ✅
- [x] Firefox 120+ ✅
- [x] Safari 17+ ✅
- [x] Edge 120+ ✅

### Known Issues
- Safari: FFmpeg.wasm may be slower
- Firefox: Large file uploads may show warning
- Mobile browsers: Video conversion limited to smaller files

---

## 🐛 Common Issues & Solutions

### Issue: FFmpeg not loading
**Solution:** Check internet connection, CDN may be blocked

### Issue: OCR not working
**Solution:** Ensure image has clear, readable text

### Issue: Large files failing
**Solution:** Use desktop app for files > 200MB

### Issue: Video conversion stuck
**Solution:** Refresh page, try smaller video file

---

## 📊 Test Results Template

```
Date: ___________
Browser: ___________
OS: ___________

Tool Tests:
[ ] Image Compressor
[ ] Image Resizer
[ ] Image Converter
[ ] Image to PDF
[ ] Markdown to HTML
[ ] Text to PDF
[ ] OCR Text Extract
[ ] JSON to CSV
[ ] CSV to JSON
[ ] Create ZIP
[ ] Video to Audio

UI Tests:
[ ] Drag and drop
[ ] Tool cards
[ ] Configuration panels
[ ] Results display
[ ] Navigation

Performance:
[ ] Image tools < 5s
[ ] Video conversion < 30s
[ ] OCR < 10s

Issues Found:
_______________________
_______________________
```

---

## 🎉 Success Criteria

✅ All 11 tools convert files successfully  
✅ No console errors  
✅ Proper error handling  
✅ Download works for all outputs  
✅ UI is responsive  
✅ Smart mode detects file types  
✅ Performance meets targets  

---

## 📝 Notes

- First-time loads may be slower due to library downloads
- FFmpeg.wasm is ~30MB (cached after first use)
- Tesseract.js is ~2MB (cached after first use)
- All conversions happen in browser (no server)
- File size limits are for web version only
- Desktop app has no limits

---

**Happy Testing! 🚀**
