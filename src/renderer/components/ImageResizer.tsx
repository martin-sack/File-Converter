import React, { useState } from 'react';
import path from 'path-browserify';

interface ImageResizerProps {
  onBack: () => void;
}

const ImageResizer: React.FC<ImageResizerProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [noEnlarge, setNoEnlarge] = useState(true);
  const [resizing, setResizing] = useState(false);
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

  const handleResize = async () => {
    if (!inputFile) return;

    setResizing(true);
    const ext = path.extname(inputFile);
    const outputPath = inputFile.replace(ext, `_resized${ext}`);

    const result = await window.electronAPI.imageResize({
      inputPath: inputFile,
      outputPath,
      width,
      height,
      keepAspectRatio,
      noEnlarge
    });

    setResizing(false);
    if (result.success) {
      showNotification('success', 'Image resized successfully!');
    } else {
      showNotification('error', result.error || 'Resize failed');
    }
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Image Resizer</h2>
      
      <div className="form-group">
        <label>Input Image</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFile}>
            {inputFile ? path.basename(inputFile) : 'Click to select image'}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Width (px)</label>
        <input 
          type="number" 
          value={width} 
          onChange={(e) => setWidth(Number(e.target.value))}
          min="1"
        />
      </div>

      <div className="form-group">
        <label>Height (px)</label>
        <input 
          type="number" 
          value={height} 
          onChange={(e) => setHeight(Number(e.target.value))}
          min="1"
        />
      </div>

      <div className="checkbox-group">
        <input 
          type="checkbox" 
          checked={keepAspectRatio} 
          onChange={(e) => setKeepAspectRatio(e.target.checked)}
          id="aspect-ratio"
        />
        <label htmlFor="aspect-ratio">Keep aspect ratio</label>
      </div>

      <div className="checkbox-group">
        <input 
          type="checkbox" 
          checked={noEnlarge} 
          onChange={(e) => setNoEnlarge(e.target.checked)}
          id="no-enlarge"
        />
        <label htmlFor="no-enlarge">Don't enlarge image</label>
      </div>

      <button 
        onClick={handleResize} 
        className="btn-primary" 
        disabled={!inputFile || resizing}
      >
        {resizing ? 'Resizing...' : 'Resize Image'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
