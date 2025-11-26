import React, { useState } from 'react';
import path from 'path-browserify';

interface ArchiveToolsProps {
  onBack: () => void;
}

const ArchiveTools: React.FC<ArchiveToolsProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'zip' | 'unzip'>('zip');
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleSelectFiles = async () => {
    const files = await window.electronAPI.selectFiles();
    if (files && files.length > 0) setInputFiles(files);
  };

  const handleSelectFile = async () => {
    const file = await window.electronAPI.selectFile();
    if (file) setInputFiles([file]);
  };

  const handleZip = async () => {
    if (inputFiles.length === 0) return;

    setProcessing(true);
    const outputPath = await window.electronAPI.saveFile('archive.zip');
    
    if (outputPath) {
      const result = await window.electronAPI.zipFiles(inputFiles, outputPath);
      
      if (result.success) {
        showNotification('success', 'Files zipped successfully!');
      } else {
        showNotification('error', result.error || 'Zip failed');
      }
    }
    
    setProcessing(false);
  };

  const handleUnzip = async () => {
    if (inputFiles.length === 0) return;

    setProcessing(true);
    const outputDir = await window.electronAPI.selectFolder();
    
    if (outputDir) {
      const result = await window.electronAPI.unzipFiles(inputFiles[0], outputDir);
      
      if (result.success) {
        showNotification('success', 'Files unzipped successfully!');
      } else {
        showNotification('error', result.error || 'Unzip failed');
      }
    }
    
    setProcessing(false);
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="converter-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>Archive Tools</h2>
      
      <div className="form-group">
        <label>Mode</label>
        <select value={mode} onChange={(e) => { setMode(e.target.value as 'zip' | 'unzip'); setInputFiles([]); }}>
          <option value="zip">ZIP Files</option>
          <option value="unzip">Unzip Archive</option>
        </select>
      </div>

      <div className="form-group">
        <label>{mode === 'zip' ? 'Select Files to ZIP' : 'Select ZIP File'}</label>
        <div className="file-input-wrapper">
          <div className="file-input-btn" onClick={mode === 'zip' ? handleSelectFiles : handleSelectFile}>
            {inputFiles.length > 0 
              ? `${inputFiles.length} file(s) selected` 
              : 'Click to select files'}
          </div>
        </div>
      </div>

      <button 
        onClick={mode === 'zip' ? handleZip : handleUnzip} 
        className="btn-primary" 
        disabled={inputFiles.length === 0 || processing}
      >
        {processing ? 'Processing...' : mode === 'zip' ? 'Create ZIP' : 'Extract ZIP'}
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ArchiveTools;
