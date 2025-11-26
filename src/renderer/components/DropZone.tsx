import React, { useState, useCallback } from 'react';
import { detectMultipleFiles, FileInfo } from '../../utils/fileDetector';

interface DropZoneProps {
  onFilesDetected: (files: FileInfo[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesDetected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const filePaths = files.map(f => f.path);
    
    // Detect file types
    const detectedFiles = detectMultipleFiles(filePaths);
    onFilesDetected(detectedFiles);
  }, [onFilesDetected]);

  const handleClick = async () => {
    const files = await window.electronAPI.selectFiles();
    if (files && files.length > 0) {
      const detectedFiles = detectMultipleFiles(files);
      onFilesDetected(detectedFiles);
    }
  };

  return (
    <div
      className={`drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="drop-zone-content">
        <div className="drop-zone-icon">📁</div>
        <h3>Drop files here or click to browse</h3>
        <p>Supports images, videos, documents, and archives</p>
        <p className="drop-zone-hint">Auto-detects file type and suggests best conversion</p>
      </div>
    </div>
  );
};

export default DropZone;
