'use client';

import { useState, useEffect } from 'react';
import { X, Download, Apple, Monitor } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedOS('mac');
      else if (userAgent.includes('win')) setDetectedOS('windows');
      else if (userAgent.includes('linux')) setDetectedOS('linux');
      else setDetectedOS('windows'); // Default to Windows if can't detect
    }
  }, []);

  if (!isOpen) return null;

  // Direct download URLs from VertFile repository
  const downloads = [
    {
      os: 'windows',
      name: 'Windows',
      icon: <Monitor className="w-6 h-6" />,
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.0/File-Converter-Pro-win.exe',
      recommended: detectedOS === 'windows',
    },
    {
      os: 'mac',
      name: 'macOS',
      icon: <Apple className="w-6 h-6" />,
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.0/File-Converter-Pro-mac.dmg',
      recommended: detectedOS === 'mac',
    },
    {
      os: 'linux',
      name: 'Linux',
      icon: <Monitor className="w-6 h-6" />,
      url: 'https://github.com/martin-sack/VertFile/releases/download/v1.0.0/File-Converter-Pro-linux.AppImage',
      recommended: detectedOS === 'linux',
    },
  ];

  const handleDownload = (url: string) => {
    // Trigger direct download
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close modal after triggering download
    setTimeout(() => onClose(), 500);
  };

  const handleRecommendedDownload = () => {
    const recommended = downloads.find(d => d.recommended);
    if (recommended) {
      handleDownload(recommended.url);
    }
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
          <h2 className="text-2xl font-bold text-white mb-2">Download for Desktop</h2>
          <p className="text-sm text-zinc-400">Choose your operating system to download</p>
        </div>

        {/* Recommended Download Button */}
        <button
          onClick={handleRecommendedDownload}
          className="w-full mb-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Recommended ({downloads.find(d => d.recommended)?.name})
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
        <div className="space-y-3">
          {downloads.map((download) => (
            <button
              key={download.os}
              onClick={() => handleDownload(download.url)}
              className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  {download.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{download.name}</span>
                    {download.recommended && (
                      <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">
                    {download.os === 'windows' && '.exe installer'}
                    {download.os === 'mac' && '.dmg installer'}
                    {download.os === 'linux' && '.AppImage'}
                  </span>
                </div>
              </div>
              <Download className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
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
