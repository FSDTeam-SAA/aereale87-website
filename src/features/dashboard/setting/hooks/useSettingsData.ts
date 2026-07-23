import { useQuery } from "@tanstack/react-query";

import { getSettingsProfile } from "../api/settings.api";

export function useSettingsData() {
  return useQuery({
    queryKey: ["website-settings-profile"],
    queryFn: getSettingsProfile,
  });
}
