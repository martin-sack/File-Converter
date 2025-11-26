import React, { useState } from 'react';
import path from 'path-browserify';

interface ImageConverterProps {
  onBack: () => void;
}

const ImageConverter: React.FC<ImageConverterProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState<string>('png');
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
    const ext = path.extname(inputFile);
    const outputPath = inputFile.replace(ext, `.${outputFormat}`);

    const result = await window.electronAPI.imageConvert(inputFile, outputPath, outputFormat);

    setConverting(false);
    if (result.success) {
      showNotification('success', 'Image converted successfully!');
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
      <h2>Image Format Converter</h2>
      
      <div className="form-group">
        <label>Input Image</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFile}>
            {inputFile ? path.basename(inputFile) : 'Click to select image'}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Output Format</label>
        <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
          <option value="jpg">JPG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
        </select>
      </div>

      <button 
        onClick={handleConvert} 
        className="btn-primary" 
        disabled={!inputFile || converting}
      >
        {converting ? 'Converting...' : 'Convert Image'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
