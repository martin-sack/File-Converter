import React, { useState } from 'react';
import path from 'path-browserify';

interface VideoCompressorProps {
  onBack: () => void;
}

const VideoCompressor: React.FC<VideoCompressorProps> = ({ onBack }) => {
  const [inputFile, setInputFile] = useState<string>('');
  const [preset, setPreset] = useState<'1080p' | '720p' | '480p'>('720p');
  const [codec, setCodec] = useState<'h264' | 'h265'>('h264');
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFile = async () => {
    const file = await window.electronAPI.selectFile();
    if (file) setInputFile(file);
  };

  const handleCompress = async () => {
    if (!inputFile) return;

    setCompressing(true);
    setProgress(0);
    
    const ext = path.extname(inputFile);
    const outputPath = inputFile.replace(ext, `_${preset}${ext}`);

    const result = await window.electronAPI.videoCompress({
      inputPath: inputFile,
      outputPath,
      preset,
      codec
    });

    setCompressing(false);
    if (result.success) {
      showNotification('success', 'Video compressed successfully!');
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
      <h2>Video Compressor</h2>
      
      <div className="form-group">
        <label>Input Video</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFile}>
            {inputFile ? path.basename(inputFile) : 'Click to select video'}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Quality Preset</label>
        <select value={preset} onChange={(e) => setPreset(e.target.value as any)}>
          <option value="1080p">1080p (High Quality)</option>
          <option value="720p">720p (Balanced)</option>
          <option value="480p">480p (Small Size)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Codec</label>
        <select value={codec} onChange={(e) => setCodec(e.target.value as any)}>
          <option value="h264">H.264 (Compatible)</option>
          <option value="h265">H.265 (Better Compression)</option>
        </select>
      </div>

      {compressing && (
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <button 
        onClick={handleCompress} 
        className="btn-primary" 
        disabled={!inputFile || compressing}
      >
        {compressing ? 'Compressing...' : 'Compress Video'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default VideoCompressor;
