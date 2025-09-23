# Adding Favicon to Vera UI Docs

## Current Setup

The favicon is already configured in `app/layout.tsx` using Next.js Metadata API pointing to `/vera.png`.

## Recommended Favicon Files

For optimal browser support, create these favicon files in the `public/` directory:

1. **favicon.ico** (16x16, 32x32, 48x48) - Classic ICO format
2. **favicon-16x16.png** - 16x16 PNG
3. **favicon-32x32.png** - 32x32 PNG
4. **apple-touch-icon.png** - 180x180 PNG for iOS
5. **android-chrome-192x192.png** - 192x192 PNG for Android
6. **android-chrome-512x512.png** - 512x512 PNG for Android

## How to Generate

### Option 1: Online Tools

- Use [favicon.io](https://favicon.io/favicon-converter/)
- Upload your `vera.png` file
- Download the generated favicon package

### Option 2: ImageMagick (Command Line)

```bash
# Convert vera.png to different sizes
convert vera.png -resize 16x16 favicon-16x16.png
convert vera.png -resize 32x32 favicon-32x32.png
convert vera.png -resize 180x180 apple-touch-icon.png
convert vera.png -resize 192x192 android-chrome-192x192.png
convert vera.png -resize 512x512 android-chrome-512x512.png

# Create ICO file with multiple sizes
convert vera.png -resize 16x16 vera-16.png
convert vera.png -resize 32x32 vera-32.png
convert vera.png -resize 48x48 vera-48.png
convert vera-16.png vera-32.png vera-48.png favicon.ico
```

## Enhanced Metadata (Optional)

If you want more complete metadata, you can update `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Vera UI - Modern React Component Library",
  description:
    "A modern, accessible React component library built with Radix UI and Tailwind CSS",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest", // If you create a web app manifest
};
```

## Web App Manifest (Optional)

Create `public/site.webmanifest` for PWA support:

```json
{
  "name": "Vera UI",
  "short_name": "VeraUI",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## Current Status

✅ Basic favicon configured using existing `vera.png`
⏳ Additional formats can be added for better browser support
⏳ Web app manifest can be added for PWA features
