"use client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { LayoutDashboard, Building2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap = {
  LayoutDashboard,
  Building2,
  Users,
};

type MenuItem = {
  title: string;
  url: string;
  icon: keyof typeof iconMap;
};

const menuData: MenuItem[] = [
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

export default function AppNavigation() {
  const path = usePathname();
  return (
    <SidebarMenu>
      {menuData.map(({ title, url, icon }) => {
        const Icon = iconMap[icon as keyof typeof iconMap];
        const active = url === path;
        return (
          <SidebarMenuItem key={title} className="">
            <SidebarMenuButton
              isActive={active}
              asChild
              className={`${active ? "" : "hover:bg-sidebar-border hover:text-sidebar-foreground focus-visible:bg-sidebar-border"} cursor-default rounded-none focus-visible:ring-0`}
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
  );
}
