import type { ReactNode } from "react";

import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Breadcrumb } from "@/widgets/breadcrumb";
import { useMobileNav } from "./lib/use-mobile-nav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { open, onOpenChange } = useMobileNav();

  return (
    <div className="flex h-svh w-full gap-4 overflow-hidden bg-wash p-3 md:p-5">
      <Sidebar mobileOpen={open} onMobileOpenChange={onOpenChange} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
        <Header onOpenMobileNav={() => onOpenChange(true)} />
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
};

export { DashboardLayout };
