#!/usr/bin/env bun
import path from 'node:path';
import { spawn } from 'node:child_process';
import { discoverDecks, publicBase, slidesRoot } from './lib.mjs';

const slug = process.argv[2];
const port = process.env.PORT || process.env.SLIDES_PORT || '3030';

if (!slug) {
  const decks = await discoverDecks();
  console.error('Usage: bun run dev -- <slug>');
  if (decks.length) {
    console.error(`Available: ${decks.map((d) => d.slug).join(', ')}`);
  } else {
    console.error('No decks found. Create one with: bun run create -- <slug>');
  }
  process.exit(1);
}

const decks = await discoverDecks();
const deck = decks.find((d) => d.slug === slug);
if (!deck) {
  console.error(`Unknown slug: ${slug}`);
  console.error(`Available: ${decks.map((d) => d.slug).join(', ') || '(none)'}`);
  process.exit(1);
}

const slidev = path.join(slidesRoot, 'node_modules', '.bin', 'slidev');
const base = publicBase(slug);

console.log(`▶ slidev ${slug} on :${port} (base ${base})`);

const child = spawn(
  slidev,
  [deck.entryFile, '--port', String(port), '--base', base, '--open'],
  { stdio: 'inherit', shell: process.platform === 'win32' },
);

child.on('exit', (code) => process.exit(code ?? 0));
