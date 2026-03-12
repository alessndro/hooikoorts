"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { TIPS_NAV } from "@/lib/tips";

const PANEL_ID = "tips-nav-panel";

export function TipsNavDropdown() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  const toggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open || !buttonRef.current) return;
    const update = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({ top: rect.bottom + 4, left: rect.left });
      }
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  // Klik buiten het menu sluit het
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      )
        return;
      close();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Escape sluit en zet focus terug op de knop
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className="text-sm text-secondary hover:text-primary bg-transparent border-0 cursor-pointer font-inherit p-0"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={PANEL_ID}
        id="tips-nav-trigger"
      >
        Tips
      </button>
      {typeof document !== "undefined" &&
        open &&
        createPortal(
          <div
            ref={panelRef}
            id={PANEL_ID}
            role="menu"
            aria-labelledby="tips-nav-trigger"
            className="fixed z-[9999] min-w-[200px] w-max max-w-[90vw] rounded-xl border border-border bg-card shadow-lg py-2"
            style={{ top: position.top, left: position.left }}
          >
            <ul className="list-none p-0 m-0" role="none">
              {TIPS_NAV.map((tip) => (
                <li key={tip.slug} role="none">
                  <Link
                    href={`/tips/${tip.slug}`}
                    role="menuitem"
                    className="block w-full px-4 py-2.5 text-sm text-primary hover:bg-page text-left whitespace-nowrap no-underline"
                    onClick={close}
                  >
                    {tip.title}
                  </Link>
                </li>
              ))}
              <li className="border-t border-border mt-1 pt-1" role="none">
                <Link
                  href="/tips"
                  role="menuitem"
                  className="block w-full px-4 py-2.5 text-sm font-medium text-primary hover:bg-page text-left no-underline"
                  onClick={close}
                >
                  Alle tips →
                </Link>
              </li>
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
