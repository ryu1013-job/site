# site

Personal portfolio ([Next.js](https://nextjs.org)) with Slidev decks at `/slides/<slug>/`.

## Portfolio

```bash
bun install
bun run slides:prepare   # builds decks → public/slides
bun run dev
```

`bun run build` runs `slides:prepare` automatically.

## Slides

Decks live under `slides/<slug>/slides.md`. Shared theme: plain Markdown, oversized type.

```bash
bun run slides:create -- my-talk
bun run slides:dev -- my-talk
```

See [`slides/README.md`](./slides/README.md).
