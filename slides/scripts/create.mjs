#!/usr/bin/env bun
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { slidesRoot } from './lib.mjs';

const slug = process.argv[2];

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: bun run create <slug>');
  console.error('Slug must be lowercase kebab-case (e.g. intro, team-offsite).');
  process.exit(1);
}

const dir = path.join(slidesRoot, slug);
const entry = path.join(dir, 'slides.md');

try {
  await access(entry);
  console.error(`Deck already exists: ${slug}`);
  process.exit(1);
} catch {
  // ok
}

const template = `---
theme: default
title: ${slug}
info: |
  Add a short description.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# ${slug}

Edit \`slides/${slug}/slides.md\`

---

# Next slide

- Bullet one
- Bullet two
`;

await mkdir(dir, { recursive: true });
await writeFile(entry, template);
console.log(`Created slides/${slug}/slides.md`);
console.log(`Dev:  bun run dev -- ${slug}`);
console.log(`URL:  /slides/${slug}/`);
