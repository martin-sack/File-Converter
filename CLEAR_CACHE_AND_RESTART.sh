#!/bin/bash

# Clear Next.js cache and restart server

echo "🧹 Clearing Next.js cache..."
rm -rf .next

echo "📦 Installing dependencies (if needed)..."
npm install

echo "🚀 Starting dev server..."
npm run dev
