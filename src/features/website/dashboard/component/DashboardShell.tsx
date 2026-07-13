import type { ReactNode } from "react";

import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

export function DashboardShell({
  activeHref,
  title,
  children,
}: {
  activeHref: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[var(--home-green-deep)]">
      <DashboardSidebar activeHref={activeHref} />
      <DashboardTopbar title={title} />
      <section className="px-5 py-6 sm:px-8 lg:ml-[220px] lg:px-6 xl:px-8">
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </section>
    </main>
  );
}
