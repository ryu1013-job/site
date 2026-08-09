# site

Personal portfolio ([Next.js](https://nextjs.org)) and Slidev decks on one domain. Ready for [Vercel Microfrontends](https://vercel.com/docs/microfrontends); until the `slides` project is attached, the portfolio build also publishes decks under `public/slides`.

| App | Path | Vercel project | Root Directory |
| --- | --- | --- | --- |
| Portfolio (default) | `/` | `site` | `.` |
| Slides | `/slides/<slug>/` | `slides` (optional for now) | `slides` |

## Portfolio

```bash
bun install
bun run slides:prepare   # builds decks → public/slides
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) and try `/slides/intro/`.

`bun run build` runs `slides:prepare` automatically (also on Vercel).

## Slides

Decks live under `slides/<slug>/slides.md`. Adding a folder is enough — build discovers them automatically. All decks share `slides/theme` (plain Markdown, oversized type).

```bash
cd slides
bun install
bun run create -- my-talk
bun run dev -- my-talk
bun run build
```

See [`slides/README.md`](./slides/README.md).

## Microfrontends (optional next step)

`microfrontends.json` is ready to route `/slides` to a separate `slides` project.

1. Create Vercel project **slides** (Root Directory `slides`, output `dist`).
2. Create a Microfrontends group: **site** = default, add **slides**.
3. Deploy both. Edge routing then serves `/slides/*` from the slides project instead of `public/slides`.

Local proxy while iterating on the portfolio alone:

```bash
bun run proxy   # :3024
bun run dev     # :3000
```
