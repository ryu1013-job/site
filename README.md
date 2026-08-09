# site

Personal portfolio ([Next.js](https://nextjs.org)) and Slidev decks on one domain via [Vercel Microfrontends](https://vercel.com/docs/microfrontends).

| App | Path | Vercel project | Root Directory |
| --- | --- | --- | --- |
| Portfolio (default) | `/` | `site` | `.` |
| Slides | `/slides/<slug>/` | `slides` | `slides` |

## Portfolio

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Slides

Decks live under `slides/<slug>/slides.md`. Adding a folder is enough — build discovers them automatically. All decks share `slides/theme` (tags like `<Kicker>`, `<Lead>`, `<Tag>`, `<Grid>`).

```bash
cd slides
bun install
bun run create -- my-talk
bun run dev -- my-talk
bun run build
```

See [`slides/README.md`](./slides/README.md).

## Microfrontends (local)

`microfrontends.json` routes `/slides` (+ nested paths) to the `slides` project. Portfolio is the default app.

```bash
# terminal 1 — local proxy (http://localhost:3024)
bun run proxy

# terminal 2 — portfolio (optional: also run a deck with slides:dev)
bun run dev
```

Requests to `/slides/*` fall back to production when the slides app is not running locally.

## Deploy on Vercel

1. Keep the existing **site** project pointed at the repo root.
2. Create a second project **slides** from the same repo with Root Directory `slides` (Other / static output `dist`).
3. Create a Microfrontends group, set **site** as the default app, add **slides**.
4. Deploy both. After `microfrontends.json` is live on **site**, `https://www.ryu.engineer/slides/intro/` is served by the slides project.
