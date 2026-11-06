import { createBrowserRouter, Navigate, useRouteError } from "react-router"

import { AppLayout } from "@/features/shell/app-layout"
import type { TKey } from "@/i18n"
import { DashboardPage } from "@/pages/dashboard"
import { FilesPage } from "@/pages/files"
import { NotFoundPage } from "@/pages/not-found"
import { SignInPage } from "@/pages/sign-in"

/** Read by the shell's breadcrumb. */
export type RouteHandle = { title: TKey }

// The router would otherwise swallow render errors before the app's ErrorBoundary sees them.
function Rethrow(): never {
  throw useRouteError()
}

// Client paths can't start with /api or /uploads: server/index.ts sends those to Elysia.
export const router = createBrowserRouter([
  {
    errorElement: <Rethrow />,
    children: [
      { path: "/sign-in", element: <SignInPage /> },
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          {
            path: "/dashboard",
            element: <DashboardPage />,
            handle: { title: "nav.dashboard" } satisfies RouteHandle,
          },
          {
            path: "/files",
            element: <FilesPage />,
            handle: { title: "nav.files" } satisfies RouteHandle,
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])
