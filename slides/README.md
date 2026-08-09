# Slides microfrontend

Multiple [Slidev](https://sli.dev) decks under `/slides/<slug>/`, sharing one local theme (`theme/`).

## Add a deck

```bash
bun run create -- my-talk
```

Creates `slides/my-talk/slides.md` with `theme: ../theme`. After deploy: `/slides/my-talk/`.

## Shared style

All decks use `slides/theme`, with portfolio fonts (Goudy + Noto Serif JP body, Geist UI) and [Vercel design.md](https://vercel.com/design.md) restraint.

Write normal Markdown, or these tags:

| Tag | Role |
| --- | --- |
| `<Kicker>` | quiet metadata line (sentence case) |
| `<Lead>` | supporting sentence under a title |
| `<Tag>` | mono keyword, not a pill |
| `<Note type="tip\|warn\|note">` | callout with left rule |
| `<Grid cols="2\|3">` + `<Item title="...">` | peer columns |
| `<Steps>` | numbered steps |
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
