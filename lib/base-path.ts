/**
 * Subdirectory deploys (e.g. sftrainings.org/iso-14001-2026-transition/) need a base path.
 * Set NEXT_PUBLIC_BASE_PATH=/iso-14001-2026-transition at build time.
 */
export function getBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
}

/** Prefix a site-root path with the deploy base path */
export function withBasePath(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
