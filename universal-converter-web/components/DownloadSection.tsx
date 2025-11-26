'use client';

import { useState, useEffect } from 'react';
import { Download, Apple, Monitor, Package } from 'lucide-react';

interface Release {
  tag_name: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
}

export default function DownloadSection() {
  const [release, setRelease] = useState<Release | null>(null);
  const [os, setOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setOS('mac');
    else if (userAgent.includes('linux')) setOS('linux');
    else setOS('windows');

    // Mock release data for now (replace with actual GitHub API later)
    setRelease({
      tag_name: 'v1.0.0',
      assets: [
        { name: 'universal-converter-1.0.0.exe', browser_download_url: '#', size: 85000000 },
        { name: 'universal-converter-1.0.0.dmg', browser_download_url: '#', size: 90000000 },
        { name: 'universal-converter-1.0.0.AppImage', browser_download_url: '#', size: 88000000 },
      ]
    });
  }, []);

  const getDownloadUrl = () => {
    if (!release) return '#';
    
    const asset = release.assets.find(a => {
      if (os === 'windows') return a.name.endsWith('.exe');
      if (os === 'mac') return a.name.endsWith('.dmg');
      if (os === 'linux') return a.name.endsWith('.AppImage');
      return false;
    });

    return asset?.browser_download_url || '#';
  };

  const getFileSize = () => {
    if (!release) return '';
    
    const asset = release.assets.find(a => {
      if (os === 'windows') return a.name.endsWith('.exe');
      if (os === 'mac') return a.name.endsWith('.dmg');
      if (os === 'linux') return a.name.endsWith('.AppImage');
      return false;
    });

    if (!asset) return '';
    return `${(asset.size / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <section id="download" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Download for Desktop
          </h2>
          <p className="text-xl text-white/70">
            Get unlimited power with the native desktop app
          </p>
        </div>

        {/* Main Download Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Universal File Converter {release?.tag_name}
              </h3>
              <p className="text-white/70 mb-4">
                Free • Open Source • No Limits
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  ✨ Unlimited file size
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  ⚡ Native speed
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  🔒 100% private
                </span>
              </div>
            </div>

            <a
              href={getDownloadUrl()}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              Download for {os === 'mac' ? 'macOS' : os === 'windows' ? 'Windows' : 'Linux'}
              {getFileSize() && <span className="text-sm opacity-80">({getFileSize()})</span>}
            </a>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Windows */}
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
            <Monitor className="w-10 h-10 text-blue-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Windows</h4>
            <p className="text-white/60 text-sm mb-4">Windows 10 or later</p>
            <button
              onClick={() => setOS('windows')}
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Download .exe
            </button>
          </div>

          {/* macOS */}
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
            <Apple className="w-10 h-10 text-white mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">macOS</h4>
            <p className="text-white/60 text-sm mb-4">macOS 10.13 or later</p>
            <button
              onClick={() => setOS('mac')}
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Download .dmg
            </button>
          </div>

          {/* Linux */}
          <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
            <Package className="w-10 h-10 text-orange-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Linux</h4>
            <p className="text-white/60 text-sm mb-4">Ubuntu 18.04 or later</p>
            <button
              onClick={() => setOS('linux')}
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Download .AppImage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
