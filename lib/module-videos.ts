/**
 * Curriculum module videos are served from Cloudinary in production (Vercel).
 * Local MP4s in public/videos/ are used only when Cloudinary is not configured.
 *
 * Upload once: npm run upload-videos (requires Cloudinary API keys in .env.local)
 * Or upload manually to folder public_id prefix: iso14001-modules/
 */

const CLOUD_NAME = "dwnnakrrh";
const CLOUDINARY_TRANSFORM = "q_auto:good,f_mp4";

/** filename → Cloudinary public_id (folder/name, no extension) */
const MODULE_PUBLIC_IDS: Record<string, string> = {
  "module-01.mp4": "iso14001-modules/module-01",
  "module-02.mp4": "iso14001-modules/module-02",
  "module-03.mp4": "iso14001-modules/module-03",
  "module-04.mp4": "iso14001-modules/module-04",
  "module-04-part2.mp4": "iso14001-modules/module-04-part2",
  "module-05.mp4": "iso14001-modules/module-05",
  "module-06.mp4": "iso14001-modules/module-06",
  "module-07.mp4": "iso14001-modules/module-07",
  "module-08.mp4": "iso14001-modules/module-08",
  "module-09.mp4": "iso14001-modules/module-09",
};

function cloudinaryVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${CLOUDINARY_TRANSFORM}/${publicId}`;
}

/** Use Cloudinary on Vercel/production; local /videos/ in dev unless forced */
function useCloudinaryVideos(): boolean {
  if (process.env.NEXT_PUBLIC_USE_LOCAL_MODULE_VIDEOS === "true") return false;
  if (process.env.NEXT_PUBLIC_USE_CLOUDINARY_MODULE_VIDEOS === "true") return true;
  return process.env.NODE_ENV === "production";
}

/**
 * Resolve a module video path (e.g. "/videos/module-01.mp4") to a playable URL.
 */
export function moduleVideoUrl(path: string): string {
  const filename = path.replace(/^\/videos\//, "").replace(/^\//, "");
  const publicId = MODULE_PUBLIC_IDS[filename];

  if (publicId && useCloudinaryVideos()) {
    return cloudinaryVideoUrl(publicId);
  }

  return path.startsWith("/") ? path : `/videos/${filename}`;
}
