import { AppSidebar } from "@/components/(dasboard)/app-sidebar";
import AnimationWrapper from "@/components/animation-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimationWrapper>

    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar variant="inset" />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
    </AnimationWrapper>
  );
}
