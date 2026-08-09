# Slides microfrontend

[Slidev](https://sli.dev) decks for the `slides` Vercel project (Root Directory `slides`).

Routed at `/slides/<slug>/` via the site's `microfrontends.json`.

## Add a deck

```bash
bun run create -- my-talk
```

## Style

Plain Markdown only.

| Element | Font |
| --- | --- |
| `h*`, `p` | Noto Serif JP |
| `span`, `li` | Noto Sans JP |
| `code` | Geist Mono |

Layouts: `cover` · `section` · `default` · `end`

## Commands

```bash
bun install
bun run dev -- intro
bun run build
bun run create -- <slug>
```

## Vercel

| Setting | Value |
| --- | --- |
| Project name | `slides` |
| Root Directory | `slides` |
| Install | `bun install` |
| Build | `bun run build` |
| Output | `dist` |
