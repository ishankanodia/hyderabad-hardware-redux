# Gallery Assets

Drop photos into the subfolders and they'll automatically appear in the Gallery page.

## Folder Structure

- `ground/` — Ground Floor Hardware Showroom photos
- `blum/` — First Floor Blum Experience Centre photos
- `astronea/` — Third Floor Astronea Experience Centre photos

## Supported Formats

`.jpg`, `.jpeg`, `.png`, `.webp`

## How It Works

The Gallery page uses Vite's `import.meta.glob` to dynamically discover and load
all images in these folders. Simply add or remove files — no code changes needed.

## Videos

Place video files in `public/videos/` and update the `videoItems` array in
`src/pages/Gallery.tsx` to reference them.
