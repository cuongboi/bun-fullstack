import { Navigate, Outlet, useMatches } from "react-router"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/features/shell/app-sidebar"
import { useT } from "@/i18n"
import { authClient } from "@/lib/auth-client"
import type { RouteHandle } from "@/router"

/** The signed-in frame: redirects guests, and renders the matched page in the inset. */
export function AppLayout() {
  const t = useT()
  const { data, isPending } = authClient.useSession()
  const handle = useMatches().at(-1)?.handle as RouteHandle | undefined

  if (isPending) return null
  if (!data) return <Navigate to="/sign-in" replace />

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar user={data.user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{handle && t(handle.title)}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
