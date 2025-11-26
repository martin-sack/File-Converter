import React, { useState } from 'react';
import { FileInfo } from '../../utils/fileDetector';

interface SmartAutoModeProps {
  file: FileInfo;
  onBack: () => void;
}

const SmartAutoMode: React.FC<SmartAutoModeProps> = ({ file, onBack }) => {
  const [processing, setProcessing] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const getSmartSuggestions = () => {
    switch (file.type) {
      case 'image':
        return [
          { id: 'compress', label: 'Compress to 2MB', icon: '📦' },
          { id: 'resize', label: 'Resize to 1920x1080', icon: '📐' },
          { id: 'convert-webp', label: 'Convert to WebP', icon: '🖼️' },
          { id: 'pdf', label: 'Convert to PDF', icon: '📄' }
        ];
      case 'video':
        return [
          { id: 'extract-audio', label: 'Extract Audio (MP3)', icon: '🎵' },
          { id: 'compress-720p', label: 'Compress to 720p', icon: '📹' },
          { id: 'compress-480p', label: 'Compress to 480p', icon: '📱' },
          { id: 'gif', label: 'Convert to GIF', icon: '🎬' }
        ];
      case 'document':
        if (file.extension === '.md') {
          return [
            { id: 'html', label: 'Convert to HTML', icon: '🌐' },
            { id: 'pdf', label: 'Convert to PDF', icon: '📄' }
          ];
        } else if (file.extension === '.json') {
          return [
            { id: 'csv', label: 'Convert to CSV', icon: '📊' }
          ];
        }
        return [];
      case 'archive':
        return [
          { id: 'extract', label: 'Extract Files', icon: '📂' }
        ];
      default:
        return [];
    }
  };

  const handleAction = async (actionId: string) => {
    setProcessing(true);
    setSelectedAction(actionId);

    let result;
    const outputPath = file.path.replace(/\.[^.]+$/, '_converted$&');

    try {
      switch (actionId) {
        case 'compress':
          result = await window.electronAPI.imageCompress({
            inputPath: file.path,
            outputPath,
            targetSizeKB: 2048
          });
          break;
        case 'extract-audio':
          result = await window.electronAPI.videoToMp3(
            file.path, 
            file.path.replace(/\.[^.]+$/, '.mp3')
          );
          break;
        case 'html':
          result = await window.electronAPI.markdownToHtml(
            file.path,
            file.path.replace('.md', '.html')
          );
          break;
        case 'csv':
          result = await window.electronAPI.jsonToCsv(
            file.path,
            file.path.replace('.json', '.csv')
          );
          break;
        default:
          result = { success: false, error: 'Action not implemented' };
      }

      if (result.success) {
        showNotification('success', 'Conversion completed!');
      } else {
        showNotification('error', result.error || 'Conversion failed');
      }
    } catch (error: any) {
      showNotification('error', error.message);
    }

    setProcessing(false);
  };

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const suggestions = getSmartSuggestions();

  return (
    <div className="smart-auto-mode">
      <button onClick={onBack} className="back-btn">← Back</button>
      
      <div className="smart-header">
        <h2>🤖 Smart Auto Mode</h2>
        <p>AI-powered suggestions for your file</p>
      </div>

      <div className="file-preview">
        <div className="file-icon">{file.type === 'image' ? '🖼️' : file.type === 'video' ? '🎬' : '📄'}</div>
        <div className="file-details">
          <h3>{file.name}</h3>
          <p>Type: {file.type}</p>
        </div>
      </div>

      <div className="smart-suggestions">
        <h3>Recommended Actions</h3>
        <div className="suggestion-grid">
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className={`suggestion-card ${selectedAction === suggestion.id ? 'active' : ''}`}
              onClick={() => !processing && handleAction(suggestion.id)}
            >
              <div className="suggestion-icon">{suggestion.icon}</div>
              <div className="suggestion-label">{suggestion.label}</div>
            </div>
          ))}
        </div>
      </div>

      {processing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <p>Processing...</p>
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

export default SmartAutoMode;
