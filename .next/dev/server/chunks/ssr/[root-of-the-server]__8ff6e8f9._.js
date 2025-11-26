module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/services/WebConverterService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Web-Compatible Converter Service using Browser APIs ONLY
__turbopack_context__.s([
    "WebConverterService",
    ()=>WebConverterService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$browser$2d$image$2d$compression$2f$dist$2f$browser$2d$image$2d$compression$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/browser-image-compression/dist/browser-image-compression.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tesseract.js/src/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jszip/lib/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$showdown$2f$dist$2f$showdown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/showdown/dist/showdown.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
class WebConverterService {
    isElectron() {
        return false;
    }
    getMaxFileSize() {
        return 200 * 1024 * 1024; // 200MB for web
    }
    // ============ IMAGE COMPRESSION ============
    async compressImage(options) {
        try {
            const file = options.file;
            if (file.size > this.getMaxFileSize()) {
                return {
                    success: false,
                    error: 'File too large for web version. Download desktop app for unlimited size.'
                };
            }
            const targetSizeMB = options.targetSizeKB / 1024;
            const compressedFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$browser$2d$image$2d$compression$2f$dist$2f$browser$2d$image$2d$compression$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(file, {
                maxSizeMB: targetSizeMB,
                maxWidthOrHeight: 4096,
                useWebWorker: true,
                fileType: file.type,
                initialQuality: options.quality || 0.8
            });
            return {
                success: true,
                outputBlob: compressedFile,
                outputUrl: URL.createObjectURL(compressedFile),
                finalSize: compressedFile.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ IMAGE RESIZING ============
    async resizeImage(options) {
        try {
            const file = options.file;
            return new Promise((resolve)=>{
                const img = new Image();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                img.onload = ()=>{
                    let { width, height } = options;
                    if (options.keepAspectRatio) {
                        const aspectRatio = img.width / img.height;
                        if (width && !height) {
                            height = Math.round(width / aspectRatio);
                        } else if (height && !width) {
                            width = Math.round(height * aspectRatio);
                        }
                    }
                    width = width || img.width;
                    height = height || img.height;
                    if (options.noEnlarge) {
                        width = Math.min(width, img.width);
                        height = Math.min(height, img.height);
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob)=>{
                        if (blob) {
                            resolve({
                                success: true,
                                outputBlob: blob,
                                outputUrl: URL.createObjectURL(blob),
                                finalSize: blob.size
                            });
                        } else {
                            resolve({
                                success: false,
                                error: 'Failed to create blob'
                            });
                        }
                    }, file.type, 0.95);
                };
                img.onerror = ()=>{
                    resolve({
                        success: false,
                        error: 'Failed to load image'
                    });
                };
                img.src = URL.createObjectURL(file);
            });
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ IMAGE FORMAT CONVERSION ============
    async convertImageFormat(file, format) {
        try {
            const inputFile = file;
            return new Promise((resolve)=>{
                const img = new Image();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                img.onload = ()=>{
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
                    canvas.toBlob((blob)=>{
                        if (blob) {
                            resolve({
                                success: true,
                                outputBlob: blob,
                                outputUrl: URL.createObjectURL(blob),
                                finalSize: blob.size
                            });
                        } else {
                            resolve({
                                success: false,
                                error: 'Failed to convert format'
                            });
                        }
                    }, mimeType, 0.95);
                };
                img.onerror = ()=>{
                    resolve({
                        success: false,
                        error: 'Failed to load image'
                    });
                };
                img.src = URL.createObjectURL(inputFile);
            });
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ IMAGE TO PDF ============
    async imageToPDF(file) {
        try {
            const inputFile = file;
            return new Promise((resolve)=>{
                const img = new Image();
                img.onload = ()=>{
                    const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
                        orientation: img.width > img.height ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [
                            img.width,
                            img.height
                        ]
                    });
                    pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
                    const pdfBlob = pdf.output('blob');
                    resolve({
                        success: true,
                        outputBlob: pdfBlob,
                        outputUrl: URL.createObjectURL(pdfBlob),
                        finalSize: pdfBlob.size
                    });
                };
                img.onerror = ()=>{
                    resolve({
                        success: false,
                        error: 'Failed to load image'
                    });
                };
                img.src = URL.createObjectURL(inputFile);
            });
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ VIDEO TO AUDIO (FFmpeg.wasm) ============
    ffmpeg = null;
    ffmpegLoaded = false;
    async loadFFmpeg() {
        if (this.ffmpegLoaded) return;
        try {
            const { FFmpeg } = await __turbopack_context__.A("[project]/node_modules/@ffmpeg/ffmpeg/dist/esm/empty.mjs [app-ssr] (ecmascript, async loader)");
            const { toBlobURL } = await __turbopack_context__.A("[project]/node_modules/@ffmpeg/util/dist/esm/index.js [app-ssr] (ecmascript, async loader)");
            this.ffmpeg = new FFmpeg();
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
            await this.ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
            });
            this.ffmpegLoaded = true;
        } catch (error) {
            console.error('FFmpeg failed to load:', error);
            throw new Error('FFmpeg initialization failed');
        }
    }
    async videoToAudio(options) {
        try {
            const file = options.file;
            if (file.size > 50 * 1024 * 1024) {
                return {
                    success: false,
                    error: 'Video too large for web version (50MB limit). Please use the desktop app for larger files.'
                };
            }
            await this.loadFFmpeg();
            const inputData = new Uint8Array(await file.arrayBuffer());
            await this.ffmpeg.writeFile('input.mp4', inputData);
            const outputFormat = options.format || 'mp3';
            const outputFile = `output.${outputFormat}`;
            await this.ffmpeg.exec([
                '-i',
                'input.mp4',
                '-vn',
                '-acodec',
                'libmp3lame',
                '-q:a',
                '2',
                outputFile
            ]);
            const data = await this.ffmpeg.readFile(outputFile);
            const blob = new Blob([
                data
            ], {
                type: `audio/${outputFormat}`
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: `Video conversion failed: ${error.message}. Try a smaller file or use the desktop app.`
            };
        }
    }
    async compressVideo(file, quality) {
        return {
            success: false,
            error: 'Video compression requires the Desktop App for optimal performance. Please download the desktop version.'
        };
    }
    // ============ MARKDOWN TO HTML ============
    async markdownToHtml(file) {
        try {
            const inputFile = file;
            const markdown = await inputFile.text();
            const converter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$showdown$2f$dist$2f$showdown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Converter({
                tables: true,
                strikethrough: true,
                tasklists: true,
                ghCodeBlocks: true
            });
            const html = converter.makeHtml(markdown);
            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Document</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px; 
      margin: 40px auto; 
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    code { 
      background: #f4f4f4; 
      padding: 2px 6px; 
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre { 
      background: #f4f4f4; 
      padding: 15px; 
      border-radius: 5px; 
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
    }
    blockquote {
      border-left: 4px solid #ddd;
      margin: 0;
      padding-left: 20px;
      color: #666;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;
            const blob = new Blob([
                fullHtml
            ], {
                type: 'text/html'
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ JSON TO CSV ============
    async jsonToCsv(file) {
        try {
            const inputFile = file;
            const jsonText = await inputFile.text();
            const jsonData = JSON.parse(jsonText);
            if (!Array.isArray(jsonData)) {
                return {
                    success: false,
                    error: 'JSON must be an array of objects'
                };
            }
            if (jsonData.length === 0) {
                return {
                    success: false,
                    error: 'JSON array is empty'
                };
            }
            const csv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].unparse(jsonData);
            const blob = new Blob([
                csv
            ], {
                type: 'text/csv'
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ CSV TO JSON ============
    async csvToJson(file) {
        try {
            const inputFile = file;
            const csvText = await inputFile.text();
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parse(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true
            });
            if (result.errors.length > 0) {
                return {
                    success: false,
                    error: `CSV parsing error: ${result.errors[0].message}`
                };
            }
            const json = JSON.stringify(result.data, null, 2);
            const blob = new Blob([
                json
            ], {
                type: 'application/json'
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ OCR TEXT EXTRACTION ============
    async extractText(options) {
        try {
            const file = options.file;
            const worker = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tesseract$2e$js$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createWorker"])('eng');
            const { data: { text } } = await worker.recognize(file);
            await worker.terminate();
            const blob = new Blob([
                text
            ], {
                type: 'text/plain'
            });
            return {
                success: true,
                text,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ ZIP FILES ============
    async zipFiles(files) {
        try {
            const zip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]();
            for (const file of files){
                zip.file(file.name, file);
            }
            const blob = await zip.generateAsync({
                type: 'blob'
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ TEXT TO PDF ============
    async textToPdf(file) {
        try {
            let text;
            if (file instanceof File) {
                text = await file.text();
            } else {
                text = file;
            }
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            // Set font and size
            pdf.setFontSize(12);
            // Split text into lines that fit the page width
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margins = 20;
            const maxLineWidth = pageWidth - margins * 2;
            const lines = pdf.splitTextToSize(text, maxLineWidth);
            // Add text with pagination
            const lineHeight = 7;
            const pageHeight = pdf.internal.pageSize.getHeight();
            const maxLinesPerPage = Math.floor((pageHeight - margins * 2) / lineHeight);
            let currentPage = 1;
            let currentLine = 0;
            for(let i = 0; i < lines.length; i++){
                if (currentLine >= maxLinesPerPage) {
                    pdf.addPage();
                    currentPage++;
                    currentLine = 0;
                }
                pdf.text(lines[i], margins, margins + currentLine * lineHeight);
                currentLine++;
            }
            const pdfBlob = pdf.output('blob');
            return {
                success: true,
                outputBlob: pdfBlob,
                outputUrl: URL.createObjectURL(pdfBlob),
                finalSize: pdfBlob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ JSON TO PDF ============
    async jsonToPdf(file) {
        try {
            const inputFile = file;
            const jsonText = await inputFile.text();
            const jsonData = JSON.parse(jsonText);
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            pdf.setFontSize(10);
            const pageWidth = pdf.internal.pageSize.getWidth();
            const margins = 15;
            const maxLineWidth = pageWidth - margins * 2;
            // Pretty print JSON
            const prettyJson = JSON.stringify(jsonData, null, 2);
            const lines = pdf.splitTextToSize(prettyJson, maxLineWidth);
            const lineHeight = 5;
            const pageHeight = pdf.internal.pageSize.getHeight();
            const maxLinesPerPage = Math.floor((pageHeight - margins * 2) / lineHeight);
            let currentLine = 0;
            for(let i = 0; i < lines.length; i++){
                if (currentLine >= maxLinesPerPage) {
                    pdf.addPage();
                    currentLine = 0;
                }
                pdf.text(lines[i], margins, margins + currentLine * lineHeight);
                currentLine++;
            }
            const pdfBlob = pdf.output('blob');
            return {
                success: true,
                outputBlob: pdfBlob,
                outputUrl: URL.createObjectURL(pdfBlob),
                finalSize: pdfBlob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ JSON TO XLSX ============
    async jsonToXlsx(file) {
        try {
            const XLSX = await __turbopack_context__.A("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript, async loader)");
            const inputFile = file;
            const jsonText = await inputFile.text();
            const jsonData = JSON.parse(jsonText);
            if (!Array.isArray(jsonData)) {
                return {
                    success: false,
                    error: 'JSON must be an array of objects for Excel conversion'
                };
            }
            if (jsonData.length === 0) {
                return {
                    success: false,
                    error: 'JSON array is empty'
                };
            }
            // Create worksheet from JSON
            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            // Generate Excel file
            const excelBuffer = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            const blob = new Blob([
                excelBuffer
            ], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ JSON TO HTML ============
    async jsonToHtml(file) {
        try {
            const inputFile = file;
            const jsonText = await inputFile.text();
            const jsonData = JSON.parse(jsonText);
            let htmlContent = '';
            if (Array.isArray(jsonData) && jsonData.length > 0) {
                // Create HTML table
                const keys = Object.keys(jsonData[0]);
                htmlContent = `
          <table>
            <thead>
              <tr>
                ${keys.map((key)=>`<th>${key}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${jsonData.map((row)=>`
                <tr>
                  ${keys.map((key)=>`<td>${JSON.stringify(row[key])}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
            } else {
                // Pretty print JSON
                htmlContent = `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`;
            }
            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSON Data</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 1200px;
      margin: 40px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px;
      text-align: left;
      border: 1px solid #ddd;
    }
    th {
      background: #4CAF50;
      color: white;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    tr:hover {
      background: #f5f5f5;
    }
    pre {
      background: white;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>JSON Data</h1>
  ${htmlContent}
</body>
</html>`;
            const blob = new Blob([
                fullHtml
            ], {
                type: 'text/html'
            });
            return {
                success: true,
                outputBlob: blob,
                outputUrl: URL.createObjectURL(blob),
                finalSize: blob.size
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    // ============ UNZIP (DISABLED FOR WEB) ============
    async unzipFile(file) {
        return {
            success: false,
            error: 'Unzip requires desktop app to extract to filesystem. Please download the desktop version.'
        };
    }
}
}),
"[project]/src/config/tools.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Central Tool Registry for Web Converter
__turbopack_context__.s([
    "CATEGORY_LABELS",
    ()=>CATEGORY_LABELS,
    "TOOLS",
    ()=>TOOLS,
    "getToolById",
    ()=>getToolById,
    "getToolsByCategory",
    ()=>getToolsByCategory,
    "getWebSupportedTools",
    ()=>getWebSupportedTools
]);
const TOOLS = [
    // ===== IMAGES =====
    {
        id: 'image-compressor',
        name: 'Image Compressor',
        description: 'Reduce file size',
        category: 'images',
        icon: 'Minimize2',
        webSupported: true,
        bgColor: 'bg-blue-500/30',
        textColor: 'text-blue-500'
    },
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Change dimensions',
        category: 'images',
        icon: 'Image',
        webSupported: true,
        bgColor: 'bg-blue-500/30',
        textColor: 'text-blue-500'
    },
    {
        id: 'image-converter',
        name: 'Image Converter',
        description: 'JPG ↔ PNG ↔ WEBP',
        category: 'images',
        icon: 'FileType',
        webSupported: true,
        bgColor: 'bg-blue-500/30',
        textColor: 'text-blue-500'
    },
    {
        id: 'image-to-pdf',
        name: 'Image to PDF',
        description: 'Convert images to PDF',
        category: 'images',
        icon: 'FileText',
        webSupported: true,
        bgColor: 'bg-purple-500/30',
        textColor: 'text-purple-500'
    },
    // ===== TEXT & OCR =====
    {
        id: 'markdown-to-html',
        name: 'Markdown to HTML',
        description: 'Convert .md files to HTML',
        category: 'text',
        icon: 'FileCode',
        webSupported: true,
        bgColor: 'bg-amber-500/30',
        textColor: 'text-amber-500'
    },
    {
        id: 'text-to-pdf',
        name: 'Text to PDF',
        description: 'Generate a PDF from text',
        category: 'text',
        icon: 'FileText',
        webSupported: true,
        bgColor: 'bg-purple-500/30',
        textColor: 'text-purple-500'
    },
    {
        id: 'ocr-text-extract',
        name: 'OCR Text Extract',
        description: 'Extract text from images',
        category: 'text',
        icon: 'Scan',
        webSupported: true,
        bgColor: 'bg-amber-500/30',
        textColor: 'text-amber-500'
    },
    // ===== DATA =====
    {
        id: 'json-to-csv',
        name: 'JSON to CSV',
        description: 'Convert JSON data to CSV',
        category: 'data',
        icon: 'FileJson',
        webSupported: true,
        bgColor: 'bg-purple-500/30',
        textColor: 'text-purple-500'
    },
    {
        id: 'csv-to-json',
        name: 'CSV to JSON',
        description: 'Convert CSV data to JSON',
        category: 'data',
        icon: 'FileJson',
        webSupported: true,
        bgColor: 'bg-purple-500/30',
        textColor: 'text-purple-500'
    },
    {
        id: 'json-to-pdf',
        name: 'JSON to PDF',
        description: 'Convert JSON to formatted PDF',
        category: 'data',
        icon: 'FileText',
        webSupported: true,
        bgColor: 'bg-purple-500/30',
        textColor: 'text-purple-500'
    },
    {
        id: 'json-to-xlsx',
        name: 'JSON to Excel',
        description: 'Convert JSON to XLSX spreadsheet',
        category: 'data',
        icon: 'Sheet',
        webSupported: true,
        bgColor: 'bg-green-500/30',
        textColor: 'text-green-500'
    },
    {
        id: 'json-to-html',
        name: 'JSON to HTML',
        description: 'Convert JSON to HTML table',
        category: 'data',
        icon: 'Table',
        webSupported: true,
        bgColor: 'bg-amber-500/30',
        textColor: 'text-amber-500'
    },
    // ===== ARCHIVES =====
    {
        id: 'create-zip',
        name: 'Create ZIP',
        description: 'Archive multiple files',
        category: 'archives',
        icon: 'Archive',
        webSupported: true,
        bgColor: 'bg-green-500/30',
        textColor: 'text-green-500'
    },
    // ===== MEDIA =====
    {
        id: 'video-to-audio',
        name: 'Video to Audio',
        description: 'Extract MP3 from video',
        category: 'media',
        icon: 'Music',
        webSupported: true,
        bgColor: 'bg-red-500/30',
        textColor: 'text-red-500'
    }
];
const getWebSupportedTools = ()=>TOOLS.filter((t)=>t.webSupported);
const getToolsByCategory = (category)=>TOOLS.filter((t)=>t.category === category && t.webSupported);
const getToolById = (id)=>TOOLS.find((t)=>t.id === id);
const CATEGORY_LABELS = {
    images: 'Image Tools',
    text: 'Text & Documents',
    data: 'Data Conversion',
    archives: 'Archives',
    media: 'Media Tools'
};
}),
"[project]/app/converter/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConverterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudUpload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-ssr] (ecmascript) <export default as CloudUpload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>");
// Import the web converter service and tool registry
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$WebConverterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/WebConverterService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$tools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/tools.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/lucide-react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function ConverterPage() {
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeTool, setActiveTool] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showToolSelector, setShowToolSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isToastMinimized, setIsToastMinimized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [conversionOptions, setConversionOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        format: 'webp',
        quality: 0.8,
        width: 800,
        height: 600,
        targetSizeKB: 500
    });
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const converterService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$WebConverterService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebConverterService"]()).current;
    const detectFileType = (file)=>{
        const ext = file.name.split('.').pop()?.toLowerCase();
        // Images - show tool selector (handled in handleFileSelect)
        const imageExts = [
            'jpg',
            'jpeg',
            'png',
            'webp'
        ];
        if (imageExts.includes(ext || '')) return null; // Tool selector will handle
        // Documents - auto-route
        if (ext === 'txt') return 'text-to-pdf';
        if (ext === 'md') return 'markdown-to-html';
        if (ext === 'csv') return 'csv-to-json';
        // JSON - show tool selector (handled in handleFileSelect)
        if (ext === 'json') return null; // Tool selector will handle
        // Media - auto-route
        const videoExts = [
            'mp4',
            'webm'
        ];
        if (videoExts.includes(ext || '')) return 'video-to-audio';
        // Everything else - no auto-detection
        return null;
    };
    const handleFileSelect = (selectedFiles)=>{
        if (selectedFiles && selectedFiles.length > 0) {
            const fileArray = Array.from(selectedFiles);
            setFiles(fileArray);
            setResult(null);
            const ext = fileArray[0].name.split('.').pop()?.toLowerCase();
            // Smart Detection for supported file types only
            const imageExts = [
                'jpg',
                'jpeg',
                'png',
                'webp'
            ];
            const autoRouteExts = [
                'txt',
                'md',
                'csv',
                'mp4',
                'webm'
            ];
            const unsupportedExts = [
                'pdf',
                'mp3',
                'wav',
                'aac',
                'docx',
                'xlsx',
                'pptx'
            ];
            if (imageExts.includes(ext || '')) {
                // Images: Show tool selector
                setShowToolSelector(true);
            } else if (ext === 'json') {
                // JSON: Show tool selector
                setShowToolSelector(true);
            } else if (autoRouteExts.includes(ext || '')) {
                // Supported documents/media: Auto-route
                const detectedTool = detectFileType(fileArray[0]);
                if (detectedTool) {
                    setActiveTool(detectedTool);
                }
            } else if (unsupportedExts.includes(ext || '')) {
                // Unsupported files: Auto-route to Create ZIP with helpful notice
                setActiveTool('create-zip');
            } else {
                // Unknown files: Also route to Create ZIP
                setActiveTool('create-zip');
            }
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };
    const handleDropZoneClick = ()=>{
        fileInputRef.current?.click();
    };
    const handleToolClick = (toolId)=>{
        // Just open the tool, don't trigger file picker
        setActiveTool(toolId);
        setResult(null);
        setFiles([]); // Clear any previous files
    };
    const handleBackToDashboard = ()=>{
        setActiveTool(null);
        setFiles([]);
        setResult(null);
    };
    const handleConversion = async ()=>{
        if (files.length === 0 || !activeTool) return;
        setIsProcessing(true);
        setResult(null);
        try {
            const file = files[0];
            let conversionResult;
            switch(activeTool){
                case 'image-compressor':
                    conversionResult = await converterService.compressImage({
                        file,
                        targetSizeKB: conversionOptions.targetSizeKB,
                        quality: conversionOptions.quality
                    });
                    break;
                case 'image-resizer':
                    conversionResult = await converterService.resizeImage({
                        file,
                        width: conversionOptions.width,
                        height: conversionOptions.height,
                        keepAspectRatio: true
                    });
                    break;
                case 'image-converter':
                    conversionResult = await converterService.convertImageFormat(file, conversionOptions.format);
                    break;
                case 'image-to-pdf':
                    conversionResult = await converterService.imageToPDF(file);
                    break;
                case 'video-to-audio':
                    conversionResult = await converterService.videoToAudio({
                        file,
                        format: 'mp3'
                    });
                    break;
                case 'markdown-to-html':
                    conversionResult = await converterService.markdownToHtml(file);
                    break;
                case 'text-to-pdf':
                    conversionResult = await converterService.textToPdf(file);
                    break;
                case 'json-to-csv':
                    conversionResult = await converterService.jsonToCsv(file);
                    break;
                case 'csv-to-json':
                    conversionResult = await converterService.csvToJson(file);
                    break;
                case 'json-to-pdf':
                    conversionResult = await converterService.jsonToPdf(file);
                    break;
                case 'json-to-xlsx':
                    conversionResult = await converterService.jsonToXlsx(file);
                    break;
                case 'json-to-html':
                    conversionResult = await converterService.jsonToHtml(file);
                    break;
                case 'ocr-text-extract':
                    conversionResult = await converterService.extractText({
                        file
                    });
                    break;
                case 'create-zip':
                    conversionResult = await converterService.zipFiles(files);
                    break;
                default:
                    conversionResult = {
                        success: false,
                        error: 'Tool not implemented yet'
                    };
            }
            setResult(conversionResult);
        } catch (error) {
            setResult({
                success: false,
                error: error.message
            });
        } finally{
            setIsProcessing(false);
        }
    };
    const previewResult = ()=>{
        if (result?.outputUrl) {
            window.open(result.outputUrl, '_blank');
        }
    };
    const canPreview = ()=>{
        if (!result?.success) return false;
        const previewableTools = [
            'image-compressor',
            'image-resizer',
            'image-converter',
            'image-to-pdf',
            'text-to-pdf',
            'markdown-to-html',
            'json-to-pdf',
            'json-to-html'
        ];
        return previewableTools.includes(activeTool || '');
    };
    const downloadResult = ()=>{
        if (result?.outputUrl && files.length > 0) {
            const a = document.createElement('a');
            a.href = result.outputUrl;
            // Generate appropriate filename based on tool
            const originalName = files[0].name.replace(/\.[^.]+$/, '');
            let extension = '';
            switch(activeTool){
                case 'image-compressor':
                case 'image-resizer':
                    extension = files[0].name.split('.').pop() || 'jpg';
                    break;
                case 'image-converter':
                    extension = conversionOptions.format;
                    break;
                case 'image-to-pdf':
                case 'text-to-pdf':
                case 'json-to-pdf':
                    extension = 'pdf';
                    break;
                case 'video-to-audio':
                    extension = 'mp3';
                    break;
                case 'markdown-to-html':
                case 'json-to-html':
                    extension = 'html';
                    break;
                case 'json-to-csv':
                    extension = 'csv';
                    break;
                case 'csv-to-json':
                    extension = 'json';
                    break;
                case 'json-to-xlsx':
                    extension = 'xlsx';
                    break;
                case 'ocr-text-extract':
                    extension = 'txt';
                    break;
                case 'create-zip':
                    extension = 'zip';
                    break;
                default:
                    extension = 'file';
            }
            a.download = `${originalName}_converted.${extension}`;
            a.click();
        }
    };
    // Get icon component from string name
    const getIconComponent = (iconName)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$lucide$2d$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[iconName] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"];
    };
    // Get web-supported tools from registry
    const webTools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$tools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWebSupportedTools"])();
    const proTools = [
        {
            title: 'PDF to DOCX',
            desc: 'Full fidelity conversion'
        },
        {
            title: 'DOCX to PDF',
            desc: 'Professional documents'
        },
        {
            title: 'PDF to PPTX',
            desc: 'Presentation conversion'
        },
        {
            title: 'Video Compression',
            desc: 'H.264/H.265 encoding'
        },
        {
            title: 'Batch Processing',
            desc: '100+ files at once'
        },
        {
            title: 'Advanced OCR',
            desc: 'Multi-language support'
        }
    ];
    const currentTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$tools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOOLS"].find((t)=>t.id === activeTool);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#050505] text-white font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-6 py-4 flex items-center justify-between",
                    children: [
                        activeTool ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleBackToDashboard,
                            className: "flex items-center gap-2 text-white/70 hover:text-white transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Back to Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 308,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2 text-white/70 hover:text-white transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 312,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Back to Home"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this),
                        currentTool && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-8 h-8 ${currentTool.bgColor} ${currentTool.textColor} rounded-lg flex items-center justify-center`,
                                    children: (()=>{
                                        const IconComponent = getIconComponent(currentTool.icon);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 26
                                        }, this);
                                    })()
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: currentTool.name
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/converter/page.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/converter/page.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: !activeTool ? /* Dashboard View */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "container mx-auto px-6 py-12 max-w-6xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: fileInputRef,
                                    type: "file",
                                    multiple: true,
                                    onChange: (e)=>handleFileSelect(e.target.files),
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: handleDropZoneClick,
                                    onDragOver: handleDragOver,
                                    onDragLeave: handleDragLeave,
                                    onDrop: handleDrop,
                                    className: `
                  relative cursor-pointer
                  bg-white/5 border border-white/10 rounded-3xl
                  p-24 text-center
                  transition-all duration-300
                  ${isDragging ? 'bg-white/10 border-white/20' : 'hover:bg-white/[0.07]'}
                `,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudUpload$3e$__["CloudUpload"], {
                                            className: `w-20 h-20 mx-auto mb-6 ${isDragging ? 'text-cyan-400' : 'text-blue-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 364,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-3xl font-bold mb-3 text-white",
                                            children: "Drop files to convert"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 366,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-zinc-500 text-lg",
                                            children: "or click to browse from your computer"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 369,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-zinc-600 text-sm mt-2",
                                            children: "Smart Mode: Files are auto-detected and routed to the right tool"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 372,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12",
                            children: webTools.map((tool, idx)=>{
                                const IconComponent = getIconComponent(tool.icon);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleToolClick(tool.id),
                                    className: "group relative p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/5 border-t-white/10 rounded-xl hover:scale-[1.02] hover:border-white/20 hover:border-t-white/20 transition-all duration-200 text-left shadow-inner",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-10 h-10 ${tool.bgColor} ${tool.textColor} rounded-lg flex items-center justify-center mb-4 shadow-lg`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 389,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-semibold mb-1",
                                            children: tool.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-zinc-500 text-sm",
                                            children: tool.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-16 p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-3xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-4 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                className: "w-6 h-6 text-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 403,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold text-white mb-2",
                                                    children: "Pro Conversions (Desktop Only)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-zinc-400",
                                                    children: "Need advanced conversions like PDF ↔ DOCX, video compression, or batch processing? Download the desktop app for full power."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 401,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6",
                                    children: proTools.map((tool, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-black/30 border border-white/10 rounded-xl",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-semibold text-white mb-1",
                                                    children: tool.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-zinc-500",
                                                    children: tool.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 416,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://github.com/martin-sack/File-Converter/releases/latest",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, this),
                                        "Download Desktop App (Free)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 423,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 400,
                            columnNumber: 13
                        }, this)
                    ]
                }, "dashboard", true, {
                    fileName: "[project]/app/converter/page.tsx",
                    lineNumber: 334,
                    columnNumber: 11
                }, this) : /* Tool View */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    exit: {
                        opacity: 0,
                        x: -20
                    },
                    className: "container mx-auto px-6 py-12 max-w-4xl relative z-50 pointer-events-auto",
                    children: [
                        files.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: fileInputRef,
                                    type: "file",
                                    multiple: true,
                                    onChange: (e)=>handleFileSelect(e.target.files),
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: handleDropZoneClick,
                                    onDragOver: handleDragOver,
                                    onDragLeave: handleDragLeave,
                                    onDrop: handleDrop,
                                    className: `
                    relative cursor-pointer
                    bg-white/5 border-2 border-dashed border-white/10 rounded-2xl
                    p-16 text-center
                    transition-all duration-300
                    ${isDragging ? 'bg-white/10 border-white/20' : 'hover:bg-white/[0.07]'}
                  `,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudUpload$3e$__["CloudUpload"], {
                                            className: `w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-cyan-400' : 'text-blue-500'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold mb-2 text-white",
                                            children: "Drop file here or click to browse"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 468,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-zinc-500",
                                            children: [
                                                "Select a file to use with ",
                                                currentTool?.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 471,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 445,
                            columnNumber: 15
                        }, this) : /* File Display */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 p-6 bg-white/5 border border-white/10 rounded-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold",
                                            children: "Selected Files"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 480,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setFiles([]);
                                                setResult(null);
                                            },
                                            className: "relative z-50 text-zinc-400 hover:text-white transition-colors cursor-pointer pointer-events-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 488,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 481,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 479,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: files.map((file, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between p-3 bg-black/30 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/80 truncate",
                                                    children: file.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-zinc-500 text-sm ml-4",
                                                    children: [
                                                        (file.size / 1024).toFixed(1),
                                                        " KB"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 493,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 491,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 478,
                            columnNumber: 15
                        }, this),
                        files.length > 0 && !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8 p-6 bg-white/5 border border-white/10 rounded-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-4",
                                    children: "Configuration"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 505,
                                    columnNumber: 17
                                }, this),
                                activeTool === 'image-compressor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-zinc-400 mb-2",
                                                    children: "Target Size (KB)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 510,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: conversionOptions.targetSizeKB,
                                                    onChange: (e)=>setConversionOptions({
                                                            ...conversionOptions,
                                                            targetSizeKB: parseInt(e.target.value)
                                                        }),
                                                    className: "w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 509,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-zinc-400 mb-2",
                                                    children: [
                                                        "Quality: ",
                                                        conversionOptions.quality
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 519,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "range",
                                                    min: "0.1",
                                                    max: "1",
                                                    step: "0.1",
                                                    value: conversionOptions.quality,
                                                    onChange: (e)=>setConversionOptions({
                                                            ...conversionOptions,
                                                            quality: parseFloat(e.target.value)
                                                        }),
                                                    className: "w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 508,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'image-resizer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-zinc-400 mb-2",
                                                    children: "Width (px)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: conversionOptions.width,
                                                    onChange: (e)=>setConversionOptions({
                                                            ...conversionOptions,
                                                            width: parseInt(e.target.value)
                                                        }),
                                                    className: "w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 535,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm text-zinc-400 mb-2",
                                                    children: "Height (px)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: conversionOptions.height,
                                                    onChange: (e)=>setConversionOptions({
                                                            ...conversionOptions,
                                                            height: parseInt(e.target.value)
                                                        }),
                                                    className: "w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 544,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'image-converter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-zinc-400 mb-2",
                                            children: "Output Format"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: conversionOptions.format,
                                            onChange: (e)=>setConversionOptions({
                                                    ...conversionOptions,
                                                    format: e.target.value
                                                }),
                                            className: "w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "webp",
                                                    children: "WEBP"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "png",
                                                    children: "PNG"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "jpg",
                                                    children: "JPG"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 559,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 557,
                                    columnNumber: 19
                                }, this),
                                (activeTool === 'json-to-csv' || activeTool === 'csv-to-json') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: activeTool === 'json-to-csv' ? 'JSON array will be converted to CSV format with headers' : 'CSV file will be converted to JSON array format'
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 573,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 572,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'json-to-pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "JSON data will be formatted and converted to a PDF document with syntax highlighting"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 583,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'json-to-xlsx' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "JSON array will be converted to an Excel spreadsheet (.xlsx) with proper columns"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 592,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 591,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'json-to-html' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "JSON data will be converted to a styled HTML table (arrays) or formatted view (objects)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 600,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 599,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'markdown-to-html' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "Markdown file will be converted to a styled HTML document"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 608,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 607,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'video-to-audio' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-zinc-400 mb-2",
                                            children: "Output Format"
                                        }, void 0, false, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 616,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: conversionOptions.format,
                                            onChange: (e)=>setConversionOptions({
                                                    ...conversionOptions,
                                                    format: e.target.value
                                                }),
                                            className: "w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:border-white/30 focus:outline-none cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "mp3",
                                                    children: "MP3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "wav",
                                                    children: "WAV"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "aac",
                                                    children: "AAC"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 617,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 615,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'text-to-pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "Text file will be converted to a formatted PDF document with proper pagination"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 631,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 630,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'image-to-pdf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "Image will be embedded in a PDF document with automatic orientation detection"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 639,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 638,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'create-zip' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-zinc-400 mb-3",
                                            children: [
                                                files.length,
                                                " file",
                                                files.length > 1 ? 's' : '',
                                                " will be archived into a ZIP file"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/converter/page.tsx",
                                            lineNumber: 647,
                                            columnNumber: 21
                                        }, this),
                                        files.length > 0 && (()=>{
                                            const ext = files[0].name.split('.').pop()?.toLowerCase();
                                            const unsupportedExts = [
                                                'pdf',
                                                'mp3',
                                                'wav',
                                                'aac',
                                                'docx',
                                                'xlsx',
                                                'pptx'
                                            ];
                                            if (unsupportedExts.includes(ext || '')) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/converter/page.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/converter/page.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-amber-400 font-semibold mb-1",
                                                                        children: "Limited Web Support"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/converter/page.tsx",
                                                                        lineNumber: 661,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-amber-300/90 mb-3",
                                                                        children: [
                                                                            ext?.toUpperCase(),
                                                                            " files can only be archived in ZIP format in the web version. For advanced conversions like PDF editing or audio processing, download the desktop app."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/converter/page.tsx",
                                                                        lineNumber: 664,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: "https://github.com",
                                                                        className: "inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                className: "w-3.5 h-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/converter/page.tsx",
                                                                                lineNumber: 672,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            "Get Desktop App"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/converter/page.tsx",
                                                                        lineNumber: 668,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/converter/page.tsx",
                                                                lineNumber: 660,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 655,
                                                    columnNumber: 27
                                                }, this);
                                            }
                                            return null;
                                        })()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 646,
                                    columnNumber: 19
                                }, this),
                                activeTool === 'ocr-text-extract' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-zinc-400",
                                        children: "Text will be extracted from the image using OCR technology (may take 5-10 seconds)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 687,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 686,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 504,
                            columnNumber: 15
                        }, this),
                        files.length > 0 && !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleConversion,
                            disabled: isProcessing || files.length === 0,
                            className: "w-full py-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed font-semibold rounded-xl transition-all mb-8 cursor-pointer z-50 pointer-events-auto",
                            children: isProcessing ? 'Processing...' : 'Convert Now'
                        }, void 0, false, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 697,
                            columnNumber: 15
                        }, this),
                        result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: `p-6 rounded-xl border ${result.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`,
                            children: result.success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-green-400 mb-4",
                                        children: "✓ Conversion Successful!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/80",
                                                        children: [
                                                            "File Size: ",
                                                            (result.finalSize / 1024).toFixed(1),
                                                            " KB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 718,
                                                        columnNumber: 25
                                                    }, this),
                                                    result.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white/60 text-sm mt-2",
                                                        children: "Extracted text available"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 717,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    canPreview() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: previewResult,
                                                        className: "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/converter/page.tsx",
                                                                        lineNumber: 728,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/converter/page.tsx",
                                                                        lineNumber: 729,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/converter/page.tsx",
                                                                lineNumber: 727,
                                                                columnNumber: 29
                                                            }, this),
                                                            "Preview"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 723,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: downloadResult,
                                                        className: "px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                className: "w-5 h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/converter/page.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 27
                                                            }, this),
                                                            "Download"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 734,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 721,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 716,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/converter/page.tsx",
                                lineNumber: 714,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-red-400 mb-2",
                                        children: "✗ Conversion Failed"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 746,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/70",
                                        children: result.error
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 747,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/converter/page.tsx",
                                lineNumber: 745,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/converter/page.tsx",
                            lineNumber: 708,
                            columnNumber: 15
                        }, this)
                    ]
                }, "tool", true, {
                    fileName: "[project]/app/converter/page.tsx",
                    lineNumber: 436,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/converter/page.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showToolSelector && files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 pointer-events-auto",
                    onClick: ()=>setShowToolSelector(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0.9,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        exit: {
                            scale: 0.9,
                            opacity: 0
                        },
                        onClick: (e)=>e.stopPropagation(),
                        className: "bg-[#111] border border-white/20 rounded-2xl p-8 max-w-md w-full relative z-50 pointer-events-auto",
                        children: (()=>{
                            const ext = files[0].name.split('.').pop()?.toLowerCase();
                            const imageExts = [
                                'jpg',
                                'jpeg',
                                'png',
                                'webp',
                                'gif',
                                'bmp'
                            ];
                            const isImage = imageExts.includes(ext || '');
                            const isJSON = ext === 'json';
                            let toolsToShow = [];
                            let title = 'What would you like to do?';
                            let subtitle = 'Choose a tool';
                            if (isImage) {
                                toolsToShow = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$tools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOOLS"].filter((t)=>t.category === 'images' && t.webSupported);
                                subtitle = 'Choose a tool for your image';
                            } else if (isJSON) {
                                toolsToShow = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$tools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOOLS"].filter((t)=>(t.id.startsWith('json-') || t.id === 'create-zip') && t.webSupported);
                                subtitle = 'Choose a conversion format for your JSON';
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold mb-2 text-white",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 795,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-zinc-400 mb-6",
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 796,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: toolsToShow.map((tool)=>{
                                            const IconComponent = getIconComponent(tool.icon);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setActiveTool(tool.id);
                                                    setShowToolSelector(false);
                                                },
                                                className: "w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all text-left flex items-center gap-4 cursor-pointer z-50 pointer-events-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-10 h-10 ${tool.bgColor} ${tool.textColor} rounded-lg flex items-center justify-center`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/converter/page.tsx",
                                                            lineNumber: 811,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-white",
                                                                children: tool.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/converter/page.tsx",
                                                                lineNumber: 814,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-zinc-500",
                                                                children: tool.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/converter/page.tsx",
                                                                lineNumber: 815,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, tool.id, true, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 802,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 798,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true);
                        })()
                    }, void 0, false, {
                        fileName: "[project]/app/converter/page.tsx",
                        lineNumber: 766,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/converter/page.tsx",
                    lineNumber: 759,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/converter/page.tsx",
                lineNumber: 757,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 bg-[#1a1500] border border-yellow-900/50 rounded-xl shadow-2xl transition-all duration-300 ${isToastMinimized ? 'w-16' : 'w-80'}`,
                children: isToastMinimized ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setIsToastMinimized(false),
                    className: "p-4 w-full flex items-center justify-center cursor-pointer hover:bg-yellow-500/10 rounded-xl transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                        className: "w-6 h-6 text-yellow-500"
                    }, void 0, false, {
                        fileName: "[project]/app/converter/page.tsx",
                        lineNumber: 836,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/converter/page.tsx",
                    lineNumber: 832,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                    className: "w-5 h-5 text-yellow-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/converter/page.tsx",
                                    lineNumber: 842,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/converter/page.tsx",
                                lineNumber: 841,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-white font-semibold",
                                                children: "Web Version Limits"
                                            }, void 0, false, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsToastMinimized(true),
                                                className: "text-zinc-500 hover:text-white transition-colors cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M19 9l-7 7-7-7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/converter/page.tsx",
                                                        lineNumber: 852,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/converter/page.tsx",
                                                    lineNumber: 851,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/converter/page.tsx",
                                                lineNumber: 847,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 845,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-zinc-400 text-sm mb-3",
                                        children: "200MB max file size. Desktop app has no limits."
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 856,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://github.com",
                                        className: "inline-block px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-colors",
                                        children: "Get Desktop App"
                                    }, void 0, false, {
                                        fileName: "[project]/app/converter/page.tsx",
                                        lineNumber: 859,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/converter/page.tsx",
                                lineNumber: 844,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/converter/page.tsx",
                        lineNumber: 840,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/converter/page.tsx",
                    lineNumber: 839,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/converter/page.tsx",
                lineNumber: 830,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/converter/page.tsx",
        lineNumber: 298,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8ff6e8f9._.js.map