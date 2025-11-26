# 🎯 Smart Detection - File Routing Rules

## Overview

Smart Detection automatically routes supported file types to the appropriate tool or shows a tool selector. Unsupported files stay on the dashboard for manual tool selection.

---

## File Type Routing

### 🖼️ Images → Tool Selector Modal

**Extensions:** `jpg`, `jpeg`, `png`, `webp`

**Behavior:** Shows modal with 4 image tool options

**Tools Available:**
1. Image Compressor
2. Image Resizer
3. Image Converter
4. Image to PDF

**Why Tool Selector?**
- Multiple useful options for images
- User choice is important
- Different use cases (compress vs resize vs convert)

---

### 📄 JSON → Tool Selector Modal

**Extension:** `json`

**Behavior:** Shows modal with 5 JSON conversion options

**Tools Available:**
1. JSON to CSV
2. JSON to PDF
3. JSON to Excel
4. JSON to HTML
5. Create ZIP

**Why Tool Selector?**
- Multiple output formats possible
- User needs to choose destination format
- No single "obvious" conversion

---

### 📝 Text Documents → Auto-Route

**Extension:** `txt`  
**Routes to:** Text to PDF

**Extension:** `md`  
**Routes to:** Markdown to HTML

**Extension:** `csv`  
**Routes to:** CSV to JSON

**Why Auto-Route?**
- Single obvious conversion for each
- TXT → PDF is most common use case
- MD → HTML is standard workflow
- CSV → JSON is typical data conversion

---

### 🎬 Media → Auto-Route

**Extensions:** `mp4`, `webm`  
**Routes to:** Video to Audio

**Why Auto-Route?**
- Only one media conversion available in web version
- Video → Audio is the obvious use case
- No ambiguity

---

### ❌ Unsupported Files → No Auto-Route

**Extensions:** `pdf`, `mp3`, `wav`, `aac`, `docx`, `xlsx`, `pptx`, and any unknown

**Behavior:** Stays on dashboard, no tool selected

**User Must:**
- Manually click a tool from the dashboard
- Most likely: "Create ZIP" to archive the file
- Or: Go back and upload a supported file

**Why No Auto-Route?**
- These files can't be converted in web version
- Don't force user into "Create ZIP"
- Let user discover what's available
- Clear that these files have limited support

---

## User Experience Flow

### Supported File (Auto-Route)

```
1. Upload TXT file
   ↓
2. Smart Detection: "This is a text file"
   ↓
3. Auto-routes to "Text to PDF" tool
   ↓
4. User sees configuration panel
   ↓
5. Click "Convert Now"
   ↓
6. Download PDF
```

### Supported File (Tool Selector)

```
1. Upload JPG image
   ↓
2. Smart Detection: "This is an image"
   ↓
3. Shows modal with 4 image tools
   ↓
4. User picks "Image Compressor"
   ↓
5. See configuration panel
   ↓
6. Click "Convert Now"
   ↓
7. Download compressed image
```

### Unsupported File

```
1. Upload PDF file
   ↓
2. Smart Detection: "Not supported for conversion"
   ↓
3. Stays on dashboard (no tool selected)
   ↓
4. User sees all 14 tool cards
   ↓
5. User manually clicks "Create ZIP"
   ↓
6. File is archived
   ↓
7. Download ZIP
```

---

## Implementation

### Detection Logic

```typescript
const detectFileType = (file: File): string | null => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  
  // Images - handled by tool selector
  const imageExts = ['jpg', 'jpeg', 'png', 'webp'];
  if (imageExts.includes(ext || '')) return null;
  
  // Documents - auto-route
  if (ext === 'txt') return 'text-to-pdf';
  if (ext === 'md') return 'markdown-to-html';
  if (ext === 'csv') return 'csv-to-json';
  
  // JSON - handled by tool selector
  if (ext === 'json') return null;
  
  // Media - auto-route
  const videoExts = ['mp4', 'webm'];
  if (videoExts.includes(ext || '')) return 'video-to-audio';
  
  // Everything else - no detection
  return null;
};
```

### File Selection Handler

```typescript
const handleFileSelect = (selectedFiles: FileList | null) => {
  const ext = fileArray[0].name.split('.').pop()?.toLowerCase();
  
  const imageExts = ['jpg', 'jpeg', 'png', 'webp'];
  const autoRouteExts = ['txt', 'md', 'csv', 'mp4', 'webm'];
  
  if (imageExts.includes(ext || '')) {
    // Show image tool selector
    setShowToolSelector(true);
  } else if (ext === 'json') {
    // Show JSON tool selector
    setShowToolSelector(true);
  } else if (autoRouteExts.includes(ext || '')) {
    // Auto-route to appropriate tool
    const detectedTool = detectFileType(fileArray[0]);
    if (detectedTool) {
      setActiveTool(detectedTool);
    }
  } else {
    // Stay on dashboard, no tool selected
    setActiveTool(null);
  }
};
```

