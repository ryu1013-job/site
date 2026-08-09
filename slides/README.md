# Slides microfrontend

Multiple [Slidev](https://sli.dev) decks under `/slides/<slug>/`, sharing one minimal theme (`theme/`).

## Add a deck

```bash
bun run create -- my-talk
```

Creates `slides/my-talk/slides.md` with `theme: ../theme`. After deploy: `/slides/my-talk/`.

## Style

Plain Markdown only. No custom Vue components.

| Element | Font |
| --- | --- |
| `h*`, `p` | Noto Serif JP |
| `span`, `li` | Noto Sans JP |
| `code` | Geist Mono |

Layouts (frontmatter): `cover` · `section` · `default` · `center` · `end`

Edit `theme/styles/` to change every deck at once.

## Local commands

```bash
bun install
bun run dev -- intro
bun run build
bun run create -- <slug>
```

## Vercel project

| Setting | Value |
| --- | --- |
| Root Directory | `slides` |
| Framework | Other |
| Install | `bun install` |
| Build | `bun run build` |
| Output | `dist` |

Project name should be `slides` (matches portfolio `microfrontends.json`).
