# Setup-Anleitung: Instagram-Bilder verbinden

Diese Anleitung führt Randa (oder die zuständige Person) Schritt für Schritt
durch das einmalige Setup, damit die Webseite Instagram-Posts automatisch holt.

> **Aufwand:** ca. 10–15 Minuten · **Voraussetzung:** Facebook-Account

## 1. Instagram in Business-Konto umwandeln

1. Instagram-App öffnen → Profil → Drei-Striche-Menü oben rechts → **Einstellungen**.
2. **Konto** → **Zu professionellem Konto wechseln**.
3. Kategorie **„Bäckerei"** oder **„Konditorei"** wählen → **Weiter**.
4. **Business** wählen (nicht Creator).

## 2. Mit Facebook-Seite verknüpfen

Falls noch keine Facebook-Seite existiert, erstellt Instagram automatisch eine.
Falls eine vorhanden ist:

1. Im Verknüpfungs-Schritt die bestehende Facebook-Seite wählen.
2. Falls nicht möglich: auf [facebook.com/pages/create](https://facebook.com/pages/create)
   eine neue Seite erstellen (Kategorie „Bäckerei").

## 3. Meta Developer App erstellen

1. [developers.facebook.com](https://developers.facebook.com) öffnen → Anmelden mit dem Facebook-Account.
2. Oben rechts **„Meine Apps"** → **„App erstellen"**.
3. Anwendungsfall: **„Andere"** → **Weiter**.
4. App-Typ: **„Business"** → **Weiter**.
5. Name z.B. „Randa Torten Website".

## 4. Instagram-Produkt hinzufügen

1. Im App-Dashboard links auf **„Produkt hinzufügen"** klicken.
2. Bei **„Instagram"** auf **„Einrichten"** klicken.
3. **„Erste Schritte"** wählen.

## 5. Long-Lived Access Token holen

1. Im linken Menü unter Instagram → **„API-Setup mit Instagram-Login"**.
2. Bei **„Konten generieren"** das Konto `randa_torten` auswählen und genehmigen.
3. Auf **„Token generieren"** klicken — Instagram zeigt einen langen
   Token-String an. Diesen sicher kopieren.
4. Direkt darunter steht die **Instagram-User-ID** (numerisch). Auch kopieren.

> ⚠️ Der Token ist 60 Tage gültig. Vor Ablauf neu generieren oder den
> Refresh-Endpoint nutzen (siehe Punkt 7).

## 6. Werte in der Webseite eintragen

Im Projektverzeichnis die Datei `.env` anlegen (falls noch nicht vorhanden:
`cp .env.example .env`) und folgende Werte eintragen:

```
INSTAGRAM_ACCESS_TOKEN=IGQVJ...   # der lange Token-String
INSTAGRAM_USER_ID=17841400000000  # die User-ID
```

Anschließend Container neu bauen:

```bash
docker compose down
docker compose up --build
```

Die Galerie auf http://localhost:3000/galerie zeigt nun echte Posts.

## 7. Token vor Ablauf erneuern (optional)

Mit folgendem `curl`-Aufruf wird der Token um weitere 60 Tage verlängert
(funktioniert ab Tag 1, idealerweise alle 30–50 Tage):

```bash
curl -G "https://graph.instagram.com/refresh_access_token" \
  -d "grant_type=ig_refresh_token" \
  -d "access_token=$INSTAGRAM_ACCESS_TOKEN"
```

Antwort enthält den neuen Token, den dann wieder in `.env` eintragen.

## 8. „Logo-Cards" aus der Galerie ausblenden

Auf Randas Profil gibt es regelmäßig Branding-Cards (Logo auf cremefarbenem
Hintergrund mit rosa Rahmen). Falls diese nicht in die Galerie sollen:

1. Auf den jeweiligen Insta-Post klicken → URL kopieren (z.B.
   `https://www.instagram.com/p/Cabc123/`).
2. Mit dem Graph API Explorer die Post-ID abrufen, oder im Dev Tools des
   Browsers auf der Webseite → ein Galerie-Bild → Element inspizieren →
   `data-id` lesen.
3. Die ID in [data/excluded-posts.json](./data/excluded-posts.json)
   in das `ids`-Array eintragen.
4. Container neu starten oder `/api/instagram/revalidate` aufrufen.

## Probleme?

- **Galerie bleibt leer / Mock-Modus aktiv:** `INSTAGRAM_ACCESS_TOKEN`
  oder `INSTAGRAM_USER_ID` fehlen in `.env`.
- **„Invalid OAuth access token":** Token ist abgelaufen — Schritt 5 oder 7.
- **Posts erscheinen verzögert:** Galerie revalidiert sich alle 30 Min,
  manuell sofort über `/api/instagram/revalidate` möglich.
