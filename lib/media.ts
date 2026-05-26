/**
 * Logo, favicon, and video URLs — override via NEXT_PUBLIC_* in .env.local
 * See .env.example
 */

import { withBasePath } from "@/lib/base-path";

function env(key: string, fallback: string): string {
  const value = process.env[key]?.trim();
  return value || fallback;
}

/** Normalize to absolute path (/…) or leave full URL unchanged */
export function resolveAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const local = path.startsWith("/") ? path : `/${path}`;
  return withBasePath(local);
}

/** Local folder for curriculum MP4s (under public/) */
export const MODULE_VIDEOS_BASE = env("NEXT_PUBLIC_MODULE_VIDEOS_PATH", "/videos");

/**
 * Optional external base for module MP4s on Vercel (no Cloudinary).
 * Example: https://your-bucket.s3.amazonaws.com/iso14001/videos
 * Resolves module-01.mp4 → {base}/module-01.mp4
 */
export const MODULE_VIDEOS_CDN_URL = env("NEXT_PUBLIC_MODULE_VIDEOS_CDN_URL", "").replace(
  /\/$/,
  ""
);

const DEFAULT_GITHUB_VIDEO_BASE =
  process.env.VERCEL === "1" ||
  process.env.VERCEL_ENV ||
  process.env.NODE_ENV === "production"
    ? "https://media.githubusercontent.com/media/Aditimehra0298/iso14001-2026/main/public/videos"
    : "";

/**
 * GitHub LFS CDN for module MP4s (used on Vercel so videos are not in the deploy bundle).
 * Override or disable with NEXT_PUBLIC_MODULE_VIDEOS_GITHUB_BASE (set to empty to off).
 */
export const MODULE_VIDEOS_GITHUB_BASE = (
  process.env.NEXT_PUBLIC_MODULE_VIDEOS_GITHUB_BASE !== undefined
    ? process.env.NEXT_PUBLIC_MODULE_VIDEOS_GITHUB_BASE.trim()
    : DEFAULT_GITHUB_VIDEO_BASE
).replace(/\/$/, "");

/** Build a curriculum module video path from a filename */
export function moduleVideoPath(filename: string): string {
  const base = MODULE_VIDEOS_BASE.replace(/\/$/, "");
  const name = filename.replace(/^\/+/, "").replace(/^videos\//, "");
  return withBasePath(`${base}/${name}`);
}

/** Header / footer logo */
export const SITE_LOGO = resolveAssetUrl(env("NEXT_PUBLIC_SITE_LOGO", "/logo-112.png"));

/** Favicon & apple-touch icon (layout metadata) */
export const SITE_ICON = resolveAssetUrl(env("NEXT_PUBLIC_SITE_ICON", "/logo.png"));

export const CLOUDINARY_CLOUD_NAME = env(
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  env("CLOUDINARY_CLOUD_NAME", "dwnnakrrh")
);

/** Cloudinary folder prefix for curriculum uploads (public_id: {folder}/module-01) */
export const CLOUDINARY_MODULE_FOLDER = env(
  "NEXT_PUBLIC_CLOUDINARY_MODULE_FOLDER",
  "iso14001-modules"
);

const DEFAULT_HERO_VIDEO =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/c_fill,w_1920,h_1080,g_center,q_auto:good/f_mp4/v1779349417/AQMnMIiaZMQ8S-xhyGyxWGuKoXs7XJYU6EPMkZw_NcI9aT7clGVxHdojneWSDe5hBMgBfNiYYHpEMDsZewU9vgHcQJ_ZFra6MwsdzaQ.mp4_yhzco0.mp4";
const DEFAULT_HERO_POSTER =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/so_0,c_fill,w_1920,h_1080,g_center,q_auto,f_jpg/v1779349417/AQMnMIiaZMQ8S-xhyGyxWGuKoXs7XJYU6EPMkZw_NcI9aT7clGVxHdojneWSDe5hBMgBfNiYYHpEMDsZewU9vgHcQJ_ZFra6MwsdzaQ.mp4_yhzco0";
const DEFAULT_OVERVIEW_VIDEO =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/c_fill,w_1920,h_1080,g_center,q_auto:good/f_mp4/v1779353461/AQPkPMMKnVFfX41ezDCELADqlZ1Ew2sKvwgbhuIyUXdgIPsEyFF42Eh7binX6YvEhbW9pGnhy5o931K1qwefhh1MuYFF6jFN1erlFKoyfyQElF9A7D2yUDLyxSxMBA.mp4_q7lnbt.mp4";
const DEFAULT_OVERVIEW_POSTER =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/so_0,c_fill,w_1920,h_1080,g_center,q_auto,f_jpg/v1779353461/AQPkPMMKnVFfX41ezDCELADqlZ1Ew2sKvwgbhuIyUXdgIPsEyFF42Eh7binX6YvEhbW9pGnhy5o931K1qwefhh1MuYFF6jFN1erlFKoyfyQElF9A7D2yUDLyxSxMBA.mp4_q7lnbt";
const DEFAULT_FAQ_VIDEO =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/v1779410678/AQMrUqsC1EAA8GlbIFAZDVu6-ht6soI-4CdsM8PZk1CKBMR-zifgI0gV_KN38AMwncX7TQCVd0pljdUMiDcQ73l_6-qWdBU-vpVmfyY.mp4_ao8fln.mp4";
const DEFAULT_FAQ_VIDEO_POSTER =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/so_0,f_jpg/v1779410678/AQMrUqsC1EAA8GlbIFAZDVu6-ht6soI-4CdsM8PZk1CKBMR-zifgI0gV_KN38AMwncX7TQCVd0pljdUMiDcQ73l_6-qWdBU-vpVmfyY.mp4_ao8fln";

export const HERO_VIDEO = resolveAssetUrl(env("NEXT_PUBLIC_HERO_VIDEO", DEFAULT_HERO_VIDEO));
export const HERO_POSTER = resolveAssetUrl(env("NEXT_PUBLIC_HERO_POSTER", DEFAULT_HERO_POSTER));
export const OVERVIEW_VIDEO = resolveAssetUrl(
  env("NEXT_PUBLIC_OVERVIEW_VIDEO", DEFAULT_OVERVIEW_VIDEO)
);
export const OVERVIEW_POSTER = resolveAssetUrl(
  env("NEXT_PUBLIC_OVERVIEW_POSTER", DEFAULT_OVERVIEW_POSTER)
);
export const FAQ_VIDEO = resolveAssetUrl(env("NEXT_PUBLIC_FAQ_VIDEO", DEFAULT_FAQ_VIDEO));
export const FAQ_VIDEO_POSTER = resolveAssetUrl(
  env("NEXT_PUBLIC_FAQ_VIDEO_POSTER", DEFAULT_FAQ_VIDEO_POSTER)
);