---

## Complete File Type Matrix

| Extension | Detection | Behavior | Tool(s) |
|-----------|-----------|----------|---------|
| **jpg, jpeg, png, webp** | ✅ Yes | Tool Selector | 4 image tools |
| **json** | ✅ Yes | Tool Selector | 5 JSON tools |
| **txt** | ✅ Yes | Auto-route | Text to PDF |
| **md** | ✅ Yes | Auto-route | Markdown to HTML |
| **csv** | ✅ Yes | Auto-route | CSV to JSON |
| **mp4, webm** | ✅ Yes | Auto-route | Video to Audio |
| **pdf** | ❌ No | Dashboard | Manual selection |
| **mp3, wav, aac** | ❌ No | Dashboard | Manual selection |
| **docx, xlsx, pptx** | ❌ No | Dashboard | Manual selection |
| **Other/Unknown** | ❌ No | Dashboard | Manual selection |

---

## Benefits

### 1. Clear Expectations ✅
- Supported files: Automatic routing or tool selector
- Unsupported files: Stay on dashboard
- No confusion about what's possible

### 2. User Control ✅
- Images & JSON: User chooses format
- Documents & Media: Smart auto-routing
- Unsupported: User explores options

### 3. Discoverability ✅
- Tool selectors show what's available
- Dashboard shows all 14 tools
- Users learn about features

### 4. No Dead Ends ✅
- Unsupported files don't auto-route to ZIP
- User can explore all tools
- Can still archive if needed

---

## Testing

### Test Case 1: Image File (Tool Selector)
```bash
1. Upload photo.jpg
2. ✅ Modal appears with 4 image tools
3. Click "Image Compressor"
4. ✅ Routes to compressor tool
5. Convert and download
```

### Test Case 2: JSON File (Tool Selector)
```bash
1. Upload data.json
2. ✅ Modal appears with 5 JSON tools
3. Click "JSON to Excel"
4. ✅ Routes to Excel converter
5. Convert and download
```

### Test Case 3: Text File (Auto-Route)
```bash
1. Upload document.txt
2. ✅ Auto-routes to "Text to PDF"
3. See configuration panel
4. Convert and download
```

### Test Case 4: Video File (Auto-Route)
```bash
1. Upload video.mp4
2. ✅ Auto-routes to "Video to Audio"
3. See configuration panel
4. Convert and download
```

### Test Case 5: PDF File (No Route)
```bash
1. Upload document.pdf
2. ✅ Stays on dashboard
3. ✅ No tool selected
4. User sees all 14 tool cards
5. User manually clicks "Create ZIP"
6. Archive and download
```

### Test Case 6: Unknown File (No Route)
```bash
1. Upload file.xyz
2. ✅ Stays on dashboard
3. ✅ No tool selected
4. User explores available tools
5. User manually selects appropriate tool
```

---

## Edge Cases

### Multiple Files
- Uses first file for detection
- If first file is supported → Routes accordingly
- If first file is unsupported → Stays on dashboard

### No Extension
- Treated as unknown
- Stays on dashboard
- User must manually select tool

### Mixed Case Extensions
- Converted to lowercase for comparison
- `FILE.JPG` → `jpg` → Detected correctly

### Unusual Extensions
- `.jpeg` → Detected as image ✅
- `.webm` → Detected as video ✅
- `.markdown` → Not detected (use `.md`)

---

## Future Enhancements

### Potential Additions

**More Auto-Routes:**
- XLSX → CSV to JSON (if we add Excel import)
- HTML → Markdown (if we add reverse conversion)

**More Tool Selectors:**
- CSV files → Show CSV to JSON, CSV to Excel, CSV to PDF
- Text files → Show Text to PDF, Text to HTML, Text to Markdown

**Smart Suggestions:**
- Analyze file content
- Suggest best tool based on structure
- Show "Recommended" badge on tools

**File Preview:**
- Show file preview in tool selector
- Help user decide which tool to use
- Display file metadata

---

## Summary

### Smart Detection Rules

**Show Tool Selector:**
- Images (JPG, PNG, WEBP)
- JSON files

**Auto-Route:**
- TXT → Text to PDF
- MD → Markdown to HTML
- CSV → CSV to JSON
- MP4/WebM → Video to Audio

**No Detection (Stay on Dashboard):**
- PDF, MP3, DOCX, XLSX, PPTX
- Unknown file types
- User manually selects tool

### Philosophy
- **Supported files:** Help user with smart routing
- **Unsupported files:** Let user explore options
- **Ambiguous files:** Show tool selector
- **Clear files:** Auto-route to obvious tool

### Status
**✅ IMPLEMENTED AND WORKING**

Test it now at: http://localhost:3000/converter

---

**Smart Detection: Helpful but not pushy! 🎯**
