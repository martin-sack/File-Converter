'use client';

import { useState, useEffect } from 'react';
import { X, Download, Apple, Monitor, Cpu } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OSType = 'windows' | 'mac' | 'linux' | 'unknown';
type ArchType = 'x64' | 'arm64' | 'ia32' | 'unknown';

interface DownloadOption {
  name: string;
  url: string;
  description: string;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [detectedOS, setDetectedOS] = useState<OSType>('unknown');
  const [detectedArch, setDetectedArch] = useState<ArchType>('unknown');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const platform = navigator.platform.toLowerCase();
      const ua = navigator.userAgent.toLowerCase();
      
      // Detect macOS and architecture
      if (platform.includes('mac')) {
        setDetectedOS('mac');
        // Check for Apple Silicon (M1/M2/M3)
        // Apple Silicon detection: check for ARM indicators or default to ARM for modern Macs
        const isAppleSilicon = 
          ua.includes('arm') || 
          ua.includes('aarch64') ||
          // MacIntel is reported even on Apple Silicon in some browsers
          // So we check for modern Safari features that indicate Apple Silicon
          (platform === 'macintel' && navigator.maxTouchPoints > 1);
        
        if (isAppleSilicon) {
          setDetectedArch('arm64');
        } else {
          // Default to arm64 for modern Macs (most new Macs are Apple Silicon)
          setDetectedArch('arm64');
        }
      } 
      // Detect Windows
      else if (platform.includes('win')) {
        setDetectedOS('windows');
        // Detect Windows architecture
        if (ua.includes('wow64') || ua.includes('win32') || (ua.includes('windows') && !ua.includes('win64'))) {
          setDetectedArch('ia32');
        } else {
          setDetectedArch('x64');
        }
      } 
      // Detect Linux
      else if (platform.includes('linux')) {
        setDetectedOS('linux');
        // Detect Linux architecture
        if (ua.includes('arm') || ua.includes('aarch64')) {
          setDetectedArch('arm64');
        } else {
          setDetectedArch('x64');
        }
      } 
      // Default fallback
      else {
        setDetectedOS('windows');
        setDetectedArch('x64');
      }
    }
  }, []);

  if (!isOpen) return null;

  // Download options by OS - v1.0.3 release
  const macOptions: DownloadOption[] = [
    {
      name: 'Apple Silicon (M1/M2/M3)',
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.3/File.Converter.Pro-1.0.3-mac-arm64.dmg',
      description: 'For M1, M2, M3 Macs'
    },
    {
      name: 'Intel Mac',
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.3/File.Converter.Pro-1.0.3-mac-x64.dmg',
      description: 'For Intel-based Macs'
    }
  ];

  const windowsOptions: DownloadOption[] = [
    {
      name: 'Windows 64-bit Installer',
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.3/File.Converter.Pro-1.0.3-win-x64.exe',
      description: 'Recommended for most users'
    },
    {
      name: 'Windows 32-bit Installer',
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.3/File.Converter.Pro-1.0.3-win-ia32.exe',
      description: 'For older 32-bit systems'
    }
  ];

  const linuxOptions: DownloadOption[] = [
    {
      name: 'AppImage (x64)',
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.3/File.Converter.Pro-1.0.3-linux-x86_64.AppImage',
      description: 'Universal Linux package'
    }
  ];

  const handleDownload = (url: string) => {
    // Open download URL in new tab - GitHub will handle the download
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Close modal after triggering download
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getRecommendedDownload = (): string => {
    if (detectedOS === 'mac') {
      return detectedArch === 'arm64' ? macOptions[0].url : macOptions[1].url;
    } else if (detectedOS === 'windows') {
      return detectedArch === 'ia32' ? windowsOptions[1].url : windowsOptions[0].url;
    } else if (detectedOS === 'linux') {
      return linuxOptions[0].url; // Always x64 AppImage for Linux
    }
    return windowsOptions[0].url; // Default
  };

  const getRecommendedName = (): string => {
    if (detectedOS === 'mac') {
      return detectedArch === 'arm64' ? 'macOS Apple Silicon' : 'macOS Intel';
    } else if (detectedOS === 'windows') {
      return detectedArch === 'ia32' ? 'Windows 32-bit' : 'Windows 64-bit';
    } else if (detectedOS === 'linux') {
      return detectedArch === 'arm64' ? 'Linux ARM64' : 'Linux x64';
    }
    return 'Windows 64-bit';
  };

  const getCurrentOptions = (): DownloadOption[] => {
    if (detectedOS === 'mac') return macOptions;
    if (detectedOS === 'windows') return windowsOptions;
    if (detectedOS === 'linux') return linuxOptions;
    return [...windowsOptions, ...macOptions, ...linuxOptions]; // Show all if unknown
  };

  const getOSIcon = () => {
    if (detectedOS === 'mac') return <Apple className="w-6 h-6" />;
    if (detectedOS === 'linux') return <Monitor className="w-6 h-6" />;
    return <Monitor className="w-6 h-6" />;
  };

  const getOSName = () => {
    if (detectedOS === 'mac') return 'macOS';
    if (detectedOS === 'windows') return 'Windows';
    if (detectedOS === 'linux') return 'Linux';
    return 'All Platforms';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center">
              {getOSIcon()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Download for {getOSName()}</h2>
              <p className="text-xs text-zinc-500">Detected: {detectedArch === 'arm64' ? 'ARM64' : detectedArch === 'ia32' ? '32-bit' : '64-bit'}</p>
            </div>
          </div>
        </div>

        {/* Recommended Download Button */}
        <button
          onClick={() => handleDownload(getRecommendedDownload())}
          className="w-full mb-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Recommended ({getRecommendedName()})
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0A0A0A] px-2 text-zinc-500">or choose manually</span>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {getCurrentOptions().map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleDownload(option.url)}
              className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg transition-all group"
            >
              <div className="text-left flex-1">
                <div className="font-semibold text-white text-sm">{option.name}</div>
                <div className="text-xs text-zinc-500">{option.description}</div>
              </div>
              <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors ml-2 flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-xs text-zinc-500 text-center">
            All downloads are from{' '}
            <a
              href="https://github.com/martin-sack/VertFile/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              GitHub Releases
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
