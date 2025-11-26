# 🚀 Deployment Guide - Web + Desktop

## Complete Deployment Strategy

This guide covers deploying both the **Web Version** (Next.js) and **Desktop Version** (Electron) of Universal File Converter.

---

## Part 1: Desktop App Deployment

### Step 1: Build Desktop App

```bash
# In your Electron project root
npm run build
npm run dist
```

This creates installers in `release/` folder:
- `Universal File Converter Setup 1.0.0.exe` (Windows)
- `Universal File Converter-1.0.0.dmg` (macOS)
- `Universal File Converter-1.0.0.AppImage` (Linux)

### Step 2: Create GitHub Release

1. **Create a new release on GitHub:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Go to GitHub → Releases → Create New Release**
   - Tag: `v1.0.0`
   - Title: `Universal File Converter v1.0.0`
   - Description: Release notes

3. **Upload binaries:**
   - Drag and drop files from `release/` folder
   - Upload `.exe`, `.dmg`, `.AppImage`

4. **Publish release**

### Step 3: Auto-Update Setup (Optional)

Add to `package.json`:
```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "YOUR_USERNAME",
      "repo": "universal-file-converter"
    }
  }
}
```

---

## Part 2: Web App Deployment (Next.js)

### Step 1: Create Next.js Project

```bash
# Create new Next.js project
npx create-next-app@latest universal-converter-web
cd universal-converter-web

# Install dependencies
npm install @ffmpeg/ffmpeg @ffmpeg/core @ffmpeg/util browser-image-compression tesseract.js jszip showdown jspdf lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Copy Files

Copy these files from your Electron project:

```bash
# Copy service layer
cp -r ../universal-file-converter/src/services ./src/

# Copy components (adapt for Next.js)
cp -r ../universal-file-converter/nextjs-landing/components ./
cp -r ../universal-file-converter/nextjs-landing/app ./
```

### Step 3: Configure Tailwind

`tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Option B: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

### Step 5: Configure Domain

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain: `universalconverter.com`

2. **In your DNS provider:**
   - Add A record: `76.76.21.21` (Vercel IP)
   - Or CNAME: `cname.vercel-dns.com`

3. **Wait for DNS propagation** (5-30 minutes)

---

## Part 3: Environment Variables

### For Next.js (Vercel)

Create `.env.local`:
```bash
NEXT_PUBLIC_GITHUB_REPO=YOUR_USERNAME/universal-file-converter
NEXT_PUBLIC_API_URL=https://api.github.com
```

Add in Vercel Dashboard:
- Settings → Environment Variables
- Add each variable

---

## Part 4: GitHub API Integration

### Fetch Latest Release

`lib/github.ts`:
```typescript
export async function getLatestRelease() {
  const response = await fetch(
    'https://api.github.com/repos/YOUR_USERNAME/universal-file-converter/releases/latest',
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch release');
  }

  return response.json();
}
```

### Use in Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getLatestRelease } from '@/lib/github';

export default function DownloadButton() {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    getLatestRelease().then(setRelease);
  }, []);

  // ... rest of component
}
```

---

## Part 5: Analytics (Optional)

### Vercel Analytics

```bash
npm install @vercel/analytics
```

`app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Privacy-Focused Alternative

Use [Plausible](https://plausible.io) or [Umami](https://umami.is):

```typescript
<script defer data-domain="universalconverter.com" src="https://plausible.io/js/script.js"></script>
```

---

## Part 6: SEO Optimization

### Meta Tags

`app/layout.tsx`:
```typescript
export const metadata = {
  title: 'Universal File Converter - Free Online & Desktop App',
  description: 'Convert images, videos, and documents instantly. Free, private, and unlimited. Available as web app and desktop download.',
  keywords: 'file converter, image converter, video converter, pdf converter, free converter',
  openGraph: {
    title: 'Universal File Converter',
    description: 'Convert files instantly. Free, private, unlimited.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal File Converter',
    description: 'Convert files instantly. Free, private, unlimited.',
    images: ['/og-image.png'],
  },
};
```

### Sitemap

`app/sitemap.ts`:
```typescript
export default function sitemap() {
  return [
    {
      url: 'https://universalconverter.com',
      lastModified: new Date(),
    },
    {
      url: 'https://universalconverter.com/app',
      lastModified: new Date(),
    },
    {
      url: 'https://universalconverter.com/download',
      lastModified: new Date(),
    },
  ];
}
```

---

## Part 7: Performance Optimization

### Next.js Config

`next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['github.com'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};
```

### Image Optimization

Use Next.js `<Image>` component:
```typescript
import Image from 'next/image';

<Image
  src="/screenshot.png"
  alt="App Screenshot"
  width={1200}
  height={800}
  priority
/>
```

---

## Part 8: Monitoring

### Vercel Monitoring

- Automatic in Vercel Dashboard
- View: Analytics, Speed Insights, Logs

### Error Tracking

Use [Sentry](https://sentry.io):

```bash
npm install @sentry/nextjs
```

```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

## Part 9: CI/CD Pipeline

### GitHub Actions

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Part 10: Launch Checklist

### Pre-Launch

- [ ] Test all converters in web version
- [ ] Test all converters in desktop version
- [ ] Verify download links work
- [ ] Test on multiple browsers
- [ ] Test on multiple OS (Windows, Mac, Linux)
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test GitHub API integration
- [ ] Check analytics setup
- [ ] Review privacy policy
- [ ] Test error handling

### Launch Day

- [ ] Deploy to production
- [ ] Verify domain works
- [ ] Post on Product Hunt
- [ ] Share on Twitter
- [ ] Share on Reddit (r/webdev, r/opensource)
- [ ] Share on Hacker News
- [ ] Email newsletter subscribers
- [ ] Update GitHub README

### Post-Launch

- [ ] Monitor analytics
- [ ] Respond to feedback
- [ ] Fix bugs
- [ ] Add requested features
- [ ] Write blog posts
- [ ] Create video tutorials
- [ ] Build community

---

## Summary

You now have:
- ✅ Desktop app build process
- ✅ GitHub releases setup
- ✅ Next.js web app
- ✅ Vercel deployment
- ✅ Domain configuration
- ✅ GitHub API integration
- ✅ SEO optimization
- ✅ Analytics setup
- ✅ CI/CD pipeline
- ✅ Launch checklist

**Your app is ready to launch! 🚀**

---

## Quick Commands

```bash
# Desktop: Build and release
npm run build && npm run dist

# Web: Deploy to Vercel
vercel --prod

# Both: Update version
npm version patch
git push origin main --tags
```

**Need help?** Check the documentation or open an issue on GitHub!
