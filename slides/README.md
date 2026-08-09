# Slides microfrontend

Multiple [Slidev](https://sli.dev) decks, served under `/slides/<slug>/` on the same domain as the portfolio via [Vercel Microfrontends](https://vercel.com/docs/microfrontends).

## Add a deck

```bash
bun run create -- my-talk
```

That creates `slides/my-talk/slides.md`. After deploy it is available at `/slides/my-talk/`.

No other config changes are required for new decks — build discovers every directory that contains `slides.md`.

## Local commands

```bash
bun install
bun run dev -- intro      # http://localhost:3030/slides/intro/
bun run build            # static output → dist/slides/
bun run create -- <slug>
```

## Layout

```text
slides/
  intro/slides.md     # example deck
  <slug>/slides.md    # add more like this
  scripts/            # discover + build
  vercel.json         # static SPA rewrites
  dist/               # build output (gitignored)
```

## Vercel project

Create a second Vercel project from this same Git repo:

| Setting | Value |
| --- | --- |
| Root Directory | `slides` |
| Framework | Other |
| Install | `bun install` |
| Build | `bun run build` |
| Output | `dist` |

Project name should be `slides` (must match `microfrontends.json` in the portfolio app).
