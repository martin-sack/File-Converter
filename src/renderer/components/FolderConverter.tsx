import React, { useState } from 'react';

interface FolderConverterProps {
  onBack: () => void;
}

const FolderConverter: React.FC<FolderConverterProps> = ({ onBack }) => {
  const [folderPath, setFolderPath] = useState<string>('');
  const [operation, setOperation] = useState<'compress-images' | 'extract-audio' | 'zip-all'>('compress-images');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFolder = async () => {
    const folder = await window.electronAPI.selectFolder();
    if (folder) setFolderPath(folder);
  };

  const handleProcess = async () => {
    if (!folderPath) return;

    setProcessing(true);
    setProgress(0);

    const result = await window.electronAPI.processFolderBatch({
      folderPath,
      operation
    });

    setProcessing(false);
    if (result.success) {
      showNotification('success', `Processed ${result.count} files successfully!`);
    } else {
      showNotification('error', result.error || 'Processing failed');
    }
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Folder Batch Converter</h2>
      <p className="subtitle">Process all files in a folder at once</p>
      
      <div className="form-group">
        <label>Select Folder</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={handleSelectFolder}>
            {folderPath || 'Click to select folder'}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Operation</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value as any)}>
          <option value="compress-images">Compress all images to 2MB</option>
          <option value="extract-audio">Extract audio from all videos</option>
          <option value="zip-all">ZIP entire folder</option>
        </select>
      </div>

      {processing && (
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <button 
        onClick={handleProcess} 
        className="btn-primary" 
        disabled={!folderPath || processing}
      >
        {processing ? 'Processing...' : 'Process Folder'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default FolderConverter;
