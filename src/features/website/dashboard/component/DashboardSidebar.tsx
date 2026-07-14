import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { dashboardNavItems, dashboardUser } from "../api/dashboard.data";

export function DashboardSidebar({ activeHref }: { activeHref: string }) {
  return (
    <aside className="flex bg-[#6f7f70] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-[220px] lg:flex-col">
      <div className="flex w-full items-center gap-4 px-4 py-4 lg:block lg:px-0 lg:py-7">
        <Link href="/" className="block shrink-0 lg:text-center">
          <Image
            src="/images/logo.svg"
            alt="The Wonder Emporium logo"
            width={140}
            height={84}
            priority
            className="h-auto w-[90px] lg:mx-auto lg:w-[132px]"
          />
        </Link>

        <nav className="flex flex-1 items-center gap-2 lg:mt-10 lg:block lg:space-y-2">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === activeHref;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-12 items-center gap-3 px-4 text-[14px] font-bold transition lg:w-full ${
                  isActive
                    ? "bg-[var(--home-gold)] text-white"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden px-4 pb-5 lg:mt-auto lg:block">
        <div className="mb-5 flex items-center gap-3">
          <Image
            src={dashboardUser.avatar}
            alt={dashboardUser.name}
            width={42}
            height={42}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-[14px] font-bold leading-tight">
              {dashboardUser.name}
            </p>
            <p className="text-[12px] text-white/80">{dashboardUser.role}</p>
          </div>
        </div>
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 border border-red-500 text-[14px] font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut className="size-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
