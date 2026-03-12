"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");
    if (next) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setDark(next);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="p-2 text-secondary rounded-lg hover:bg-border hover:text-primary transition-colors"
        aria-label="Thema wisselen"
      >
        <span className="w-5 h-5 block" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 text-secondary rounded-lg hover:bg-border hover:text-primary transition-colors"
      aria-label={dark ? "Lichte modus" : "Donkere modus"}
    >
      {dark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
}
