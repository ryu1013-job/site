#!/usr/bin/env bun
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slidesDir = path.join(root, 'slides');

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      env: process.env,
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`));
    });
  });
}

const bun = process.execPath.includes('bun') ? process.execPath : 'bun';

await run(bun, ['install', '--frozen-lockfile'], slidesDir);
await run(bun, ['run', 'build'], slidesDir);
await run(bun, ['scripts/sync-slides-public.mjs'], root);
