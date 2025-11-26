'use client';

import { motion } from 'framer-motion';

const formats = [
  'JPG', 'PNG', 'WEBP', 'GIF', 'SVG', 'BMP', 'TIFF',
  'MP4', 'AVI', 'MOV', 'MKV', 'WEBM', 'FLV',
  'MP3', 'WAV', 'AAC', 'FLAC', 'OGG', 'M4A',
  'PDF', 'DOCX', 'TXT', 'MD', 'HTML', 'JSON', 'CSV', 'XML',
  'ZIP', 'RAR', '7Z', 'TAR', 'GZ'
];

// Duplicate for seamless loop
const allFormats = [...formats, ...formats];

export default function FormatTicker() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10"></div>

      {/* Ticker */}
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -50 * formats.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear'
          }
        }}
      >
        {allFormats.map((format, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span className="text-lg font-mono font-semibold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              .{format}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Label */}
      <div className="text-center mt-8">
        <p className="text-white/40 text-sm">
          Supporting 100+ file formats and counting
        </p>
      </div>
    </div>
  );
}
