'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Sparkles, Layers, Zap, Shield, FileType, Infinity } from 'lucide-react';

export default function LandingPage() {
  const formats = ['JPG', 'PNG', 'MP4', 'MOV', 'PDF', 'DOCX', 'WEBP', 'GIF', 'MP3', 'WAV', 'ZIP', 'RAR', 'CSV', 'JSON', 'HTML', 'MD'];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 transition-opacity group-hover:opacity-80">
              <Image
                src="/file-converter-icon.webp"
                alt="File Converter"
                width={36}
                height={36}
                className="rounded-lg"
              />
            </div>
            <span className="text-lg font-semibold text-white">File Converter</span>
          </Link>
          <Link
            href="/converter"
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-all"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Subtle Aurora Glow - Only Behind Hero */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Large App Icon */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[3rem] blur-3xl scale-110" />
                
                {/* Icon Card */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                  <Image
                    src="/file-converter-icon.webp"
                    alt="File Converter"
                    width={320}
                    height={320}
                    className="rounded-[2rem] shadow-2xl w-64 h-64 md:w-80 md:h-80"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-zinc-400">v2.0 Now Available</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                Transform Any File.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Instantly.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-xl mx-auto lg:mx-0">
                The privacy-first converter for Images, Video, and Audio.
                <br />
                No uploads, no limits.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/converter"
                  className="group px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Launch Web App
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://github.com/martin-sack/File-Converter/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download for Desktop
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl bg-gradient-to-b from-white/5 to-transparent">
              <div className="aspect-video bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <img 
                  src="/dashboard-preview.png" 
                  alt="File Converter Dashboard Preview" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-white">Everything You Need</h2>
            <p className="text-xl text-zinc-400">Professional tools, zero compromises</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Large Card - Batch Processing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:row-span-2 p-8 bg-[#111] border border-white/10 rounded-3xl hover:border-white/20 hover:scale-[1.01] transition-all"
            >
              <div className="w-12 h-12 bg-cyan-500/30 text-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Batch Processing</h3>
              <p className="text-zinc-400 mb-6">Convert hundreds of files at once with parallel processing</p>
              <div className="grid grid-cols-3 gap-3">
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-zinc-400 font-medium">Image</span>
                </div>
                
                {/* PDF */}
                <div className="aspect-square bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-zinc-400 font-medium">PDF</span>
                </div>
                
                {/* Audio */}
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span className="text-xs text-zinc-400 font-medium">Audio</span>
                </div>
                
                {/* Video */}
                <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors">
                  <svg className="w-10 h-10 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-zinc-400 font-medium">Video</span>
                </div>
                
                {/* DOCX */}
                <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors">
                  <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs text-zinc-400 font-medium">DOCX</span>
                </div>
                
                {/* ZIP */}
                <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-white/20 transition-colors">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span className="text-xs text-zinc-400 font-medium">ZIP</span>
                </div>
              </div>
            </motion.div>

            {/* AI Smart Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-[#111] border border-white/10 rounded-3xl hover:border-white/20 hover:scale-[1.01] transition-all"
            >
              <div className="w-12 h-12 bg-purple-500/30 text-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">AI Smart Mode</h3>
              <p className="text-zinc-400 text-sm">Auto-detect formats and suggest optimal conversions</p>
            </motion.div>

            {/* Lightning Fast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-[#111] border border-white/10 rounded-3xl hover:border-white/20 hover:scale-[1.01] transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/30 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Lightning Fast</h3>
              <p className="text-zinc-400 text-sm">Native performance with GPU acceleration</p>
            </motion.div>

            {/* Privacy First */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 p-8 bg-[#111] border border-white/10 rounded-3xl hover:border-white/20 hover:scale-[1.01] transition-all"
            >
              <div className="w-12 h-12 bg-green-500/30 text-green-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Privacy First</h3>
              <p className="text-zinc-400">All processing happens locally. Your files never leave your device.</p>
            </motion.div>

            {/* 100+ Formats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-[#111] border border-white/10 rounded-3xl hover:border-white/20 hover:scale-[1.01] transition-all"
            >
              <div className="w-12 h-12 bg-amber-500/30 text-amber-500 rounded-lg flex items-center justify-center mb-4">
                <FileType className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">100+ Formats</h3>
              <p className="text-zinc-400 text-sm">Images, videos, documents, and more</p>
            </motion.div>

            {/* Unlimited */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-[#111] border border-white/10 rounded-3xl hover:border-white/20 hover:scale-[1.01] transition-all"
            >
              <div className="w-12 h-12 bg-pink-500/30 text-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Infinity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Unlimited</h3>
              <p className="text-zinc-400 text-sm">No file size limits, no usage caps</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Format Ticker */}
      <section className="relative py-12 overflow-hidden border-y border-white/5">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...formats, ...formats, ...formats].map((format, i) => (
            <div
              key={i}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-lg text-zinc-400"
            >
              {format}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center text-zinc-500">
          <p>© 2024 Universal File Converter. Open Source & Free Forever.</p>
        </div>
      </footer>
    </div>
  );
}
