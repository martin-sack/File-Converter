'use client';

import { motion } from 'framer-motion';
import { Layers, Sparkles, Shield, Infinity, Zap, FileCheck } from 'lucide-react';

const features = [
  {
    title: 'Batch Processing',
    description: 'Convert hundreds of files at once with parallel processing',
    icon: Layers,
    size: 'large', // col-span-2 row-span-2
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    title: 'AI Smart Mode',
    description: 'Auto-detect formats and suggest optimal conversions',
    icon: Sparkles,
    size: 'tall', // col-span-1 row-span-2
    gradient: 'from-magenta-500/20 to-pink-500/20'
  },
  {
    title: 'Privacy First',
    description: 'All processing happens locally. Your files never leave your device.',
    icon: Shield,
    size: 'wide', // col-span-2 row-span-1
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  {
    title: '100+ Formats',
    description: 'Images, videos, documents, and more',
    icon: FileCheck,
    size: 'small', // col-span-1 row-span-1
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    title: 'Unlimited',
    description: 'No file size limits, no usage caps',
    icon: Infinity,
    size: 'small',
    gradient: 'from-orange-500/20 to-red-500/20'
  },
  {
    title: 'Lightning Fast',
    description: 'Native performance with GPU acceleration',
    icon: Zap,
    size: 'small',
    gradient: 'from-yellow-500/20 to-amber-500/20'
  }
];

const sizeClasses = {
  large: 'col-span-2 row-span-2',
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  small: 'col-span-1 row-span-1'
};

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`${sizeClasses[feature.size as keyof typeof sizeClasses]} group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300`}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/60 text-sm">{feature.description}</p>

            {/* Special content for large card */}
            {feature.size === 'large' && (
              <div className="mt-auto grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-white/10 backdrop-blur-sm animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            )}

            {/* Special content for tall card */}
            {feature.size === 'tall' && (
              <div className="mt-auto space-y-2">
                <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                <div className="h-2 bg-white/10 rounded-full w-2/3"></div>
              </div>
            )}
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl`}></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
