/**
 * Resolve public/ asset paths against Vite's configured BASE_URL so the app
 * works both at domain root ('/') and under subpaths (e.g. GitHub Pages).
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (normalizedBase !== '/' && path.startsWith(normalizedBase)) {
    return path;
  }
  return `${normalizedBase}${clean}`;
}
