"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryPayload, InstagramPost } from "@/lib/instagram";
import { ALL_CATEGORIES, type CategoryKey } from "@/lib/categories";
import { cn } from "@/lib/cn";

interface GalleryProps {
  payload: GalleryPayload;
}

export function Gallery({ payload }: GalleryProps) {
  const t = useTranslations("Gallery");
  const tCat = useTranslations("Categories");
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return payload.posts;
    return payload.posts.filter((p) => p.category === filter);
  }, [filter, payload.posts]);

  const slides = filtered.map((p) => ({
    src: p.mediaUrl,
    alt: p.caption?.slice(0, 100) ?? "Randa Torten cake",
  }));

  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-serif text-4xl sm:text-5xl text-charcoal">
            {t("title")}
          </h1>
          <p className="mt-3 text-charcoal/60 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          {payload.source !== "live" ? (
            <div className="mt-4 inline-block text-xs text-charcoal/40 bg-rose-soft/20 px-3 py-1 rounded-full">
              {payload.source === "mock" ? "Demo · " : ""}
              {payload.source === "cache" ? t("fallbackNotice") : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {t("all")}
          </FilterChip>
          {ALL_CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
            >
              {tCat(c)}
            </FilterChip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-charcoal/50">{t("empty")}</div>
        ) : (
          <div className="masonry">
            {filtered.map((post, idx) => (
              <CakeCard
                key={post.id}
                post={post}
                onClick={() => setLightboxIdx(idx)}
              />
            ))}
          </div>
        )}

        <Lightbox
          open={lightboxIdx !== null}
          close={() => setLightboxIdx(null)}
          index={lightboxIdx ?? 0}
          slides={slides}
          styles={{
            container: { backgroundColor: "rgba(26, 26, 26, 0.92)" },
          }}
        />
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-5 py-2 rounded-full text-sm font-medium transition-all",
        active
          ? "bg-rose-deep text-cream shadow-rose-glow"
          : "bg-white/60 text-charcoal/70 hover:text-rose-deep hover:bg-rose-soft/30",
      )}
    >
      {children}
    </button>
  );
}

function CakeCard({
  post,
  onClick,
}: {
  post: InstagramPost;
  onClick: () => void;
}) {
  return (
    <div className="masonry-item group relative rounded-2xl overflow-hidden bg-rose-soft/10 shadow-soft hover:shadow-rose-glow transition-all">
      <button
        type="button"
        onClick={onClick}
        className="block w-full"
        aria-label="View larger"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.thumbnailUrl ?? post.mediaUrl}
          alt={post.caption?.slice(0, 80) ?? "Cake"}
          className="w-full h-auto block group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-cream text-xs font-medium hover:text-rose-soft transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Instagram
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
