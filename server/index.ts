import page from "@/index.html"
import robots from "../public/robots.txt" with { type: "text" }

import { app } from "@/server/app"
import { acceptDataLoss, dbPushRequested, listenOptions, serverUrls } from "@/server/lib/cli"
import { pool } from "@/server/lib/db"
import { installLogging, logRequest } from "@/server/lib/log"
import { MAX_BYTES } from "@/server/routes/upload"

if (dbPushRequested) {
  // Lazy: the zmodel toolchain is only needed here.
  const { dbPush } = await import("@/server/lib/db-push")
  const code = await dbPush({ acceptDataLoss })
  await pool.end()
  process.exit(code)
}

installLogging()

async function ready() {
  try {
    await pool.query("SELECT 1")
    return new Response("ok")
  } catch (error) {
    console.error("[readyz] database unavailable", error)
    return new Response("database unavailable", { status: 503 })
  }
}

async function handleApi(request: Request) {
  const start = performance.now()
  const response = await app.handle(request)
  logRequest({
    method: request.method,
    path: new URL(request.url).pathname,
    status: response.status,
    ms: Math.round(performance.now() - start),
  })
  return response
}

const server = Bun.serve({
  ...listenOptions(),
  // Room for the multipart envelope, so the upload route can answer oversized files itself.
  maxRequestBodySize: MAX_BYTES + 1024 * 1024,
  development: process.env.NODE_ENV !== "production",
  routes: {
    "/healthz": new Response("ok"),
    "/readyz": ready,
    "/robots.txt": new Response(robots),
    "/api/*": handleApi,
    "/uploads/*": handleApi,
    "/*": page,
  },
})

for (const url of serverUrls(server.url)) console.log(`Listening on ${url}`)

async function shutdown() {
  await server.stop()
  await pool.end()
  process.exit(0)
}
process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
