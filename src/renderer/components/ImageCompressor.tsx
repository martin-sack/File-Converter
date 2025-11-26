import React, { useState } from 'react';
import path from 'path-browserify';

interface ImageCompressorProps {
  onBack: () => void;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [targetSize, setTargetSize] = useState<number>(2048);
  const [compressing, setCompressing] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFile = async () => {
    try {
      if (!window.electronAPI) {
        console.error('electronAPI not available');
        showNotification('error', 'File selection not available. Run: npm run build:main');
        return;
      }
      const file = await window.electronAPI.selectFile();
      if (file) setInputFile(file);
    } catch (error) {
      console.error('Error selecting file:', error);
      showNotification('error', 'Failed to open file picker');
    }
  };

  const handleCompress = async () => {
    if (!inputFile) return;

    setCompressing(true);
    const ext = path.extname(inputFile);
    const outputPath = inputFile.replace(ext, `_compressed${ext}`);

    const result = await window.electronAPI.imageCompress({
      inputPath: inputFile,
      outputPath,
      targetSizeKB: targetSize
    });

    setCompressing(false);
    if (result.success) {
      const finalSizeKB = result.finalSize ? (result.finalSize / 1024).toFixed(2) : 'unknown';
      showNotification('success', `Image compressed! Final size: ${finalSizeKB}KB`);
    } else {
      showNotification('error', result.error || 'Compression failed');
    }
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Image Compressor</h2>
      
      <div className="form-group">
        <label>Input Image</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFile}>
            {inputFile ? path.basename(inputFile) : 'Click to select image'}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Target Size (KB)</label>
        <input 
          type="number" 
          value={targetSize} 
          onChange={(e) => setTargetSize(Number(e.target.value))}
          min="10"
          step="10"
        />
      </div>

      <button 
        onClick={handleCompress} 
        className="btn-primary" 
        disabled={!inputFile || compressing}
      >
        {compressing ? 'Compressing...' : 'Compress Image'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
