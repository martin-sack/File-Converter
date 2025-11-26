'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Shield, Zap, Layers, FileCheck, Infinity } from 'lucide-react';
import FormatTicker from '@/components/FormatTicker';
import BentoGrid from '@/components/BentoGrid';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Animated Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-magenta-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent font-semibold">
                v2.0 Now Available
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              Transform Any File.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-violet-400 bg-clip-text text-transparent">
                Instantly.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto"
            >
              The privacy-first converter for Images, Video, and Audio.
              <br />
              No uploads, no limits.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                href="/converter"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
              >
                Launch Web App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/download"
                className="px-8 py-4 bg-white/5 backdrop-blur-xl rounded-xl font-semibold text-lg border-2 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download for Desktop
              </Link>
            </motion.div>

            {/* 3D Mockup Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-8 transform perspective-1000 rotate-x-12">
                <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Layers className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/40">Dashboard Preview</p>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-white/60">
                Professional tools, zero compromises
              </p>
            </motion.div>

            <BentoGrid />
          </div>
        </section>

        {/* Format Ticker */}
        <section className="py-16">
          <FormatTicker />
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/40 text-sm">
              © 2024 Universal File Converter. Open Source & Free Forever.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
