import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AppNavigation from "./AppNavigation";

export default function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="py-3 text-center font-bold">CReeMe Pro</div>
      </SidebarHeader>
      <SidebarContent>
        <AppNavigation />
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
