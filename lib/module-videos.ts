/**
 * Curriculum module video URLs.
 *
 * Resolution order (first match wins):
 * 1. Full https URL in data or manifest
 * 2. Entry in lib/module-videos.manifest.json
 * 3. NEXT_PUBLIC_MODULE_VIDEOS_CDN_URL + filename
 * 4. Cloudinary (only if NEXT_PUBLIC_USE_CLOUDINARY_MODULE_VIDEOS=true)
 * 5. Local path under public/ (NEXT_PUBLIC_MODULE_VIDEOS_PATH, default /videos)
 */

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_MODULE_FOLDER,
  MODULE_VIDEOS_CDN_URL,
  MODULE_VIDEOS_BASE,
  moduleVideoPath,
  resolveAssetUrl,
} from "@/lib/media";
import manifest from "./module-videos.manifest.json";

const CLOUDINARY_TRANSFORM = "q_auto:good,f_mp4";

const manifestUrls = manifest as Record<string, string>;

function cloudinaryVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${CLOUDINARY_TRANSFORM}/${publicId}`;
}

function moduleCloudinaryPublicId(filename: string): string {
  const base = filename
    .replace(/^\/videos\//, "")
    .replace(/^\//, "")
    .replace(/\.mp4$/i, "");
  return `${CLOUDINARY_MODULE_FOLDER}/${base}`;
}

function parseFilename(path: string): string {
  const base = MODULE_VIDEOS_BASE.replace(/\/$/, "");
  if (path.startsWith(`${base}/`)) {
    return path.slice(base.length + 1);
  }
  return path.replace(/^\/videos\//, "").replace(/^\//, "");
}

/** Cloudinary is opt-in only — Vercel no longer defaults to it */
export function useCloudinaryVideos(): boolean {
  return process.env.NEXT_PUBLIC_USE_CLOUDINARY_MODULE_VIDEOS === "true";
}

function manifestVideoUrl(filename: string): string | null {
  const url = manifestUrls[filename]?.trim();
  return url ? url : null;
}

function cdnVideoUrl(filename: string): string | null {
  if (!MODULE_VIDEOS_CDN_URL) return null;
  const base = MODULE_VIDEOS_CDN_URL.replace(/\/$/, "");
  return `${base}/${filename}`;
}

/**
 * Resolve a module video path (e.g. "/videos/module-01.mp4") to a playable URL.
 */
export function moduleVideoUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const filename = parseFilename(path);

  const fromManifest = manifestVideoUrl(filename);
  if (fromManifest) return fromManifest;

  const fromCdn = cdnVideoUrl(filename);
  if (fromCdn) return fromCdn;

  if (useCloudinaryVideos()) {
    return cloudinaryVideoUrl(moduleCloudinaryPublicId(filename));
  }

  if (path.startsWith("/") && !path.startsWith(MODULE_VIDEOS_BASE)) {
    return resolveAssetUrl(path);
  }

  return moduleVideoPath(filename);
}
