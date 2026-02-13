import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"

const data = [
    {
        title: "menu-item-1",
        url: "https://menu-item-1.com",
    },
    {
        title: "menu-item-2",
        url: "https://menu-item-2.com",
    },
    {
        title: "menu-item-3",
        url: "https://menu-item-3.com",
    },
]

export default function AppSidebar() {
    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <div className="font-bold text-center py-3">CReeM Pro</div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {data.map(({ title, url }) => (
                        <SidebarMenuItem key={title} className="hover:bg-sidebar-border">
                            <SidebarMenuButton className="hover:bg-transparent hover:text-sidebar-foreground">
                                <a href={url}>
                                    {title}
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            Username
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
