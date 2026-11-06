import { Link, useLocation } from "react-router"
import { FolderIcon, LayoutDashboardIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useT, type TKey } from "@/i18n"

const ITEMS: { title: TKey; to: string; icon: typeof FolderIcon }[] = [
  { title: "nav.dashboard", to: "/dashboard", icon: LayoutDashboardIcon },
  { title: "nav.files", to: "/files", icon: FolderIcon },
]

export function NavMain() {
  const t = useT()
  const { pathname } = useLocation()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("nav.platform")}</SidebarGroupLabel>
      <SidebarMenu>
        {ITEMS.map(({ title, to, icon: Icon }) => (
          <SidebarMenuItem key={to}>
            <SidebarMenuButton
              tooltip={t(title)}
              isActive={pathname === to || pathname.startsWith(`${to}/`)}
              // The mobile sidebar is a sheet that would otherwise cover the new page.
              onClick={() => setOpenMobile(false)}
              render={<Link to={to} />}
            >
              <Icon />
              <span>{t(title)}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
