# AGENTS.md

One Bun process serves a React client and an Elysia API. Setup, endpoints and upload configuration are in [README.md](README.md).

## Stack

Bun, Elysia, React 19, better-auth (with API keys), ZenStack on Postgres, Tailwind 4, shadcn (`base-vega` style on Base UI, so components take a `render` prop rather than `asChild`).

## Commands

```bash
bun run dev           # server with hot reload, http://localhost:3000
bun run typecheck     # client and server
bun run lint
bun run format
bun run build         # compiles client and server into ./run-server
bun run db:generate   # regenerates zenstack/*.ts from schema.zmodel
bun run db:push       # applies the schema to the database in DATABASE_URL
```

Server flags (`--ssl`, `--db-push`, `--port` and others) are defined in `server/lib/cli.ts` and listed in the README. Keep flag and listen logic there, not in `server/index.ts`.

There is no test suite. Verify changes with typecheck, lint, and by exercising the running app.

## Layout

- `server/index.ts`: `Bun.serve` routes, health checks, shutdown
- `server/app.ts`: Elysia app, error mapping, OpenAPI, route registration
- `server/routes/`: `execute.ts` (generic ORM endpoint), `upload.ts`
- `server/plugins/session.ts`: mounts better-auth and adds the `auth: true` route option
- `server/lib/`: auth, db, errors, logging, rate limiting, storage
- `src/`: React client; `src/lib/api.ts` is its API layer
- `src/router.tsx`: client routes. Paths can't start with `/api` or `/uploads`, which go to Elysia
- `src/pages/`: thin route components; `src/features/<name>/`: the components behind them, including the app shell and settings dialog
- `zenstack/schema.zmodel`: data models and access policies

## Rules

- **Data access**: use `authDb.$setAuth(user)` for anything user-driven. `db` bypasses access policies and is only for better-auth and trusted server code.
- **`/api/execute`**: serves only models in the `MODELS` set in `server/routes/execute.ts`. Never add the auth tables (session, account, verification, apikey).
- **Generated code**: never hand-edit `zenstack/schema.ts`, `models.ts` or `input.ts`. Edit `schema.zmodel`, then run `bun run db:generate`.
- **Responses**: success is `{ data }`; failure is `errorBody(code, message)` from `server/lib/errors.ts`.
- **Routes**: `.use(session)`, set `auth: true` on protected routes, rate-limit with `allow()`, and register the route in `server/app.ts`. A new top-level path prefix also needs an entry in `server/index.ts`, which only forwards `/api/*` and `/uploads/*` to Elysia.
- **Client**: call the API through `src/lib/api.ts` (`db.<model>.<op>`, `api.*`), never raw `fetch`. Auth goes through `src/lib/auth-client.ts`.
- **Uploads**: keep SVG and HTML out of the type allowlist, since they would run scripts on this origin. Keep the `KEY` format check on every key taken from a request.
- **Style**: Prettier (no semicolons, double quotes). Import with the `@/` aliases (`@/server/*`, `@/zenstack/*`). Comments explain why, not what.

## Gotchas

- Vite is gone; don't reintroduce it. Tailwind runs through `bun-plugin-tailwind`, set in `bunfig.toml` for dev and `build.ts` for builds.
- `server/lib/db.ts` keeps the pool on `globalThis` so it survives `bun --hot` reloads.
- `PRISMA` in `server/lib/db-push.ts` must match the `prisma` version that `@zenstackhq/cli` depends on, and `@zenstackhq/language` and `@zenstackhq/sdk` are pinned to the CLI's version. Update them together.
- `bun add` fails on the `bun` package's postinstall and saves nothing to `package.json`. Use `bun add --ignore-scripts`.
- Rate limits are in memory, so they apply per process.
- Don't commit `run-server`, `.env`, `uploads`, or tool state (`.swarm`, `.claude-flow`, `ruvector.db`).

## Known drift

Comments in `src/lib/api.ts` mention `apps/api` and `POST /execute`, and its `ApiErrorCode` lists codes the server doesn't emit. Trust `server/lib/errors.ts` and `server/routes/execute.ts`.
