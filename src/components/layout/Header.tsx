"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/" as const, key: "home" },
  { href: "/galerie" as const, key: "gallery" },
  { href: "/preise-faq" as const, key: "prices" },
  { href: "/kontakt" as const, key: "contact" },
  { href: "/ueber-uns" as const, key: "about" },
];

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Randa Torten"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-rose-soft/60 group-hover:ring-rose-deep/50 transition-all shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/randa-logo.jpg"
                alt="Cake Randa Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="heading-serif text-xl text-charcoal">
                Randa Torten
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-rose-deep/70">
                Karlsruhe
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all",
                    active
                      ? "text-rose-deep bg-rose-soft/30"
                      : "text-charcoal/80 hover:text-rose-deep hover:bg-rose-soft/20",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="https://www.instagram.com/randa_torten/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-rose-deep text-cream text-sm font-medium hover:bg-rose-darker transition-all shadow-rose-glow hover:shadow-lg hover:scale-105"
            >
              {t("ctaOrder")}
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-full text-charcoal hover:bg-rose-soft/30 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="lg:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1 pt-2 border-t border-rose-soft/30">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-4 py-3 text-base text-charcoal/80 hover:text-rose-deep hover:bg-rose-soft/20 rounded-lg transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/randa_torten/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 mx-4 inline-flex justify-center items-center px-5 py-3 rounded-full bg-rose-deep text-cream text-base font-medium"
              >
                {t("ctaOrder")}
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
