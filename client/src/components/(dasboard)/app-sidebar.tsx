"use client";

import * as React from "react";
import {
  AudioWaveform,
  Clapperboard,
  Command,
  Film,
  GalleryVerticalEnd,
  LayoutDashboard,
  Tickets,
  TvMinimalPlay,
} from "lucide-react";

import { NavMain } from "@/components//(dasboard)/nav-main";
import { NavUser } from "@/components/(dasboard)/nav-user";
import { TeamSwitcher } from "@/components/(dasboard)/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý phim",
      url: "/dashboard/movie",
      icon: Film,
    },
    {
      title: "Quản lý lịch chiếu",
      url: "/dashboard/showtime",
      icon: Clapperboard,
    },

    {
      title: "Quản lý phòng chiếu",
      url: "/dashboard/room",
      icon: TvMinimalPlay,
      
    },
    {
      title: "Quản lý vé",
      url: "/dashboard/ticket",
      icon: Tickets,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
