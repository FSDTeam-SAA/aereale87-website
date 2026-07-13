export function GoogleButton() {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-center gap-3 border border-[var(--home-border)] bg-white text-[14px] font-medium text-[var(--home-green-deep)] transition hover:border-[var(--home-gold)]"
    >
      <span className="text-[20px] font-bold text-[#4285f4]">G</span>
      Sign in with Google
    </button>
  );
}
