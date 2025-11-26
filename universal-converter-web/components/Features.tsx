'use client';

import { Image, Video, FileText, Search, Archive, Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Image,
    title: 'Image Tools',
    description: 'Compress, resize, and convert between JPG, PNG, WEBP. Smart compression to target file size.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Video,
    title: 'Video Converter',
    description: 'Extract audio, compress videos to 1080p/720p/480p. H.264 and H.265 codec support.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'Document Tools',
    description: 'Markdown to HTML, JSON ↔ CSV conversions. Perfect for developers and writers.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Search,
    title: 'OCR Text Extraction',
    description: 'Extract text from images and PDFs. Powered by Tesseract.js for accurate results.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Archive,
    title: 'Archive Tools',
    description: 'ZIP multiple files or unzip archives. Preserve folder structure automatically.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Sparkles,
    title: 'Smart Auto Mode',
    description: 'AI-powered suggestions. Drop any file and get intelligent conversion recommendations.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Zap,
    title: 'Batch Processing',
    description: 'Convert multiple files at once. Sequential or parallel mode with progress tracking.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'All conversions happen locally. Your files never leave your device. No cloud upload.',
    color: 'from-teal-500 to-green-500'
  }
];

export default function Features() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Professional-grade file conversion tools, all in one beautiful app
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
