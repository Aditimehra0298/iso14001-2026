/**
 * Curriculum module videos are served from Cloudinary in production (Vercel).
 * Local MP4s in public/videos/ are used only when Cloudinary is not configured.
 *
 * Upload once: npm run upload-videos (requires Cloudinary API keys in .env.local)
 * Or upload manually to folder public_id prefix: iso14001-modules/
 */

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_MODULE_FOLDER,
  MODULE_VIDEOS_BASE,
  moduleVideoPath,
  resolveAssetUrl,
} from "@/lib/media";

const CLOUDINARY_TRANSFORM = "q_auto:good,f_mp4";

function cloudinaryVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${CLOUDINARY_TRANSFORM}/${publicId}`;
}

/** Derive Cloudinary public_id from filename (e.g. module-01.mp4 → iso14001-modules/module-01) */
function moduleCloudinaryPublicId(filename: string): string {
  const base = filename
    .replace(/^\/videos\//, "")
    .replace(/^\//, "")
    .replace(/\.mp4$/i, "");
  return `${CLOUDINARY_MODULE_FOLDER}/${base}`;
}

/** Use Cloudinary on Vercel/production; local /videos/ in dev unless forced */
export function useCloudinaryVideos(): boolean {
  if (process.env.NEXT_PUBLIC_USE_LOCAL_MODULE_VIDEOS === "true") return false;
  if (process.env.NEXT_PUBLIC_USE_CLOUDINARY_MODULE_VIDEOS === "true") return true;
  if (process.env.VERCEL === "1" || process.env.VERCEL_ENV) return true;
  return process.env.NODE_ENV === "production";
}

/**
 * Resolve a module video path (e.g. "/videos/module-01.mp4") to a playable URL.
 * Accepts full URLs unchanged.
 */
export function moduleVideoUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const base = MODULE_VIDEOS_BASE.replace(/\/$/, "");
  let filename = path;
  if (path.startsWith(`${base}/`)) {
    filename = path.slice(base.length + 1);
  } else {
    filename = path.replace(/^\/videos\//, "").replace(/^\//, "");
  }

  if (useCloudinaryVideos()) {
    return cloudinaryVideoUrl(moduleCloudinaryPublicId(filename));
  }

  if (path.startsWith("/") && !path.startsWith(MODULE_VIDEOS_BASE)) {
    return resolveAssetUrl(path);
  }

  return moduleVideoPath(filename);
}
