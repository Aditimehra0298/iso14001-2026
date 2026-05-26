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

## Media paths (logo & videos)

Copy `.env.example` to `.env.local` and set any overrides:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_LOGO` | Header/footer logo (`/logo-112.png` default) |
| `NEXT_PUBLIC_SITE_ICON` | Favicon (`/logo.png` default) |
| `NEXT_PUBLIC_HERO_VIDEO` / `_POSTER` | Hero background |
| `NEXT_PUBLIC_OVERVIEW_VIDEO` / `_POSTER` | Overview section |
| `NEXT_PUBLIC_FAQ_VIDEO` / `_POSTER` | FAQ section |
| `NEXT_PUBLIC_MODULE_VIDEOS_PATH` | Local curriculum folder (`/videos` default) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary account |
| `NEXT_PUBLIC_CLOUDINARY_MODULE_FOLDER` | Upload folder (`iso14001-modules` default) |

Paths can be under `public/` (e.g. `/logo.png`) or full `https://` URLs.

## Module videos

**Local dev:** Add MP4 files to `public/videos/` (`module-01.mp4` … `module-09.mp4`). See `public/videos/README.md`.

**Vercel / production:** Videos are **not** in Git (too large). They are loaded from **Cloudinary**:

1. Add Cloudinary API keys to `.env.local` (see `.env.example`).
2. Run `npm run upload-videos` once (uploads from `public/videos/`).
3. Redeploy Vercel.

Public IDs: `{NEXT_PUBLIC_CLOUDINARY_MODULE_FOLDER}/module-01` … `module-09`, `module-04-part2`.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Lucide React icons
- Swiper (overview carousel)

## Original HTML

The static HTML version remains in the parent folder as `14001 transition landing page sample (2).html`.
