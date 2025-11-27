'use client';

import { useState, useEffect } from 'react';
import { X, Download, Apple, Monitor } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'linux' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('mac')) setDetectedOS('mac');
      else if (userAgent.includes('win')) setDetectedOS('windows');
      else if (userAgent.includes('linux')) setDetectedOS('linux');
    }
  }, []);

  if (!isOpen) return null;

  const downloads = [
    {
      os: 'windows',
      name: 'Windows',
      icon: <Monitor className="w-6 h-6" />,
      url: 'https://github.com/martin-sack/File-Converter/releases/latest',
      recommended: detectedOS === 'windows',
    },
    {
      os: 'mac',
      name: 'macOS',
      icon: <Apple className="w-6 h-6" />,
      url: 'https://github.com/martin-sack/File-Converter/releases/latest',
      recommended: detectedOS === 'mac',
    },
    {
      os: 'linux',
      name: 'Linux',
      icon: <Monitor className="w-6 h-6" />,
      url: 'https://github.com/martin-sack/File-Converter/releases/latest',
      recommended: detectedOS === 'linux',
    },
  ];

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
    setTimeout(() => onClose(), 500);
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
          <p className="text-sm text-zinc-400">Select your platform to view available downloads</p>
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
                    {download.os === 'windows' && 'View Windows downloads'}
                    {download.os === 'mac' && 'View macOS downloads'}
                    {download.os === 'linux' && 'View Linux downloads'}
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
              href="https://github.com/martin-sack/File-Converter/releases"
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
