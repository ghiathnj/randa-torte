"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { InstagramPost } from "@/lib/instagram";

interface HeroProps {
  showcase?: InstagramPost[];
}

export function Hero({ showcase = [] }: HeroProps) {
  const t = useTranslations("Hero");
  const tiles = showcase.slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-8 pb-24 sm:pt-16 sm:pb-32">
      <div
        className="bg-blob bg-rose-soft -top-40 -left-40 w-[500px] h-[500px]"
        aria-hidden
      />
      <div
        className="bg-blob bg-gold/40 top-20 -right-40 w-[400px] h-[400px]"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-rose-soft/40 text-xs tracking-[0.2em] uppercase text-rose-deep">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-deep animate-pulse" />
            {t("eyebrow")}
          </div>

          <h1 className="heading-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-[1.05]">
            {t("title")}{" "}
            <span className="block text-rose-deep italic">
              <span className="brush-underline">{t("titleHighlight")}</span>
            </span>
          </h1>

          <p className="mt-6 text-lg text-charcoal/70 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/bestellen"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose-deep text-cream font-medium shadow-rose-glow hover:bg-rose-darker hover:shadow-2xl hover:scale-105 transition-all"
            >
              {t("ctaPrimary")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-charcoal/10 text-charcoal hover:border-rose-deep hover:text-rose-deep font-medium transition-all"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative h-[480px] lg:h-[600px]"
        >
          {tiles.length > 0 ? (
            <>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-8 w-[260px] h-[340px] rounded-3xl overflow-hidden shadow-2xl shadow-rose-deep/20 ring-8 ring-cream"
              >
                <ImageWithFallback
                  src={tiles[0].thumbnailUrl ?? tiles[0].mediaUrl}
                  alt="Featured cake"
                />
              </motion.div>
              {tiles[1] ? (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-12 left-0 w-[220px] h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-rose-deep/20 ring-8 ring-cream"
                >
                  <ImageWithFallback
                    src={tiles[1].thumbnailUrl ?? tiles[1].mediaUrl}
                    alt="Featured cake"
                  />
                </motion.div>
              ) : null}
              {tiles[2] ? (
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute top-32 left-32 w-[180px] h-[180px] rounded-full overflow-hidden shadow-2xl shadow-gold/30 ring-8 ring-cream"
                >
                  <ImageWithFallback
                    src={tiles[2].thumbnailUrl ?? tiles[2].mediaUrl}
                    alt="Featured cake"
                  />
                </motion.div>
              ) : null}
            </>
          ) : (
            <HeroPlaceholder />
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">
          {t("scrollHint")}
        </span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className="w-full h-full object-cover"
    />
  );
}

function HeroPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-80 h-80 rounded-full overflow-hidden ring-8 ring-cream shadow-2xl shadow-rose-deep/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/randa-logo.jpg"
          alt="Cake Randa"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
