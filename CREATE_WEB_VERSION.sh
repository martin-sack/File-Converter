#!/bin/bash

echo "🌐 Universal File Converter - Web Version Setup"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Creating Next.js project...${NC}"
npx create-next-app@latest universal-converter-web --typescript --tailwind --app --no-src-dir

cd universal-converter-web

echo -e "${GREEN}✓ Next.js project created${NC}"
echo ""

echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm install @ffmpeg/ffmpeg @ffmpeg/core @ffmpeg/util browser-image-compression tesseract.js jszip showdown jspdf lucide-react

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 3: Copying files...${NC}"
# Copy service layer
mkdir -p src/services
cp -r ../src/services/* ./src/services/

# Copy Next.js components
cp -r ../nextjs-landing/components ./
cp -r ../nextjs-landing/app/* ./app/

echo -e "${GREEN}✓ Files copied${NC}"
echo ""

echo -e "${BLUE}Step 4: Configuration...${NC}"
cat > .env.local << 'ENVEOF'
NEXT_PUBLIC_GITHUB_REPO=YOUR_USERNAME/universal-file-converter
NEXT_PUBLIC_API_URL=https://api.github.com
ENVEOF

echo -e "${GREEN}✓ Environment configured${NC}"
echo ""

echo "================================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. cd universal-converter-web"
echo "2. Update .env.local with your GitHub username"
echo "3. npm run dev"
echo "4. Open http://localhost:3000"
echo ""
echo "To deploy:"
echo "1. vercel (install with: npm i -g vercel)"
echo "2. Follow prompts"
echo ""
echo "Happy converting! 🚀"
