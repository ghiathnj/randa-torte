import { useTranslations } from "next-intl";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tContact = useTranslations("Contact");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-cream to-cream-200 border-t border-rose-soft/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="heading-serif text-3xl text-rose-deep mb-2">
              Randa Torten
            </div>
            <p className="text-charcoal/70 text-sm leading-relaxed max-w-md">
              {t("tagline")}. Jede Torte ein Unikat – jede Bestellung ein
              gemeinsames kleines Projekt.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/randa_torten/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/60 hover:bg-rose-deep hover:text-cream text-charcoal flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="font-medium text-charcoal mb-4 text-sm uppercase tracking-wider">
              {t("navigation")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/galerie"
                  className="text-charcoal/70 hover:text-rose-deep transition-colors"
                >
                  {tNav("gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-charcoal/70 hover:text-rose-deep transition-colors"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/preise-faq"
                  className="text-charcoal/70 hover:text-rose-deep transition-colors"
                >
                  {tNav("prices")}
                </Link>
              </li>
              <li>
                <Link
                  href="/bestellen"
                  className="text-charcoal/70 hover:text-rose-deep transition-colors"
                >
                  {tNav("order")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-charcoal mb-4 text-sm uppercase tracking-wider">
              {t("contact")}
            </div>
            <ul className="space-y-2 text-sm text-charcoal/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-rose-deep" />
                <span>{tContact("address")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Instagram size={14} className="mt-0.5 shrink-0 text-rose-deep" />
                <a
                  href="https://www.instagram.com/randa_torten/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-deep transition-colors"
                >
                  {tContact("instagramHandle")}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 shrink-0 text-rose-deep" />
                <Link
                  href="/kontakt"
                  className="hover:text-rose-deep transition-colors"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rose-soft/30 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal/50">
          <div>
            © {year} Randa Torten. {t("rights")}
          </div>
          <div className="flex items-center gap-4">
            <span>{t("imprint")}</span>
            <span>·</span>
            <span>{t("privacy")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
