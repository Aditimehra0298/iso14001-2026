/**
 * Upload public/videos/*.mp4 to Cloudinary (folder: iso14001-modules).
 *
 * Requires .env.local:
 *   CLOUDINARY_CLOUD_NAME=dwnnakrrh
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 *
 * Run: npm run upload-videos
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const videosDir = join(root, "public", "videos");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    const val = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dwnnakrrh";
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error(
    "Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in .env.local\n" +
      "Get keys from: https://console.cloudinary.com/settings/api-keys"
  );
  process.exit(1);
}

const FILES = [
  "module-01.mp4",
  "module-02.mp4",
  "module-03.mp4",
  "module-04.mp4",
  "module-04-part2.mp4",
  "module-05.mp4",
  "module-06.mp4",
  "module-07.mp4",
  "module-08.mp4",
  "module-09.mp4",
];

function signParams(params, secret) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const sig = createHash("sha1").update(sorted + secret).digest("hex");
  return sig;
}

async function upload(filePath, publicId) {
  const file = readFileSync(filePath);
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    timestamp: String(timestamp),
    public_id: publicId,
    resource_type: "video",
    overwrite: "true",
  };
  const signature = signParams(params, apiSecret);
  const body = new FormData();
  body.append("file", new Blob([file]), filePath.split("/").pop());
  body.append("api_key", apiKey);
  body.append("timestamp", params.timestamp);
  body.append("public_id", publicId);
  body.append("resource_type", "video");
  body.append("overwrite", "true");
  body.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
    { method: "POST", body }
  );
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || JSON.stringify(json));
  }
  return json.secure_url;
}

async function main() {
  console.log(`Uploading to Cloudinary (${cloudName})…\n`);
  for (const name of FILES) {
    const path = join(videosDir, name);
    if (!existsSync(path)) {
      console.warn(`Skip (missing): ${name}`);
      continue;
    }
    const publicId = `iso14001-modules/${name.replace(/\.mp4$/, "")}`;
    process.stdout.write(`${name} → ${publicId} … `);
    try {
      const url = await upload(path, publicId);
      console.log("OK");
      console.log(`  ${url}\n`);
    } catch (e) {
      console.log("FAILED");
      console.error(`  ${e.message}\n`);
    }
  }
  console.log("Done. Redeploy Vercel after uploads complete.");
}

main();
