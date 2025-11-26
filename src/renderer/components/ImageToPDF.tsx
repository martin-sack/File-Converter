import React, { useState } from 'react';

interface ImageToPDFProps {
  onBack: () => void;
}

const ImageToPDF: React.FC<ImageToPDFProps> = ({ onBack }) => {
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [converting, setConverting] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFiles = async () => {
    try {
      if (!window.electronAPI) {
        console.error('electronAPI not available');
        showNotification('error', 'File selection not available');
        return;
      }
      const files = await window.electronAPI.selectFiles();
      if (files && files.length > 0) {
        setInputFiles(files);
      }
    } catch (error) {
      console.error('Error selecting files:', error);
      showNotification('error', 'Failed to open file picker');
    }
  };

  const handleConvert = async () => {
    if (inputFiles.length === 0) return;

    setConverting(true);
    
    // Convert each image to PDF
    for (const inputFile of inputFiles) {
      const outputPath = inputFile.replace(/\.[^.]+$/, '.pdf');
      const result = await window.electronAPI.imageToPDF(inputFile, outputPath);
      
      if (!result.success) {
        showNotification('error', `Failed to convert ${inputFile}: ${result.error}`);
        setConverting(false);
        return;
      }
    }

    setConverting(false);
    showNotification('success', `Successfully converted ${inputFiles.length} image(s) to PDF!`);
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFile = (index: number) => {
    setInputFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Image to PDF Converter</h2>
      <p className="subtitle">Convert images to PDF documents</p>
      
      <div className="form-group">
        <label>Select Images</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFiles}>
            {inputFiles.length > 0 
              ? `${inputFiles.length} image(s) selected` 
              : 'Click to select images'}
          </div>
        </div>
      </div>

      {inputFiles.length > 0 && (
        <div className="file-list">
          {inputFiles.map((file, index) => (
            <div key={index} className="file-list-item">
              <span>{file.split('/').pop()}</span>
              <button 
                onClick={() => removeFile(index)} 
                className="btn-remove-small"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={handleConvert} 
        className="btn-primary" 
        disabled={inputFiles.length === 0 || converting}
      >
        {converting ? 'Converting...' : 'Convert to PDF'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ImageToPDF;
