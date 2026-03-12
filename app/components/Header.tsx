"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LogoIcon, MenuIcon, CloseIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";
import { BlogNavDropdown } from "./BlogNavDropdown";
import { TipsNavDropdown } from "./TipsNavDropdown";
import { BLOGS_NAV } from "@/lib/blogs";
import { TIPS_NAV } from "@/lib/tips";

const MOBILE_MENU_ID = "mobile-nav-panel";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  // Sluit bij resize naar desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Escape sluit menu; lock scroll wanneer open
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="relative z-10 flex w-full max-w-6xl mx-auto items-center justify-between gap-4 px-4 py-4 sm:py-6 bg-transparent">
      <Link
        href="/"
        className="flex items-center gap-2 text-primary font-semibold min-w-0"
        onClick={closeMobile}
      >
        <LogoIcon className="w-8 h-8 shrink-0" />
        <span className="truncate sm:inline">Hooikoortsvandaag.nl</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6" aria-label="Hoofdnavigatie">
        <BlogNavDropdown />
        <Link href="/over" className="text-sm text-secondary hover:text-primary whitespace-nowrap">
          Over ons
        </Link>
        <TipsNavDropdown />
        <ThemeToggle />
        <Link
          href="/tips"
          className="rounded-xl bg-cta-bg px-4 py-2.5 text-sm font-medium text-primary hover:opacity-90 whitespace-nowrap"
        >
          Tips & advies
        </Link>
      </nav>

      {/* Mobile: hamburger */}
      <div className="flex md:hidden items-center gap-2 shrink-0">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2.5 -mr-2 rounded-lg text-secondary hover:text-primary hover:bg-card border-0 cursor-pointer touch-manipulation"
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label="Menu openen"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {typeof document !== "undefined" &&
        mobileOpen &&
        createPortal(
          <div
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Navigatiemenu"
            className="fixed inset-0 z-[9998] md:hidden"
          >
            {/* Backdrop */}
            <button
              type="button"
              onClick={closeMobile}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
              aria-label="Menu sluiten"
            />
            {/* Panel: slide from right, full height */}
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border shadow-xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
                <span className="font-semibold text-primary">Menu</span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="p-2.5 rounded-lg text-secondary hover:text-primary hover:bg-page touch-manipulation"
                  aria-label="Menu sluiten"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-4 pb-[env(safe-area-inset-bottom)]" aria-label="Navigatie">
                <ul className="list-none p-0 m-0 flex flex-col gap-1">
                  <li>
                    <Link
                      href="/"
                      className="flex items-center min-h-[44px] px-4 rounded-xl text-primary font-medium hover:bg-page"
                      onClick={closeMobile}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="pt-2">
                    <span className="block px-4 py-1 text-xs font-semibold text-tertiary uppercase tracking-wider">
                      Blog
                    </span>
                    <ul className="list-none p-0 m-0 mt-1">
                      {BLOGS_NAV.map((post) => (
                        <li key={post.slug}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="flex min-h-[44px] items-center pl-6 pr-4 rounded-xl text-secondary hover:bg-page hover:text-primary"
                            onClick={closeMobile}
                          >
                            {post.navTitle ?? post.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/blog"
                          className="flex min-h-[44px] items-center pl-6 pr-4 rounded-xl text-highlight font-medium hover:bg-page"
                          onClick={closeMobile}
                        >
                          Alle artikelen →
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      href="/over"
                      className="flex min-h-[44px] items-center px-4 rounded-xl text-secondary hover:bg-page hover:text-primary"
                      onClick={closeMobile}
                    >
                      Over ons
                    </Link>
                  </li>
                  <li className="pt-2">
                    <span className="block px-4 py-1 text-xs font-semibold text-tertiary uppercase tracking-wider">
                      Tips
                    </span>
                    <ul className="list-none p-0 m-0 mt-1">
                      {TIPS_NAV.map((tip) => (
                        <li key={tip.slug}>
                          <Link
                            href={`/tips/${tip.slug}`}
                            className="flex min-h-[44px] items-center pl-6 pr-4 rounded-xl text-secondary hover:bg-page hover:text-primary"
                            onClick={closeMobile}
                          >
                            {tip.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href="/tips"
                          className="flex min-h-[44px] items-center pl-6 pr-4 rounded-xl text-highlight font-medium hover:bg-page"
                          onClick={closeMobile}
                        >
                          Alle tips →
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="pt-4 mt-2 border-t border-border">
                    <Link
                      href="/tips"
                      className="flex min-h-[48px] items-center justify-center mx-2 rounded-xl bg-cta-bg font-medium text-primary hover:opacity-90"
                      onClick={closeMobile}
                    >
                      Tips & advies
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
