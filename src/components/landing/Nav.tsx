import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { CRAFTDOCS_APP_URL, NAV_LINKS } from "@/lib/craftdocs";
import { CRAFTDOCS_LOGO, CRAFTDOCS_LOGO_PAD } from "@/lib/brand-assets";
import { CtaLink } from "./shared";

type NavLink = { label: string; href: string };

export function LandingNav({
  isDark,
  onToggleDark,
  links = NAV_LINKS,
  logoHref = "/",
}: {
  isDark: boolean;
  onToggleDark: () => void;
  links?: readonly NavLink[];
  logoHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 10;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pb-2 pt-3 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-border/80 bg-card/90 shadow-lg backdrop-blur-2xl"
            : "border border-border/40 bg-card/60 backdrop-blur-xl"
        }`}
      >
        <a href={logoHref} className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <img
            src={CRAFTDOCS_LOGO}
            alt="CraftDocs"
            className={`h-8 w-auto max-w-[140px] shrink-0 px-2.5 py-1.5 sm:h-9 sm:max-w-[160px] ${CRAFTDOCS_LOGO_PAD}`}
          />
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={onToggleDark}
            className="cursor-pointer rounded-xl border border-border p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <CtaLink href={CRAFTDOCS_APP_URL} className="px-4 py-2 text-xs">
            Open CraftDocs
          </CtaLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleDark}
            className="cursor-pointer rounded-xl border border-border p-2 text-muted-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <CtaLink href={CRAFTDOCS_APP_URL} className="w-full">
              Open CraftDocs
            </CtaLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
