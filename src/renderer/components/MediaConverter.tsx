import React, { useState } from 'react';
import path from 'path-browserify';

interface MediaConverterProps {
  onBack: () => void;
}

const MediaConverter: React.FC<MediaConverterProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [conversionType, setConversionType] = useState<string>('video-to-mp3');
  const [converting, setConverting] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFile = async () => {
    const file = await window.electronAPI.selectFile();
    if (file) setInputFile(file);
  };

  const handleConvert = async () => {
    if (!inputFile) return;

    setConverting(true);
    let result;
    const baseName = path.basename(inputFile, path.extname(inputFile));
    const dirName = path.dirname(inputFile);

    switch (conversionType) {
      case 'video-to-mp3':
        result = await window.electronAPI.videoToMp3(
          inputFile, 
          path.join(dirName, `${baseName}.mp3`)
        );
        break;
      case 'video-to-aac':
        result = await window.electronAPI.videoToAAC(
          inputFile, 
          path.join(dirName, `${baseName}.aac`)
        );
        break;
      default:
        result = { success: false, error: 'Unsupported conversion type' };
    }

    setConverting(false);
    if (result.success) {
      showNotification('success', 'Media converted successfully!');
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
      <h2>Media Converter</h2>
      
      <div className="form-group">
        <label>Conversion Type</label>
        <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
          <option value="video-to-mp3">Video → MP3</option>
          <option value="video-to-aac">Video → AAC</option>
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
        {converting ? 'Converting...' : 'Convert Media'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default MediaConverter;
