'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <Features />
      <Comparison />
      <DownloadSection />
      <Footer />
    </main>
  );
}
