import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

import type { FooterColumn } from "../types/homepage.types";

export function HomeFooter({ columns }: { columns: FooterColumn[] }) {
  return (
    <footer
      id="about"
      className="bg-white px-5 py-14 sm:px-8 lg:px-[120px] lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[528px_repeat(4,minmax(0,240px))]">
          <div>
            <Image
              src="/home/logo-footer.png"
              alt="The Wonder Emporium logo"
              width={150}
              height={90}
              className="h-auto w-[150px]"
              loading="lazy"
            />
            <p className="mt-6 max-w-[384px] text-[16px] leading-[1.45] text-[var(--home-muted)]">
              A premium destination for books, storytelling, wisdom, and
              leadership content. Curated for the discerning mind.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <Link
                  key={index}
                  href="#newsletter"
                  aria-label={`Social link ${index + 1}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--home-border)] text-[var(--home-muted)] transition hover:border-[var(--home-gold)] hover:text-[var(--home-gold)]"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-[16px] font-semibold uppercase leading-[1.2] text-[var(--home-green-deep)]">
                {column.heading}
              </h2>
              <ul className="mt-[43px] space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#top"
                      className="text-[16px] leading-[1.2] text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(232,224,204,0.8)] pt-6 text-[12px] leading-[1.2] text-[var(--home-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 The Wonder Emporium. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="#top"
              className="transition hover:text-[var(--home-green-deep)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#top"
              className="transition hover:text-[var(--home-green-deep)]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
