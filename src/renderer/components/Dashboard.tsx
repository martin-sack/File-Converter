import React from 'react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'image-to-pdf',
      icon: '📄',
      title: 'Image to PDF',
      description: 'Convert images to PDF documents'
    },
    {
      id: 'image-convert',
      icon: '🖼️',
      title: 'Image Converter',
      description: 'Convert between JPG, PNG, WEBP formats'
    },
    {
      id: 'image-compress',
      icon: '📦',
      title: 'Image Compressor',
      description: 'Compress images to target file size'
    },
    {
      id: 'image-resize',
      icon: '📐',
      title: 'Image Resizer',
      description: 'Resize images with aspect ratio control'
    },
    {
      id: 'video-compress',
      icon: '📹',
      title: 'Video Compressor',
      description: 'Compress videos to 1080p, 720p, or 480p'
    },
    {
      id: 'document',
      icon: '📝',
      title: 'Document Converter',
      description: 'Markdown, JSON, CSV conversions'
    },
    {
      id: 'media',
      icon: '🎵',
      title: 'Media Converter',
      description: 'Video to MP3, audio format conversions'
    },
    {
      id: 'ocr',
      icon: '🔍',
      title: 'OCR Text Extractor',
      description: 'Extract text from images and PDFs'
    },
    {
      id: 'archive',
      icon: '🗜️',
      title: 'Archive Tools',
      description: 'ZIP and unzip files'
    }
  ];

  return (
    <div className="dashboard">
      {categories.map((category) => (
        <div
          key={category.id}
          className="card"
          onClick={() => onNavigate(category.id)}
        >
          <div className="card-icon">{category.icon}</div>
          <h2>{category.title}</h2>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
