#!/usr/bin/env bun
import { cp, mkdir, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slidesDir = path.join(root, 'slides');
const from = path.join(slidesDir, 'dist', 'slides');
const to = path.join(root, 'public', 'slides');
const bun = process.execPath.includes('bun') ? process.execPath : 'bun';

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', env: process.env });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`));
    });
  });
}

await run(bun, ['install', '--frozen-lockfile'], slidesDir);
await run(bun, ['run', 'build'], slidesDir);
await rm(to, { recursive: true, force: true });
await mkdir(path.dirname(to), { recursive: true });
await cp(from, to, { recursive: true });
console.log(`✔ synced ${from} → ${to}`);
