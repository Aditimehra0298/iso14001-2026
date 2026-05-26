# Module videos

Upload **9 MP4 files** for the circular curriculum carousel:

| File | Module |
|------|--------|
| `module-01.mp4` | Transition Overview |
| `module-02.mp4` | Clause 4: Context |
| `module-03.mp4` | Clause 5: Leadership |
| `module-04.mp4` | Clause 6: Planning |
| `module-05.mp4` | Clause 7: Support |
| `module-06.mp4` | Clause 8: Operation |
| `module-07.mp4` | Clause 9: Evaluation |
| `module-08.mp4` | Clause 10: Improvement |
| `module-09.mp4` | Final Assessment |

Each clip plays a **10-second muted preview**, then blurs with a Register / Login prompt.

| File | Source |
|------|--------|
| `module-01.mp4` … `module-09.mp4` | Main module videos |
| `module-04-part2.mp4` | Module 4 part 2 (unlocked after registration) |

Recommended: 720p or 1080p, H.264, muted-friendly (no audio required).

## Local development

Copy MP4s into this folder (`public/videos/`). They are served at `/videos/module-01.mp4`, etc.

## Vercel (without Cloudinary)

Pick **one** of these:

### 1. Host on your site (simplest if files are small enough)

1. Place MP4s in `public/videos/`.
2. Remove or comment out `/public/videos/*.mp4` in `.gitignore` if you want them in Git.
3. Push and redeploy Vercel.

### 2. External CDN URL (recommended for large files)

In **Vercel → Settings → Environment Variables**, add:

```
NEXT_PUBLIC_MODULE_VIDEOS_CDN_URL=https://your-bucket.s3.amazonaws.com/videos
```

Files must be reachable at `{that URL}/module-01.mp4`, etc.

### 3. Per-file URLs in Git

Edit `lib/module-videos.manifest.json` with full `https://` URLs for each file, commit, and redeploy.

### Cloudinary (optional)

Only if you set `NEXT_PUBLIC_USE_CLOUDINARY_MODULE_VIDEOS=true` and run `npm run upload-videos`.
