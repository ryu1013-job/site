# Slides microfrontend

Multiple [Slidev](https://sli.dev) decks under `/slides/<slug>/`, sharing one local theme (`theme/`).

## Add a deck

```bash
bun run create -- my-talk
```

Creates `slides/my-talk/slides.md` with `theme: ../theme`. After deploy: `/slides/my-talk/`.

## Shared style

All decks use `slides/theme` (`slidev-theme-ryu`).

Write normal Markdown, or these tags:

| Tag | Role |
| --- | --- |
| `<Kicker>` | small uppercase label |
| `<Lead>` | supporting sentence under a title |
| `<Tag>` | keyword chip |
| `<Note type="tip\|warn\|note">` | callout |
| `<Grid cols="2\|3">` + `<Item title="...">` | content grid |
| `<Steps>` | numbered steps (`<li>`) |
| `<Split>` | two columns |

Layouts (frontmatter): `cover` · `section` · `default` · `center` · `end`

Change look once in `theme/styles/` and every deck updates.

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
