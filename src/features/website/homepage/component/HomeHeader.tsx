import { SiteHeader } from "@/components/shared/site/SiteHeader";

import type { NavItem } from "../types/homepage.types";

export function HomeHeader(props: { items: NavItem[] }) {
  void props;

  return <SiteHeader activeHref="/" />;
}
