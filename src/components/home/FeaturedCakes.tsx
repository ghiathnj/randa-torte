import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { InstagramPost } from "@/lib/instagram";

interface FeaturedCakesProps {
  posts: InstagramPost[];
}

export function FeaturedCakes({ posts }: FeaturedCakesProps) {
  const t = useTranslations("Featured");
  const top = posts.slice(0, 4);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-rose-deep mb-3">
              {t("eyebrow")}
            </div>
            <h2 className="heading-serif text-4xl sm:text-5xl text-charcoal">
              {t("title")}
            </h2>
            <p className="mt-3 text-charcoal/60 max-w-md">{t("subtitle")}</p>
          </div>
          <Link
            href="/galerie"
            className="group inline-flex items-center gap-2 text-rose-deep font-medium hover:gap-3 transition-all whitespace-nowrap"
          >
            {t("viewAll")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {top.map((post, idx) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-rose-soft/20 shadow-soft hover:shadow-rose-glow transition-all"
              style={{
                transform: idx % 2 === 1 ? "translateY(24px)" : undefined,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.thumbnailUrl ?? post.mediaUrl}
                alt={post.caption?.slice(0, 80) ?? "Randa Torten cake"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-cream text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                {post.category}
              </div>
            </a>
          ))}

          {top.length === 0 ? (
            <div className="col-span-full text-center text-charcoal/50 py-12">
              –
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
