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
theme: ../theme
title: ${slug}
---

---
layout: cover
---

# ${slug}

One short line.

---

# Points

- One
- Two

---
layout: end
---

# Thanks
`;

await mkdir(dir, { recursive: true });
await writeFile(entry, template);
console.log(`Created slides/${slug}/slides.md`);
console.log(`Dev:  bun run dev -- ${slug}`);
console.log(`URL:  /slides/${slug}/`);
