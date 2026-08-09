#!/usr/bin/env bun
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { discoverDecks, outDir, publicBase, slidesRoot } from './lib.mjs';

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...opts,
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`));
    });
  });
}

function slidevBin() {
  return path.join(slidesRoot, 'node_modules', '.bin', 'slidev');
}

async function buildDeck(deck) {
  const base = publicBase(deck.slug);
  const out = outDir(deck.slug);
  await mkdir(path.dirname(out), { recursive: true });
  console.log(`\n▶ building ${deck.slug} → ${base}`);
  // Absolute --out keeps all decks under slides/dist regardless of entry location.
  await run(slidevBin(), [
    'build',
    deck.entryFile,
    '--base',
    base,
    '--out',
    out,
  ]);
}

function renderIndex(decks) {
  const links = decks
    .map(
      (d) =>
        `    <li><a href="/slides/${d.slug}/"><code>${d.slug}</code></a></li>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Slides</title>
    <style>
      :root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
      main { width: min(36rem, 100%); }
      h1 { font-size: 1.5rem; margin: 0 0 0.5rem; }
      p { opacity: 0.7; margin: 0 0 1.25rem; }
      ul { margin: 0; padding-left: 1.25rem; line-height: 1.9; }
      a { color: inherit; }
      code { font-size: 0.95em; }
    </style>
  </head>
  <body>
    <main>
      <h1>Slides</h1>
      <p>Published decks on this domain.</p>
      <ul>
${links || '    <li><em>No decks yet. Add slides/&lt;slug&gt;/slides.md</em></li>'}
      </ul>
    </main>
  </body>
</html>
`;
}

const decks = await discoverDecks();
const distRoot = path.join(slidesRoot, 'dist');

await rm(distRoot, { recursive: true, force: true });
await mkdir(path.join(distRoot, 'slides'), { recursive: true });

if (decks.length === 0) {
  console.warn('No decks found under slides/*/slides.md');
} else {
  for (const deck of decks) {
    await buildDeck(deck);
  }
}

await writeFile(path.join(distRoot, 'slides', 'index.html'), renderIndex(decks));
console.log(`\n✔ built ${decks.length} deck(s) → dist/slides/`);
