import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Dna, Home, UserCircle, Trophy } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api-client";
import type { ModuleSummary } from "@shared/types";
export function AppSidebar(): JSX.Element {
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { moduleId } = useParams();
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const fetchedModules = await api<ModuleSummary[]>('/api/modules');
        setModules(fetchedModules);
      } catch (error) {
        console.error("Failed to fetch modules for sidebar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);
  return (
    <Sidebar>
      <SidebarHeader>
        <NavLink to="/" className="flex items-center gap-2 px-2 py-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <Dna className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-display tracking-wide">HelixScope</span>
        </NavLink>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/"><Home /> <span>Dashboard</span></NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/leaderboard"><Trophy /> <span>Leaderboard</span></NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">Modules</span>
          </SidebarMenuItem>
          {loading ? (
            <>
              <Skeleton className="h-8 mx-4 my-2 rounded-md" />
              <Skeleton className="h-8 mx-4 my-2 rounded-md" />
              <Skeleton className="h-8 mx-4 my-2 rounded-md" />
              <Skeleton className="h-8 mx-4 my-2 rounded-md" />
              <Skeleton className="h-8 mx-4 my-2 rounded-md" />
              <Skeleton className="h-8 mx-4 my-2 rounded-md" />
            </>
          ) : (
            modules.map((module) => (
              <SidebarMenuItem key={module.id}>
                <SidebarMenuButton asChild isActive={moduleId === module.id}>
                  <NavLink
                    to={`/module/${module.id}`}
                    className="[&.active]:bg-brand-vibrant-green/10 [&.active]:text-brand-vibrant-green"
                  >
                    <Dna /> <span>{module.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/profile"><UserCircle /> <span>Profile</span></NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}