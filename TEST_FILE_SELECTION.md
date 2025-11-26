# Testing File Selection

## Issue
File selection dialog not opening when clicking "Click to select" buttons.

## Root Cause
The `window.electronAPI` may not be available because:
1. Preload script not compiled in development mode
2. TypeScript files need to be built before Electron can load them

## Solution

### Step 1: Build the Main Process
```bash
npm run build:main
```

This compiles:
- `src/main.ts` → `dist/main.js`
- `src/preload.ts` → `dist/preload.js`
- All converter files

### Step 2: Run Development Mode
```bash
npm run dev
```

## Testing Steps

1. **Open Developer Console** (View → Toggle Developer Tools)
2. **Check if electronAPI exists**:
   ```javascript
   console.log(window.electronAPI);
   ```
   Should show an object with methods like `selectFile`, `selectFiles`, etc.

3. **Test file selection manually**:
   ```javascript
   window.electronAPI.selectFile().then(file => console.log(file));
   ```

4. **Click "Image to PDF"** card
5. **Click "Click to select images"**
6. **File picker should open**

## If Still Not Working

### Check 1: Preload Script Loaded
In console:
```javascript
console.log('electronAPI available:', !!window.electronAPI);
```

If `false`, the preload script didn't load.

### Check 2: Build Files Exist
```bash
ls -la dist/
```

Should see:
- `main.js`
- `preload.js`

### Check 3: Rebuild Everything
```bash
rm -rf dist node_modules
npm install
npm run build:main
npm run dev
```

## Alternative: Use Production Build

```bash
npm run build
npm run dist
```

Then run the built app from `release/` folder.

## Expected Behavior

When clicking "Click to select images":
1. Native file picker opens
2. Select one or more image files
3. File names appear in the UI
4. "Convert to PDF" button becomes enabled

## Debug Output

The components now include error logging:
- Check console for "electronAPI not available"
- Check console for "Error selecting file"
- Check console for any other errors

## Quick Fix Script

Create a file `fix-and-run.sh`:
```bash
#!/bin/bash
echo "Building main process..."
npm run build:main

echo "Starting development server..."
npm run dev
```

Run:
```bash
chmod +x fix-and-run.sh
./fix-and-run.sh
```

## Verification

After fixing, you should be able to:
✅ Click any "Click to select" button
✅ See native file picker
✅ Select files
✅ See file names in UI
✅ Convert files successfully
