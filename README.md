# Randa Torten Website

Professionelle, dynamische Webseite für `@randa_torten` (Karlsruhe).

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · next-intl (DE/EN)
- **Galerie:** Instagram Graph API mit lokalem Cache-Fallback und Mock-Modus
- **Bestellungen:** Server Action mit Zod-Validierung, sendet E-Mail via SMTP
- **Deployment:** Multi-Stage Docker-Image, läuft per `docker compose up`

## Schnellstart (Mock-Modus, ohne Instagram-Token)

```bash
cp .env.example .env
docker compose up --build
```

Anschließend:
- App: http://localhost:3000
- Mailhog (Bestell-E-Mails): http://localhost:8025

Beim ersten Build dauert `next build` etwa 1–3 Minuten.

## Mit echten Instagram-Daten

Siehe **[SETUP.md](./SETUP.md)** für die Schritt-für-Schritt-Anleitung, wie Randa einen Long-Lived Access Token besorgt.

Anschließend einfach `INSTAGRAM_ACCESS_TOKEN` und `INSTAGRAM_USER_ID` in `.env` eintragen und Container neu bauen.

## Lokale Entwicklung (ohne Docker)

```bash
npm install --legacy-peer-deps
npm run dev
```

## Skripte

| Script | Zweck |
|---|---|
| `npm run dev` | Dev-Server (HMR) |
| `npm run build` | Production-Build |
| `npm run start` | Production-Server |
| `npm run typecheck` | TypeScript prüfen |
| `npm run lint` | ESLint |

## Architektur

```
src/
├── app/[locale]/        # i18n-Routen (DE Standard, EN unter /en)
│   ├── page.tsx         # Home
│   ├── galerie/         # Instagram-Galerie (DE) / /en/gallery (EN)
│   ├── ueber-uns/       # About
│   ├── bestellen/       # Bestellformular
│   ├── kontakt/         # Kontakt + Karte
│   └── preise-faq/      # Richtpreise + FAQ
├── components/
│   ├── layout/          # Header, Footer, LanguageSwitcher
│   ├── home/            # Hero, FeaturedCakes, Categories, About-Teaser, CTA
│   ├── gallery/         # Gallery + Lightbox
│   └── order/           # OrderForm
├── lib/
│   ├── instagram.ts     # Graph-API-Client + Cache + Mock-Fallback
│   ├── validation.ts    # Zod-Schema fürs Bestellformular
│   ├── email.ts         # nodemailer-Wrapper, HTML-Templates
│   ├── rate-limit.ts    # In-memory IP-Limiter (3 Anfragen/h)
│   ├── categories.ts    # Hashtag → Kategorie-Mapping
│   └── actions/order.ts # Server Action für Bestellungen
├── messages/
│   ├── de.json
│   └── en.json
├── i18n/
│   ├── routing.ts       # Routen-Definition (DE/EN-Pfade)
│   └── request.ts       # next-intl Server-Konfiguration
└── middleware.ts        # next-intl Middleware (Locale-Erkennung)
```

## Anpassungen

- **Farben/Schriften:** [tailwind.config.ts](./tailwind.config.ts)
- **Texte:** [src/messages/de.json](./src/messages/de.json) und [en.json](./src/messages/en.json)
- **Preise:** Im JSON unter `Prices.items.*`
- **FAQ:** Im JSON unter `Prices.faq`
- **Logo-Posts ausschließen:** [data/excluded-posts.json](./data/excluded-posts.json)

## Mailhog im Docker-Setup

Für lokales Testen läuft ein Mailhog-Container — alle E-Mails landen unter
http://localhost:8025 statt rauszugehen.

Für Produktion in `.env` echte SMTP-Credentials setzen (Resend, Sendgrid,
Postmark o.ä.):

```
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASSWORD=re_xxxxxx
```

## Cache invalidieren (sofort neue Insta-Posts laden)

Die Galerie revalidiert sich automatisch alle 30 Minuten (ISR). Für sofortiges
Refresh:

```bash
curl -X POST http://localhost:3000/api/instagram/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET"
```
