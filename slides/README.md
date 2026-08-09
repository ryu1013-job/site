# Slides

[Slidev](https://sli.dev) decks under `/slides/<slug>/`, with one shared theme.

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
