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

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white/90">Free Forever • No Limits • 100% Private</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          The Last File Converter
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            You'll Ever Need
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
          Convert Images, Videos, and Documents instantly.
          <br />
          Private, Secure, and Blazing Fast.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/app"
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
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">25+</div>
            <div className="text-white/60 text-sm">Conversion Types</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-white/60 text-sm">Private & Local</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-white/60 text-sm">File Size Limit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
