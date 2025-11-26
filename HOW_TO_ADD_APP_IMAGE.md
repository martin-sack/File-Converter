# How to Add Your App Preview Image

## Steps:

1. **Add your image file** to `universal-converter-web/public/` folder
   - Name it: `app-preview.png` (or .jpg, .webp)
   - Recommended size: 800x600px or similar 4:3 aspect ratio

2. **The image will automatically appear** on the landing page hero section
   - It's positioned on the left side
   - The text "Transform Any File. Instantly..." is on the right
   - Has a nice glassmorphism frame with glow effects

3. **If the image doesn't exist**, a fallback icon will show instead

## Current Status:
✅ Hero component updated with image display
✅ Responsive layout (image on top for mobile, left side for desktop)
✅ Glassmorphism styling applied
✅ Converter tool cards now clickable with actions
✅ Fixed all z-index and pointer-events issues
