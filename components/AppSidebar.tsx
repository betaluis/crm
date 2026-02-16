import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Building2, Users } from "lucide-react";
import Link from "next/link";

const iconMap = {
  LayoutDashboard,
  Building2,
  Users,
};

const data = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Companies",
    url: "/companies",
    icon: "Building2",
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: "Users",
  },
];

export default function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="py-3 text-center font-bold">CReeMe Pro</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {data.map(({ title, url, icon }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            return (
              <SidebarMenuItem key={title} className="">
                <SidebarMenuButton
                  asChild
                  className="hover:bg-sidebar-border hover:text-sidebar-foreground cursor-pointer rounded-none"
                >
                  <Link href={url} className="flex gap-3">
                    {Icon && <Icon className="h-4 w-4" />}
                    {title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Username</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
