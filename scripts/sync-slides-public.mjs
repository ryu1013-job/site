#!/usr/bin/env bun
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const from = path.join(root, 'slides', 'dist', 'slides');
const to = path.join(root, 'public', 'slides');

await rm(to, { recursive: true, force: true });
await mkdir(path.dirname(to), { recursive: true });
await cp(from, to, { recursive: true });
console.log(`✔ synced ${from} → ${to}`);
