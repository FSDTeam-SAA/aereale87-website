import { settingsProfile } from "../api/settings.data";

export function useSettingsData() {
  return {
    profile: settingsProfile,
  };
}
