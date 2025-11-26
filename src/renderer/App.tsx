import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ImageConverter from './components/ImageConverter';
import ImageCompressor from './components/ImageCompressor';
import ImageResizer from './components/ImageResizer';
import ImageToPDF from './components/ImageToPDF';
import DocumentConverter from './components/DocumentConverter';
import MediaConverter from './components/MediaConverter';
import ArchiveTools from './components/ArchiveTools';
import Settings from './components/Settings';
import DropZone from './components/DropZone';
import BatchQueue from './components/BatchQueue';
import SmartAutoMode from './components/SmartAutoMode';
import VideoCompressor from './components/VideoCompressor';
import OCRExtractor from './components/OCRExtractor';
import { FileInfo } from '../utils/fileDetector';

type View = 'dashboard' | 'image-convert' | 'image-compress' | 'image-resize' | 
            'image-to-pdf' | 'document' | 'media' | 'archive' | 'settings' | 'batch' | 
            'smart-auto' | 'video-compress' | 'ocr';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [batchFiles, setBatchFiles] = useState<FileInfo[]>([]);
  const [smartFile, setSmartFile] = useState<FileInfo | null>(null);

  const handleFilesDetected = (files: FileInfo[]) => {
    if (files.length === 1) {
      setSmartFile(files[0]);
      setCurrentView('smart-auto');
    } else if (files.length > 1) {
      setBatchFiles(files);
      setCurrentView('batch');
    }
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <DropZone onFilesDetected={handleFilesDetected} />
            <Dashboard onNavigate={handleNavigate} />
          </>
        );
      case 'image-to-pdf':
        return <ImageToPDF onBack={() => setCurrentView('dashboard')} />;
      case 'image-convert':
        return <ImageConverter onBack={() => setCurrentView('dashboard')} />;
      case 'image-compress':
        return <ImageCompressor onBack={() => setCurrentView('dashboard')} />;
      case 'image-resize':
        return <ImageResizer onBack={() => setCurrentView('dashboard')} />;
      case 'document':
        return <DocumentConverter onBack={() => setCurrentView('dashboard')} />;
      case 'media':
        return <MediaConverter onBack={() => setCurrentView('dashboard')} />;
      case 'archive':
        return <ArchiveTools onBack={() => setCurrentView('dashboard')} />;
      case 'video-compress':
        return <VideoCompressor onBack={() => setCurrentView('dashboard')} />;
      case 'ocr':
        return <OCRExtractor onBack={() => setCurrentView('dashboard')} />;
      case 'batch':
        return <BatchQueue files={batchFiles} onBack={() => setCurrentView('dashboard')} />;
      case 'smart-auto':
        return smartFile ? (
          <SmartAutoMode file={smartFile} onBack={() => setCurrentView('dashboard')} />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        );
      case 'settings':
        return <Settings onBack={() => setCurrentView('dashboard')} theme={theme} setTheme={setTheme} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>Universal File Converter</h1>
        <button onClick={() => setCurrentView('settings')} className="settings-btn">
          ⚙️ Settings
        </button>
      </header>
      <main className="app-main">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
