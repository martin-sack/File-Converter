'use client';

import { Check, X, Zap, Globe } from 'lucide-react';

const features = [
  { name: 'File Size Limit', web: '200MB', desktop: 'Unlimited' },
  { name: 'Processing Speed', web: 'Good', desktop: 'Native (GPU)' },
  { name: 'Installation', web: 'None', desktop: 'Required' },
  { name: 'Batch Processing', web: 'Limited (10 files)', desktop: 'Unlimited' },
  { name: 'Folder Support', web: false, desktop: true },
  { name: 'Privacy', web: 'Private', desktop: '100% Private' },
  { name: 'Offline Mode', web: false, desktop: true },
  { name: 'Hardware Acceleration', web: false, desktop: true },
];

export default function Comparison() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Web vs Desktop
          </h2>
          <p className="text-xl text-white/70">
            Choose the version that fits your needs
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white/5 border-b border-white/10">
            <div className="text-white/60 font-semibold">Feature</div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-lg">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">Web Version</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold">Desktop App</span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
            >
              <div className="text-white font-medium">{feature.name}</div>
              <div className="text-center">
                {typeof feature.web === 'boolean' ? (
                  feature.web ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )
                ) : (
                  <span className="text-white/70">{feature.web}</span>
                )}
              </div>
              <div className="text-center">
                {typeof feature.desktop === 'boolean' ? (
                  feature.desktop ? (
                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  )
                ) : (
                  <span className="text-white font-semibold">{feature.desktop}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl border border-purple-500/30">
          <p className="text-white text-center">
            <span className="font-semibold">💡 Recommendation:</span> Try the Web Version first, then download the Desktop App for unlimited power!
          </p>
        </div>
      </div>
    </section>
  );
}
