'use client';

import { Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-2">
              Universal File Converter
            </h3>
            <p className="text-white/60 mb-4">
              The last file converter you'll ever need. Free, open source, and privacy-focused.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/YOUR_USERNAME/universal-file-converter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com/YOUR_HANDLE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="/app" className="text-white/60 hover:text-white transition-colors">
                  Web App
                </a>
              </li>
              <li>
                <a href="#download" className="text-white/60 hover:text-white transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a href="/features" className="text-white/60 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-white/60 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-white/60 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/blog" className="text-white/60 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/support" className="text-white/60 hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="https://github.com/YOUR_USERNAME/universal-file-converter" className="text-white/60 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 Universal File Converter. All rights reserved.
          </p>
          <p className="text-white/60 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400" /> by developers, for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
