"use client";

import Image from "next/image";
import { Copy, EyeOff, Camera, Upload, Loader2 } from "lucide-react";
import { FormEvent, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell } from "@/features/website/dashboard/component/DashboardShell";

import { SettingsInput } from "./SettingsInput";
import {
  changeSettingsPassword,
  updateSettingsEmail,
  updateSettingsProfile,
  uploadSettingsAvatar,
} from "../api/settings.api";
import { useSettingsData } from "../hooks/useSettingsData";

export function SettingsPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileQuery = useSettingsData();
  const profile = profileQuery.data;

  const avatarMutation = useMutation({
    mutationFn: uploadSettingsAvatar,
    onSuccess: (data) => {
      toast.success(data?.message || "Profile picture updated successfully.");
      void queryClient.invalidateQueries({
        queryKey: ["website-settings-profile"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload profile picture.");
    },
  });

  function handleAvatarFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be less than 5 MB.");
      return;
    }

    avatarMutation.mutate(file);
    // Reset file input value so selecting the same file again triggers change event
    event.target.value = "";
  }

  const profileMutation = useMutation({
    mutationFn: updateSettingsProfile,
    onSuccess: () => {
      toast.success("Profile updated.");
      void queryClient.invalidateQueries({
        queryKey: ["website-settings-profile"],
      });
    },
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
            {/* Avatar with upload button overlay */}
            <div className="relative size-20 sm:size-24 shrink-0">
              <div className="relative size-full overflow-hidden rounded-full border-2 border-[var(--home-gold)] bg-[var(--home-paper)] shadow-sm">
                <Image
                  src={profile?.avatar || "/placeholder-author.png"}
                  alt={profile?.name || "Profile"}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                />
                {avatarMutation.isPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white backdrop-blur-[2px]">
                    <Loader2 className="size-6 animate-spin text-[var(--home-gold)]" />
                  </div>
                )}
              </div>

              {/* Upload trigger button badge */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarMutation.isPending}
                aria-label="Upload profile picture"
                title="Change profile picture"
                className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-[var(--home-gold)] text-white shadow-md transition hover:bg-[var(--home-green)] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[var(--home-gold)]"
              >
                {avatarMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Camera className="size-4" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={handleAvatarFileChange}
              />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[18px] font-bold text-[var(--home-green-deep)]">
                  {profile?.name || "Account"}
                </h3>
                <span className="rounded-full border border-[var(--home-gold)] bg-[rgba(207,175,69,0.12)] px-3 py-1 text-[12px] font-semibold text-[var(--home-gold)]">
                  {profile?.badge || "Member"}
                </span>
              </div>
              <p className="inline-flex items-center gap-3 text-[15px] text-[var(--home-muted)]">
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
              <div className="pt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarMutation.isPending}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--home-gold)] hover:text-[var(--home-green)] transition underline underline-offset-2"
                >
                  <Upload className="size-3.5" />
                  <span>
                    {avatarMutation.isPending
                      ? "Uploading image..."
                      : "Change photo"}
                  </span>
                </button>
                <span className="text-xs text-stone-400">
                  JPG, PNG, WebP up to 5MB
                </span>
              </div>
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
