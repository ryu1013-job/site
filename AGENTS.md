<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Personal portfolio site (Next.js 16, App Router, React 19, Tailwind v4). No automated test suite exists.

- Package manager is **Bun** (see `bun.lockb`); it is installed at `~/.bun/bin` and on `PATH` via `~/.bashrc`. Use `bun run <script>` (scripts defined in `package.json`).
- Dev server: `bun run dev` serves on port 3000 (Next.js + Turbopack). It is the primary way to run the app.
- Lint is `bun run lint` (oxlint) and format is `bun run fmt` / `bun run fmt:check` (oxfmt). The repo currently has pre-existing lint errors and many `fmt:check` differences, so a fully clean run is not expected out of the box — don't treat those as regressions from your changes.
- `bun run build` runs a production build (also type-checks). Use `bun install --frozen-lockfile` to install without rewriting `bun.lockb`.
