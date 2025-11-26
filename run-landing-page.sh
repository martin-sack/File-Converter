#!/bin/bash

echo "🎨 Starting Universal File Converter Landing Page..."
echo ""

cd ../universal-converter-web

echo "📍 Location: $(pwd)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting Next.js dev server..."
echo ""
echo "Landing page will be available at:"
echo "  http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev
