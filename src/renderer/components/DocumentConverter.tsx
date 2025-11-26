import React, { useState } from 'react';
import path from 'path-browserify';

interface DocumentConverterProps {
  onBack: () => void;
}

const DocumentConverter: React.FC<DocumentConverterProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [conversionType, setConversionType] = useState<string>('md-to-html');
  const [converting, setConverting] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFile = async () => {
    try {
      if (!window.electronAPI) {
        console.error('electronAPI not available');
        showNotification('error', 'File selection not available');
        return;
      }
      const file = await window.electronAPI.selectFile();
      if (file) setInputFile(file);
    } catch (error) {
      console.error('Error selecting file:', error);
      showNotification('error', 'Failed to open file picker');
    }
  };

  const handleConvert = async () => {
    if (!inputFile) return;

    setConverting(true);
    let result;
    const baseName = path.basename(inputFile, path.extname(inputFile));
    const dirName = path.dirname(inputFile);

    switch (conversionType) {
      case 'md-to-html':
        result = await window.electronAPI.markdownToHtml(
          inputFile, 
          path.join(dirName, `${baseName}.html`)
        );
        break;
      case 'html-to-pdf':
        result = await window.electronAPI.htmlToPDF(
          inputFile, 
          path.join(dirName, `${baseName}.pdf`)
        );
        break;
      case 'json-to-csv':
        result = await window.electronAPI.jsonToCsv(
          inputFile, 
          path.join(dirName, `${baseName}.csv`)
        );
        break;
      case 'csv-to-json':
        result = await window.electronAPI.csvToJson(
          inputFile, 
          path.join(dirName, `${baseName}.json`)
        );
        break;
      default:
        result = { success: false, error: 'Unsupported conversion type' };
    }

    setConverting(false);
    if (result.success) {
      showNotification('success', 'Document converted successfully!');
    } else {
      showNotification('error', result.error || 'Conversion failed');
    }
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Document Converter</h2>
      
      <div className="form-group">
        <label>Conversion Type</label>
        <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
          <option value="md-to-html">Markdown → HTML</option>
          <option value="html-to-pdf">HTML → PDF</option>
          <option value="json-to-csv">JSON → CSV</option>
          <option value="csv-to-json">CSV → JSON</option>
        </select>
      </div>

      <div className="form-group">
        <label>Input File</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFile}>
            {inputFile ? path.basename(inputFile) : 'Click to select file'}
          </div>
        </div>
      </div>

      <button 
        onClick={handleConvert} 
        className="btn-primary" 
        disabled={!inputFile || converting}
      >
        {converting ? 'Converting...' : 'Convert Document'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default DocumentConverter;
