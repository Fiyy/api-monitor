# Required Images for SEO and Branding

This document lists all the image assets needed for optimal SEO, social media sharing, and PWA functionality.

## 📋 Image Checklist

### Priority 1: Essential SEO Images

#### 1. Open Graph Image
- **File**: `/public/og-image.png`
- **Size**: 1200 x 630 pixels
- **Format**: PNG or JPG
- **Purpose**: Social media sharing (Facebook, LinkedIn, etc.)
- **Content**: Dashboard screenshot or branded image with APIShift logo and tagline
- **Max file size**: < 1MB

#### 2. Twitter Card Image
- **File**: `/public/og-image.png` (same as Open Graph)
- **Size**: 1200 x 630 pixels
- **Format**: PNG or JPG
- **Purpose**: Twitter/X sharing
- **Note**: Can reuse Open Graph image

### Priority 2: PWA Icons

#### 3. Favicon
- **File**: `/public/favicon.ico`
- **Size**: 32 x 32 pixels (multi-size ICO recommended: 16x16, 32x32, 48x48)
- **Format**: ICO
- **Purpose**: Browser tab icon
- **Already exists**: ✅ (may need updating with brand logo)

#### 4. Standard Icon
- **File**: `/public/icon.png`
- **Size**: 32 x 32 pixels
- **Format**: PNG
- **Purpose**: Browser favicon (modern browsers)

#### 5. Android Chrome Icon - 192px
- **File**: `/public/icon-192.png`
- **Size**: 192 x 192 pixels
- **Format**: PNG with transparency
- **Purpose**: Android home screen, PWA install
- **Design**: Logo centered on solid background or transparent

#### 6. Android Chrome Icon - 512px
- **File**: `/public/icon-512.png`
- **Size**: 512 x 512 pixels
- **Format**: PNG with transparency
- **Purpose**: Android splash screen, PWA install
- **Design**: Logo centered on solid background or transparent

#### 7. Apple Touch Icon
- **File**: `/public/apple-icon.png`
- **Size**: 180 x 180 pixels
- **Format**: PNG
- **Purpose**: iOS home screen, Safari bookmarks
- **Design**: No transparency (use solid background)

### Priority 3: PWA Screenshots (Optional but Recommended)

#### 8. Desktop Screenshot
- **File**: `/public/screenshot-desktop.png`
- **Size**: 1280 x 720 pixels (16:9 ratio)
- **Format**: PNG or JPG
- **Purpose**: PWA installation dialog
- **Content**: Dashboard view or key feature

#### 9. Mobile Screenshot
- **File**: `/public/screenshot-mobile.png`
- **Size**: 750 x 1334 pixels (9:16 ratio)
- **Format**: PNG or JPG
- **Purpose**: PWA installation dialog (mobile)
- **Content**: Mobile-optimized dashboard view

## 🎨 Design Guidelines

### Brand Colors
Based on your Tailwind config and design:
- **Primary**: Slate/Dark Blue (#0f172a - theme color in manifest)
- **Background**: White (#ffffff)
- **Accent**: Your primary brand color

### Logo Requirements
- Use the lightning bolt icon from your homepage (or create a proper logo)
- Ensure high contrast for visibility
- Keep it simple and recognizable at small sizes

### Image Content Suggestions

#### For OG Image (1200x630):
```
┌────────────────────────────────────────┐
│                                        │
│         [APIShift Logo/Icon]           │
│                                        │
│     Real-time API Schema Monitoring    │
│      & Breaking Change Detection       │
│                                        │
│  [Dashboard screenshot or feature UI]  │
│                                        │
│      www.apishift.site                 │
└────────────────────────────────────────┘
```

#### For Icons (192x192, 512x512):
- Centered lightning bolt icon on solid color or gradient
- Or: "AS" monogram in clean typography
- Ensure 20% padding around the icon

## 📦 Temporary Solution

Until proper brand images are created, you can:

1. **Use placeholder generator services**:
   - https://placehold.co/1200x630/0f172a/white?text=APIShift
   - https://via.placeholder.com/512x512/0f172a/white?text=AS

2. **Create simple icons using**:
   - Figma (free)
   - Canva (free tier)
   - Photopea (free online Photoshop alternative)

3. **Screenshot your dashboard**:
   - Take a clean screenshot of the dashboard
   - Resize to 1200x630 for OG image
   - Add logo/branding overlay if needed

## 🚀 Quick Setup Script

Create these images and place them in `/public/`:

```bash
cd /root/code/products/api-monitor/app/public/

# You'll need to create these images manually or using a design tool
# For now, you can use placeholder images from online generators
```

## 🔄 Integration Status

The code is already set up to use these images:
- ✅ Metadata references configured in `layout.tsx`
- ✅ Manifest references configured in `manifest.ts`
- ⏳ Actual image files need to be created and placed in `/public/`

## 📝 Next Steps

1. Create or commission the images listed above
2. Place them in the `/public/` directory
3. Test on social media debuggers:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/
4. Test PWA installation on mobile devices

## 🎯 Priority Order

1. **Now**: OG Image + Favicon (for immediate social sharing)
2. **Soon**: PWA Icons 192px and 512px (for mobile users)
3. **Later**: Apple Touch Icon and Screenshots (for better PWA experience)

---

**Note**: All images should be optimized for web:
- Use TinyPNG or ImageOptim to compress
- Target < 200KB for icons, < 1MB for OG images
- Use modern formats (WebP/AVIF) where supported
