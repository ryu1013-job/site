# site

Personal portfolio ([Next.js](https://nextjs.org)) + Slidev decks as [Vercel Microfrontends](https://vercel.com/docs/microfrontends).

| App | Path | Vercel project | Root Directory |
| --- | --- | --- | --- |
| Portfolio (default) | `/` | `site` | `.` |
| Slides | `/slides/<slug>/` | `slides` | `slides` |

## Setup on Vercel (required for Microfrontends)

1. Create a second project **slides** from this repo  
   - Root Directory: `slides`  
   - Framework: Other  
   - Install: `bun install`  
   - Build: `bun run build`  
   - Output: `dist`
2. Team Settings → Microfrontends → Create Group  
   - default app: **site**  
   - add **slides**
3. Deploy both projects. After `microfrontends.json` is live on **site**, `/slides/*` is routed to the slides project.

Until the group is attached, the site build also copies decks into `public/slides` so preview URLs still work.

## Local

```bash
bun install
bun run slides:prepare
bun run dev

# optional: MFE local proxy
bun run proxy          # :3024
bun run slides:dev -- intro
```

## Slides

```bash
bun run slides:create -- my-talk
bun run slides:dev -- my-talk
```

See [`slides/README.md`](./slides/README.md).
