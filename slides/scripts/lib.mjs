import { access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const slidesRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set([
  'node_modules',
  'dist',
  'scripts',
  '.vercel',
  '.git',
  '.turbo',
]);

export async function discoverDecks(root = slidesRoot) {
  const entries = await readdir(root, { withFileTypes: true });
  const decks = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP_DIRS.has(entry.name) || entry.name.startsWith('.')) {
      continue;
    }

    const entryFile = path.join(root, entry.name, 'slides.md');
    try {
      await access(entryFile);
      decks.push({
        slug: entry.name,
        entryFile,
        dir: path.join(root, entry.name),
      });
    } catch {
      // not a deck
    }
  }

  return decks.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function publicBase(slug) {
  return `/slides/${slug}/`;
}

export function outDir(slug, root = slidesRoot) {
  return path.join(root, 'dist', 'slides', slug);
}
