"use client";

import Image from "next/image";
import { Copy, EyeOff } from "lucide-react";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell } from "@/features/website/dashboard/component/DashboardShell";

import { SettingsInput } from "./SettingsInput";
import {
  changeSettingsPassword,
  updateSettingsEmail,
  updateSettingsProfile,
} from "../api/settings.api";
import { useSettingsData } from "../hooks/useSettingsData";

export function SettingsPage() {
  const profileQuery = useSettingsData();
  const profile = profileQuery.data;

  const profileMutation = useMutation({
    mutationFn: updateSettingsProfile,
    onSuccess: () => toast.success("Profile updated."),
    onError: (error: Error) =>
      toast.error(error.message || "Unable to update profile."),
  });
  const emailMutation = useMutation({
    mutationFn: updateSettingsEmail,
    onSuccess: () => toast.success("Email updated."),
    onError: (error: Error) =>
      toast.error(error.message || "Unable to update email."),
  });
  const passwordMutation = useMutation({
    mutationFn: changeSettingsPassword,
    onSuccess: () => {
      toast.success("Password changed.");
    },
    onError: (error: Error) =>
      toast.error(error.message || "Unable to change password."),
  });

  function copyEmail() {
    if (!profile?.email) return;
    navigator.clipboard.writeText(profile.email).then(() => {
      toast.success("Email copied.");
    });
  }

  function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    profileMutation.mutate({
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      location: String(form.get("location") || ""),
    });
  }

  function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get("currentPassword") || "");
    const newPassword = String(form.get("newPassword") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    passwordMutation.mutate({ currentPassword, newPassword });
  }

  function submitEmailUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    emailMutation.mutate({
      newEmail: String(form.get("email") || ""),
      password: String(form.get("emailPassword") || ""),
    });
  }

  return (
    <DashboardShell activeHref="/settings" title="Settings">
      <div className="space-y-4">
        <section className="border border-[var(--home-border)] bg-white p-5 sm:p-6">
          <h2 className="text-[18px] font-bold">Profile Update</h2>

          {profileQuery.isLoading ? (
            <p className="mt-6 text-sm text-[var(--home-muted)]">
              Loading profile...
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              src={profile?.avatar || "/placeholder-author.png"}
              alt={profile?.name || "Profile"}
              width={96}
              height={96}
              className="size-20 rounded-full object-cover sm:size-24"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[18px] font-bold text-[var(--home-green-deep)]">
                  {profile?.name || "Account"}
                </h3>
                <span className="rounded-full border border-[var(--home-gold)] bg-[rgba(207,175,69,0.12)] px-3 py-1 text-[12px] font-semibold text-[var(--home-gold)]">
                  {profile?.badge || "Member"}
                </span>
              </div>
              <p className="mt-2 inline-flex items-center gap-3 text-[15px] text-[var(--home-muted)]">
                {profile?.email || ""}
                <button
                  type="button"
                  aria-label="Copy email"
                  onClick={copyEmail}
                  className="text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
                >
                  <Copy className="size-4" />
                </button>
              </p>
            </div>
          </div>

          <form
            key={profile?.id || "profile-form"}
            className="mt-8 grid gap-5 md:grid-cols-2"
            onSubmit={submitProfile}
          >
            <SettingsInput
              label="First Name"
              name="firstName"
              defaultValue={profile?.firstName || ""}
            />
            <SettingsInput
              label="Last Name"
              name="lastName"
              defaultValue={profile?.lastName || ""}
            />
            <SettingsInput
              label="Display Email"
              defaultValue={profile?.email || ""}
              readOnly
            />
            <SettingsInput
              label="Location"
              name="location"
              defaultValue={profile?.location || ""}
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={profileMutation.isPending}
                className="h-12 w-full bg-[var(--home-gold)] px-6 text-[13px] font-bold text-white transition hover:bg-[var(--home-green)] disabled:opacity-60"
              >
                {profileMutation.isPending ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </section>

        <section className="border border-[var(--home-border)] bg-white p-5 sm:p-6">
          <h2 className="text-[18px] font-bold">Update Email</h2>
          <form className="mt-5 space-y-5" onSubmit={submitEmailUpdate}>
            <SettingsInput
              label="New Email"
              name="email"
              defaultValue={profile?.email || ""}
            />
            <SettingsInput
              label="Confirm With Password"
              name="emailPassword"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <button
              type="submit"
              disabled={emailMutation.isPending}
              className="h-12 w-full bg-[var(--home-gold)] px-6 text-[13px] font-bold text-white transition hover:bg-[var(--home-green)] disabled:opacity-60"
            >
              {emailMutation.isPending ? "Updating..." : "Update Email"}
            </button>
          </form>
        </section>

        <section className="border border-[var(--home-border)] bg-white p-5 sm:p-6">
          <h2 className="text-[18px] font-bold">Change Password</h2>
          <form className="mt-5 space-y-5" onSubmit={submitPassword}>
            <SettingsInput
              label="Current Password"
              name="currentPassword"
              placeholder="Enter password"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <SettingsInput
              label="New Password"
              name="newPassword"
              placeholder="Enter password"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <SettingsInput
              label="Re-enter Password"
              name="confirmPassword"
              placeholder="Enter password"
              type="password"
              action={<EyeOff className="size-4 text-[var(--home-muted)]" />}
            />
            <button
              type="submit"
              disabled={passwordMutation.isPending}
              className="h-12 w-full bg-[var(--home-gold)] px-6 text-[13px] font-bold text-white transition hover:bg-[var(--home-green)] disabled:opacity-60"
            >
              {passwordMutation.isPending ? "Saving..." : "Save Change"}
            </button>
          </form>
        </section>
      </div>
    </DashboardShell>
  );
}
