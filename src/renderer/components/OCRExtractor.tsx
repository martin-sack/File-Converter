import React, { useState } from 'react';
import path from 'path-browserify';

interface OCRExtractorProps {
  onBack: () => void;
}

const OCRExtractor: React.FC<OCRExtractorProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState<string>('');
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFile = async () => {
    const file = await window.electronAPI.selectFile();
    if (file) setInputFile(file);
  };

  const handleExtract = async () => {
    if (!inputFile) return;

    setExtracting(true);
    setProgress(0);
    setExtractedText('');
    
    const outputPath = inputFile.replace(/\.[^.]+$/, '_extracted.txt');

    const result = await window.electronAPI.ocrExtract(inputFile, outputPath);

    setExtracting(false);
    if (result.success) {
      setExtractedText(result.text || '');
      showNotification('success', 'Text extracted successfully!');
    } else {
      showNotification('error', result.error || 'Extraction failed');
    }
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>OCR Text Extractor</h2>
      <p className="subtitle">Extract text from images and PDFs</p>
      
      <div className="form-group">
        <label>Input File</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFile}>
            {inputFile ? path.basename(inputFile) : 'Click to select image or PDF'}
          </div>
        </div>
      </div>

      {extracting && (
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <button 
        onClick={handleExtract} 
        className="btn-primary" 
        disabled={!inputFile || extracting}
      >
        {extracting ? 'Extracting...' : 'Extract Text'}
      </button>

      {extractedText && (
        <div className="extracted-text">
          <h3>Extracted Text:</h3>
          <textarea 
            value={extractedText} 
            readOnly 
            rows={15}
            className="text-output"
          />
        </div>
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default OCRExtractor;
