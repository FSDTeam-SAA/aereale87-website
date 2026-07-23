import { api } from "@/lib/api";

import type { SettingsProfile } from "../types/settings.types";

type ApiEnvelope<T> = {
  data?: T;
};

type AuthMeResponse = {
  id: string;
  email: string;
  username: string;
  role: string;
  profile?: {
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
    location?: string | null;
  };
};

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  return payload && typeof payload === "object" && "data" in payload
    ? ((payload as ApiEnvelope<T>).data as T)
    : (payload as T);
}

export async function getSettingsProfile(): Promise<SettingsProfile> {
  const response = await api.get<ApiEnvelope<AuthMeResponse> | AuthMeResponse>(
    "/auth/me",
  );
  const outer = unwrap(response.data);
  const me = unwrap(outer as ApiEnvelope<AuthMeResponse> | AuthMeResponse);
  const firstName = me.profile?.firstName || "";
  const lastName = me.profile?.lastName || "";
  const name = `${firstName} ${lastName}`.trim() || me.username || me.email;

  return {
    id: me.id,
    name,
    email: me.email,
    badge: me.role,
    avatar: me.profile?.avatarUrl || "/placeholder-author.png",
    firstName,
    lastName,
    password: "",
    phoneNumber: "",
    location: me.profile?.location || "",
  };
}

export async function updateSettingsProfile(input: {
  firstName: string;
  lastName: string;
  location: string;
}) {
  return api.patch("/auth/profile", input);
}

export async function changeSettingsPassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  return api.post("/auth/change-password", input);
}

export async function updateSettingsEmail(input: {
  newEmail: string;
  password: string;
}) {
  return api.patch("/auth/email", input);
}
