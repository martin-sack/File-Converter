'use client';

import Link from 'next/link';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - App Preview */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              {/* App Icon/Logo Display */}
              <div className="relative group">
                {/* Main image container */}
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-3xl p-12 shadow-2xl">
                  <div className="relative w-full animate-float">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/app-logo.webp" 
                      alt="Universal File Converter App"
                      className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
                
                {/* Animated glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 -z-10 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-pink-500/20 rounded-3xl blur-2xl -z-10"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/90">Free Forever • No Limits • 100% Private</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Any File.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Instantly.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-8">
              The privacy-first converter for Images, Video, and Audio.
              <br />
              No uploads, no limits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link
                href="/converter"
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
              >
                Launch Web App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#download"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download for Desktop
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-white/60 text-sm">Conversion Types</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/60 text-sm">Private & Local</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-white/60 text-sm">File Size Limit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
