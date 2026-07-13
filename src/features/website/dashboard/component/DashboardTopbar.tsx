import Image from "next/image";

import { dashboardTopAction, dashboardUser } from "../api/dashboard.data";

export function DashboardTopbar({ title }: { title: string }) {
  const TopIcon = dashboardTopAction.icon;

  return (
    <header className="sticky top-0 z-30 bg-[#6f7f70] px-5 text-white sm:px-8 lg:ml-[220px] lg:px-6 xl:px-8">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center justify-between lg:min-h-[90px]">
        <h1 className="text-[20px] font-bold">{title}</h1>
        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label={dashboardTopAction.label}
            className="text-white/90 transition hover:text-white"
          >
            <TopIcon className="size-5" />
          </button>
          <Image
            src={dashboardUser.avatar}
            alt={dashboardUser.name}
            width={40}
            height={40}
            className="size-9 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
