import React, { useState } from 'react';
import { FileInfo } from '../../utils/fileDetector';

interface BatchItem extends FileInfo {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  outputPath?: string;
}

interface BatchQueueProps {
  files: FileInfo[];
  onBack: () => void;
}

const BatchQueue: React.FC<BatchQueueProps> = ({ files, onBack }) => {
  const [items, setItems] = useState<BatchItem[]>(
    files.map((f, i) => ({
      ...f,
      id: `${Date.now()}-${i}`,
      status: 'pending',
      progress: 0
    }))
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'sequential' | 'parallel'>('sequential');

  const updateItem = (id: string, updates: Partial<BatchItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const processItem = async (item: BatchItem) => {
    updateItem(item.id, { status: 'processing', progress: 0 });

    try {
      const outputPath = item.path.replace(/\.[^.]+$/, '_converted$&');
      
      // Route to appropriate converter based on type
      let result;
      if (item.type === 'image') {
        result = await window.electronAPI.imageCompress({
          inputPath: item.path,
          outputPath,
          targetSizeKB: 2048
        });
      } else if (item.type === 'video') {
        result = await window.electronAPI.videoToMp3(item.path, outputPath.replace(/\.[^.]+$/, '.mp3'));
      } else {
        result = { success: false, error: 'Unsupported file type' };
      }

      if (result.success) {
        updateItem(item.id, { 
          status: 'completed', 
          progress: 100,
          outputPath 
        });
      } else {
        updateItem(item.id, { 
          status: 'error', 
          error: result.error || 'Conversion failed' 
        });
      }
    } catch (error: any) {
      updateItem(item.id, { 
        status: 'error', 
        error: error.message 
      });
    }
  };

  const startProcessing = async () => {
    setIsProcessing(true);

    if (mode === 'sequential') {
      for (const item of items) {
        if (item.status === 'pending') {
          await processItem(item);
        }
      }
    } else {
      // Parallel processing
      await Promise.all(
        items
          .filter(item => item.status === 'pending')
          .map(item => processItem(item))
      );
    }

    setIsProcessing(false);
  };

  const cancelProcessing = () => {
    setIsProcessing(false);
    setItems(prev => prev.map(item => 
      item.status === 'processing' ? { ...item, status: 'pending', progress: 0 } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getStatusIcon = (status: BatchItem['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '⚙️';
      case 'completed': return '✅';
      case 'error': return '❌';
    }
  };

  return (
    <div className="batch-queue">
      <div className="batch-header">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Batch Queue ({items.length} files)</h2>
        
        <div className="batch-controls">
          <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
            <option value="sequential">Sequential</option>
            <option value="parallel">Parallel</option>
          </select>
          
          {!isProcessing ? (
            <button onClick={startProcessing} className="btn-primary">
              Start Processing
            </button>
          ) : (
            <button onClick={cancelProcessing} className="btn-danger">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="batch-items">
        {items.map(item => (
          <div key={item.id} className={`batch-item ${item.status}`}>
            <div className="batch-item-icon">{getStatusIcon(item.status)}</div>
            
            <div className="batch-item-info">
              <div className="batch-item-name">{item.name}</div>
              <div className="batch-item-type">{item.type} • {item.suggestedOutput}</div>
              
              {item.status === 'processing' && (
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${item.progress}%` }} />
                </div>
              )}
              
              {item.status === 'error' && (
                <div className="batch-item-error">{item.error}</div>
              )}
            </div>

            <div className="batch-item-actions">
              {item.status === 'completed' && (
                <button 
                  onClick={() => window.electronAPI.openFolder(item.outputPath!)}
                  className="btn-secondary"
                >
                  Open
                </button>
              )}
              {item.status === 'pending' && (
                <button onClick={() => removeItem(item.id)} className="btn-remove">
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchQueue;
