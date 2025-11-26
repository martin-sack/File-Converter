#!/bin/bash

echo "🎨 Universal File Converter - Landing Page Setup"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}This will create a new Next.js project with the Neon Aurora landing page${NC}"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# Go to parent directory
cd ..

echo -e "${BLUE}Step 1: Creating Next.js project...${NC}"
npx create-next-app@latest universal-converter-web --typescript --tailwind --app --no-src-dir --import-alias "@/*"

cd universal-converter-web

echo -e "${GREEN}✓ Next.js project created${NC}"
echo ""

echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm install framer-motion lucide-react browser-image-compression @ffmpeg/ffmpeg @ffmpeg/core @ffmpeg/util tesseract.js jszip showdown jspdf

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 3: Creating directories...${NC}"
mkdir -p components lib/services app/converter/components

echo -e "${GREEN}✓ Directories created${NC}"
echo ""

echo -e "${BLUE}Step 4: Copying files...${NC}"

# Copy landing page components
cp -r "../FIL CONVERTOR/nextjs-landing/components/"* ./components/ 2>/dev/null || echo "Note: Some components may not exist yet"

# Copy landing page
cp "../FIL CONVERTOR/nextjs-landing/app/landing-page.tsx" ./app/page.tsx 2>/dev/null || echo "Note: Landing page will be created"

# Copy service layer
cp -r "../FIL CONVERTOR/src/services" ./lib/ 2>/dev/null || echo "Note: Services will need to be copied manually"

# Copy converter components
cp -r "../FIL CONVERTOR/src/renderer/components" ./app/converter/components/ 2>/dev/null || echo "Note: Converter components will need to be copied manually"

# Copy styles
cp "../FIL CONVERTOR/src/renderer/styles.css" ./app/converter/styles.css 2>/dev/null || echo "Note: Styles will need to be copied manually"

echo -e "${GREEN}✓ Files copied${NC}"
echo ""

echo -e "${BLUE}Step 5: Creating environment file...${NC}"
cat > .env.local << 'EOF'
NEXT_PUBLIC_GITHUB_REPO=YOUR_USERNAME/universal-file-converter
NEXT_PUBLIC_API_URL=https://api.github.com
EOF

echo -e "${GREEN}✓ Environment file created${NC}"
echo ""

echo "=================================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. cd universal-converter-web"
echo "2. Update .env.local with your GitHub username"
echo "3. npm run dev"
echo "4. Open http://localhost:3000"
echo ""
echo -e "${BLUE}Landing page features:${NC}"
echo "  • Neon Aurora design"
echo "  • Animated Bento grid"
echo "  • Infinite format ticker"
echo "  • Framer Motion animations"
echo "  • Glassmorphism effects"
echo ""
echo "Happy converting! 🚀"
