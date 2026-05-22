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

## Vercel deployment

MP4s are **not** pushed to GitHub. For production, run from project root:

```bash
npm run upload-videos
```

Requires `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `.env.local`. Then redeploy Vercel.
