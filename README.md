# iso14001-2026

ISO 14001 Transition Landing Page (Next.js)

Next.js port of the ISO 14001:2015 → 2026 transition training landing page.

## Run locally

```bash
cd iso14001-landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Module videos

**Local dev:** Add MP4 files to `public/videos/` (`module-01.mp4` … `module-09.mp4`). See `public/videos/README.md`.

**Vercel / production:** Videos are **not** in Git (too large). They are loaded from **Cloudinary**:

1. Add Cloudinary API keys to `.env.local` (see `.env.example`).
2. Run `npm run upload-videos` once (uploads from `public/videos/`).
3. Redeploy Vercel.

Public IDs: `iso14001-modules/module-01` … `module-09`, `module-04-part2`.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Lucide React icons
- Swiper (overview carousel)

## Original HTML

The static HTML version remains in the parent folder as `14001 transition landing page sample (2).html`.
