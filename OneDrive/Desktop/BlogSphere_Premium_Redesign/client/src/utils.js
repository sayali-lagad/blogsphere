// Small presentational helpers — purely UI, no backend/data changes.

export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function readingTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// Deterministic gradient variant so the same author always gets the same
// avatar colorway across the site.
const AVATAR_VARIANTS = ['grad-a', 'grad-b', 'grad-c', 'grad-d'];

export function avatarVariant(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return AVATAR_VARIANTS[hash % AVATAR_VARIANTS.length];
}
