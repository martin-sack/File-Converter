# Installation Guide

## System Requirements

### Minimum Requirements
- **OS**: macOS 10.13+, Windows 10+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB
- **Disk Space**: 500MB
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher

### Recommended Requirements
- **OS**: macOS 12+, Windows 11, or Linux (Ubuntu 22.04+)
- **RAM**: 8GB or more
- **Disk Space**: 1GB
- **Node.js**: 20.0.0 or higher

## Step-by-Step Installation

### 1. Install Node.js

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Windows:**
```bash
# Download installer from nodejs.org
# Or use Chocolatey
choco install nodejs
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora
sudo dnf install nodejs
```

Verify installation:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

### 2. Install FFmpeg (Required)

FFmpeg is required for video and audio conversions.

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**

Option 1: Using Chocolatey (Recommended)
```bash
choco install ffmpeg
```

Option 2: Manual Installation
1. Download from https://ffmpeg.org/download.html
2. Extract to `C:\ffmpeg`
3. Add `C:\ffmpeg\bin` to System PATH:
   - Right-click "This PC" → Properties
   - Advanced system settings → Environment Variables
   - Edit "Path" → Add `C:\ffmpeg\bin`
   - Restart terminal

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Arch
sudo pacman -S ffmpeg
```

Verify installation:
```bash
ffmpeg -version
```

### 3. Clone or Download Project

**Option A: Using Git**
```bash
git clone https://github.com/yourusername/universal-file-converter.git
cd universal-file-converter
```

**Option B: Download ZIP**
1. Download ZIP from GitHub
2. Extract to desired location
3. Open terminal in extracted folder

### 4. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Electron
- React
- TypeScript
- Sharp (image processing)
- FFmpeg bindings
- Tesseract.js (OCR)
- And more...

**Note**: Installation may take 3-5 minutes depending on your internet speed.

### 5. Run the Application

**Development Mode:**
```bash
npm run dev
```

This will:
- Start the Vite dev server (port 3000)
- Launch Electron app
- Enable hot-reload for development

**Production Build:**
```bash
# Build the app
npm run build

# Create distributable
npm run dist
```

## Platform-Specific Notes

### macOS

**Code Signing (for distribution):**
```bash
# Install Apple Developer certificate
# Update package.json with your signing identity
```

**Notarization:**
Required for macOS 10.15+ distribution. See electron-builder docs.

**Permissions:**
The app may request permissions for:
- File system access
- Camera (for OCR from camera - future feature)

### Windows

**Antivirus:**
Some antivirus software may flag the app during first run. This is a false positive common with Electron apps.

**Windows Defender:**
Add exception if needed:
1. Windows Security → Virus & threat protection
2. Manage settings → Add exclusion
3. Add the app folder

**Visual C++ Redistributable:**
Required for some native modules. Usually installed automatically.

### Linux

**Dependencies:**
```bash
# Ubuntu/Debian
sudo apt install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libdrm2 libgbm1 libxcb-dri3-0

# Fedora
sudo dnf install gtk3 libnotify nss libXScrnSaver libXtst xdg-utils at-spi2-atk libdrm mesa-libgbm libxcb
```

**AppImage:**
Make executable:
```bash
chmod +x Universal-File-Converter-*.AppImage
./Universal-File-Converter-*.AppImage
```

## Troubleshooting

### Issue: "node-gyp" errors during npm install

**Solution:**
```bash
# macOS
xcode-select --install

# Windows
npm install --global windows-build-tools

# Linux
sudo apt install build-essential
```

### Issue: "sharp" installation fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install sharp --force

# Or use prebuilt binaries
npm install --platform=darwin --arch=x64 sharp
```

### Issue: FFmpeg not found

**Solution:**
1. Verify FFmpeg is installed: `ffmpeg -version`
2. Check PATH includes FFmpeg
3. Restart terminal/app
4. On Windows, restart computer after PATH change

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Electron app won't start

**Solution:**
```bash
# Rebuild native modules
npm rebuild

# Clear Electron cache
rm -rf ~/.electron

# Reinstall Electron
npm install electron --force
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.ts
```

## Building Distributables

### macOS

```bash
npm run dist:mac
```

Output:
- `release/Universal File Converter-1.0.0.dmg`
- `release/Universal File Converter-1.0.0-mac.zip`

### Windows

```bash
npm run dist:win
```

Output:
- `release/Universal File Converter Setup 1.0.0.exe` (installer)
- `release/Universal File Converter 1.0.0.exe` (portable)

### Linux

```bash
npm run dist
```

Output:
- `release/Universal File Converter-1.0.0.AppImage`
- `release/universal-file-converter_1.0.0_amd64.deb`
- `release/universal-file-converter-1.0.0.x86_64.rpm`

## Development Setup

### IDE Recommendations

**VS Code Extensions:**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Electron Debug

**WebStorm:**
- Built-in TypeScript support
- Electron plugin

### Environment Variables

Create `.env` file (optional):
```bash
NODE_ENV=development
ELECTRON_ENABLE_LOGGING=true
```

### Debug Mode

**VS Code:**
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "args": ["."],
      "outputCapture": "std"
    }
  ]
}
```

## Updating

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Update Electron

```bash
npm install electron@latest
```

## Uninstallation

### Remove Application

**macOS:**
```bash
# Drag app to Trash
# Or use terminal
rm -rf /Applications/Universal\ File\ Converter.app
```

**Windows:**
```bash
# Use Control Panel → Programs and Features
# Or delete from Program Files
```

**Linux:**
```bash
# Remove AppImage
rm Universal-File-Converter-*.AppImage

# Or uninstall package
sudo apt remove universal-file-converter
```

### Remove User Data

**macOS:**
```bash
rm -rf ~/Library/Application\ Support/universal-file-converter
```

**Windows:**
```bash
rmdir /s "%APPDATA%\universal-file-converter"
```

**Linux:**
```bash
rm -rf ~/.config/universal-file-converter
```

## Getting Help

- **Documentation**: See README.md and QUICKSTART.md
- **Issues**: https://github.com/yourusername/universal-file-converter/issues
- **Discussions**: https://github.com/yourusername/universal-file-converter/discussions
- **Discord**: Join our community server

## Next Steps

After installation:
1. Read [QUICKSTART.md](QUICKSTART.md) for usage guide
2. Explore [FEATURES.md](FEATURES.md) for feature details
3. Check [ROADMAP.md](ROADMAP.md) for upcoming features

Happy converting! 🚀
