# Create Next.js Landing Page + Web App

## Step-by-Step Setup

### 1. Create Next.js Project (in parent directory)

```bash
# Go to parent directory
cd ..

# Create Next.js app
npx create-next-app@latest universal-converter-landing --typescript --tailwind --app --no-src-dir

cd universal-converter-landing
```

### 2. Install Dependencies

```bash
npm install framer-motion lucide-react
npm install browser-image-compression @ffmpeg/ffmpeg @ffmpeg/core tesseract.js jszip showdown jspdf
```

### 3. Copy Service Layer

```bash
# Copy from Electron project
cp -r "../FIL CONVERTOR/src/services" ./lib/services
```

### 4. Copy Converter Components

```bash
# Copy React components
cp -r "../FIL CONVERTOR/src/renderer/components" ./components/converter
cp "../FIL CONVERTOR/src/renderer/styles.css" ./app/converter/styles.css
```

### 5. Project Structure

```
universal-converter-landing/
├── app/
│   ├── page.tsx                    # Landing page (NEW)
│   ├── converter/
│   │   ├── page.tsx                # Converter app
│   │   └── styles.css
│   ├── download/
│   │   └── page.tsx                # Download page
│   └── layout.tsx
├── components/
│   ├── landing/                    # Landing page components
│   │   ├── Hero.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── FormatTicker.tsx
│   │   └── Footer.tsx
│   └── converter/                  # Converter components (copied)
├── lib/
│   └── services/                   # Service adapter (copied)
└── public/
```

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 for landing page
Open http://localhost:3000/converter for web app

---

## Quick Start Script

Save this as `setup-nextjs.sh`:

```bash
#!/bin/bash
cd ..
npx create-next-app@latest universal-converter-landing --typescript --tailwind --app --no-src-dir
cd universal-converter-landing
npm install framer-motion lucide-react browser-image-compression @ffmpeg/ffmpeg @ffmpeg/core tesseract.js jszip showdown jspdf
mkdir -p lib/services components/converter
cp -r "../FIL CONVERTOR/src/services" ./lib/
cp -r "../FIL CONVERTOR/src/renderer/components" ./components/converter/
echo "✅ Setup complete! Run: npm run dev"
```

Run: `chmod +x setup-nextjs.sh && ./setup-nextjs.sh`
