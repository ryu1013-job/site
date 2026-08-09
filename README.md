# site

Personal portfolio for [ryu](https://www.ryu.engineer/) — [Next.js](https://nextjs.org) App Router site with [Slidev](https://sli.dev) decks, composed as [Vercel Microfrontends](https://vercel.com/docs/microfrontends).

## Apps

| App | Path | Vercel project | Root Directory |
| --- | --- | --- | --- |
| Portfolio (default) | `/` | `site` | `.` |
| Slides | `/slides/<slug>/` | `slides` | `slides` |

Routing is defined in [`microfrontends.json`](./microfrontends.json). Until the Microfrontends group is attached, `slides:prepare` copies built decks into `public/slides` so preview URLs still work.

## Stack

- **Site:** Next.js 16, React 19, Tailwind CSS v4, MDX
- **Slides:** Slidev (separate Bun workspace under `slides/`)
- **Package manager:** [Bun](https://bun.sh)

## Local development

```bash
bun install
bun run slides:prepare   # build decks → public/slides
bun run dev              # http://localhost:3000
```

### Optional: Microfrontends local proxy

```bash
bun run proxy            # :3024
bun run slides:dev -- intro
```

### Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Next.js dev server (port 3000) |
| `bun run build` | Prepare slides, then production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Lint with oxlint |
| `bun run fmt` / `fmt:check` | Format / check with oxfmt |
| `bun run slides:prepare` | Install, build, and sync slides into `public/slides` |
| `bun run slides:create -- <slug>` | Scaffold a new Slidev deck |
| `bun run slides:dev -- <slug>` | Dev server for one deck |
| `bun run proxy` | Local Microfrontends proxy |

## Slides

```bash
bun run slides:create -- my-talk
bun run slides:dev -- my-talk
```

See [`slides/README.md`](./slides/README.md) for deck conventions, styling, and the slides project’s Vercel settings.

## Vercel setup (Microfrontends)

Required so `/slides/*` is served by the slides project.

1. Create a second project **slides** from this repo:
   - Root Directory: `slides`
   - Framework: Other
   - Install: `bun install`
   - Build: `bun run build`
   - Output: `dist`
2. Team Settings → Microfrontends → Create Group
   - Default app: **site**
   - Add **slides**
3. Deploy both projects. After `microfrontends.json` is live on **site**, `/slides/*` routes to the slides project.
