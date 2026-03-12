import Link from "next/link";
import { LogoIcon } from "./icons";
import { TIPS_NAV } from "@/lib/tips";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="relative z-10 flex w-full max-w-6xl mx-auto items-center justify-between gap-6 px-4 py-6 bg-transparent">
      <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
        <LogoIcon className="w-8 h-8" />
        <span>Hooikoortsvandaag.nl</span>
      </Link>
      <nav className="flex items-center gap-6">
        <a href="#" className="text-sm text-secondary hover:text-primary">Uitleg</a>
        <a href="#" className="text-sm text-secondary hover:text-primary">Blog</a>
        <a href="#" className="text-sm text-secondary hover:text-primary">Over</a>
        <div className="relative group">
          <Link
            href="/tips"
            className="text-sm text-secondary hover:text-primary"
          >
            Tips
          </Link>
          <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity min-w-[200px] z-20">
            <div className="rounded-xl border border-border bg-card shadow-lg py-2">
              {TIPS_NAV.map((tip) => (
                <Link
                  key={tip.slug}
                  href={`/tips/${tip.slug}`}
                  className="block px-4 py-2.5 text-sm text-primary hover:bg-page"
                >
                  {tip.title}
                </Link>
              ))}
              <Link
                href="/tips"
                className="block px-4 py-2.5 text-sm font-medium text-primary border-t border-border mt-1 pt-2"
              >
                Alle tips →
              </Link>
            </div>
          </div>
        </div>
        <ThemeToggle />
        <Link
          href="/tips"
          className="rounded-xl bg-cta-bg px-4 py-2.5 text-sm font-medium text-primary hover:opacity-90"
        >
          Tips & advies
        </Link>
      </nav>
    </header>
  );
}
