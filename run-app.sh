#!/bin/bash

echo "🔧 Universal File Converter - Quick Start"
echo "=========================================="
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "📦 First time setup - building main process..."
    npm run build:main
    echo "✅ Build complete!"
    echo ""
fi

# Check if preload.js exists
if [ ! -f "dist/preload.js" ]; then
    echo "⚠️  Preload script missing - rebuilding..."
    npm run build:main
    echo "✅ Build complete!"
    echo ""
fi

echo "🚀 Starting application..."
echo ""
echo "💡 Tip: If file selection doesn't work, run:"
echo "   npm run build:main && npm run dev"
echo ""

npm run dev
