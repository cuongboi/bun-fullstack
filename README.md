# fullstack-elysia

One Bun server for a React client and an Elysia API, with better-auth, ZenStack on Postgres, and file uploads.

## Setup

```bash
bun install
cp .env.example .env      # set DATABASE_URL and BETTER_AUTH_SECRET
createdb fullstack_elysia
bun run db:generate
bun run db:push
bun run dev               # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `bun run dev` | Runs the server with hot reload |
| `bun run build` | Compiles client and server into `./run-server` |
| `bun run start` | Runs the server in production mode without compiling |
| `bun run typecheck` | Type-checks the client and server |
| `bun run db:generate` | Regenerates `zenstack/*.ts` from `schema.zmodel` |
| `bun run db:push` | Applies the schema to the database |

## Server flags

Pass these to `bun run dev`, `bun run start` or `./run-server`. `--help` lists them all.

| Flag | What it does |
| --- | --- |
| `-p`, `--port` | Port to listen on (default `PORT`, then 3000) |
| `-H`, `--host` | Host to listen on (default `HOST`, then `0.0.0.0`) |
| `-s`, `--ssl` | Serves HTTPS with a local mkcert certificate, created in `certs/local` if missing. Change it with `--cert`, `--key` and `--domain` |
| `--db-push` | Applies the schema to the database, then exits. Works from the compiled executable |
| `--accept-data-loss` | With `--db-push`, allows destructive schema changes |

## Endpoints

| Path | Purpose |
| --- | --- |
| `/healthz`, `/readyz` | Liveness, and readiness including the database |
| `/api/docs` | API reference (spec at `/api/docs/json`) |
| `/api/auth/*` | better-auth (`Auth` tag) |
| `POST /api/execute` | ORM calls under the caller's access policies (`Data` tag) |
| `POST /api/uploads`, `DELETE /api/uploads/:key` | Upload and delete your files (`Uploads` tag) |
| `POST /api/uploads/presign`, `POST /api/uploads/complete` | Direct-to-S3 upload: get a presigned URL, then confirm (`Uploads` tag) |
| `GET /api/config` | Public client settings, such as the Sentry DSN (`Config` tag) |
| `GET /uploads/:key` | Public read, by unguessable key |

## Uploads

Set `STORAGE_ADAPTER` to `local` (writes to `UPLOAD_DIR`) or `s3` (needs the `S3_*` variables in `.env.example`; set `S3_ENDPOINT` for services other than AWS). Files are limited by `UPLOAD_MAX_BYTES` and to PNG, JPEG, WebP, GIF, PDF and plain text.

With `s3`, `api.upload` asks for a presigned URL, PUTs the file straight to the bucket, then calls `/api/uploads/complete`, which checks the stored size. The bucket needs a CORS rule allowing `PUT` and the `Content-Type` header from your origin.

## Adding UI components

```bash
bunx shadcn@latest add button
```
