
# ButtrCup — Website

Dies ist eine vollständig lauffähige, statische Website (DE) für **ButtrCup** mit:
- Startseite, Produktübersicht, 4 Produktseiten, Über uns, Nachhaltigkeit, Händler, Kontakt, Warenkorb (E-Mail Checkout), Impressum, Datenschutz, AGB, 404
- Responsivem Design (HTML/CSS/JS), Cookie-Banner (nur notwendige Cookies), einfachem Warenkorb (LocalStorage)
- SEO-Grundlagen: Titel/Description, OG-Metadaten, Sitemap, robots.txt, Manifest
- Formulare (Newsletter, Kontakt, Händler) via Netlify-Form-Handling (funktioniert automatisch auf Netlify)

## Struktur
- `index.html` — Startseite
- `produkte.html` — Produktkatalog
- `barista-dark.html`, `pistazien-buttercup.html`, `summer-edition.html`, `icecups.html` — Produktseiten
- `about.html`, `nachhaltigkeit.html`, `haendler.html`, `kontakt.html`
- `warenkorb.html` — einfacher E-Mail-Checkout
- `impressum.html`, `datenschutz.html`, `agb.html`
- `assets/css/styles.css`, `assets/js/main.js`
- `assets/images/*` — Logo & Platzhalterbilder

## Deployment (schnell)
1. Repository/Ordner auf GitHub oder lokal vorbereiten.
2. **Netlify** (empfohlen): Neues Projekt → Deploy from Git → Branch auswählen → fertig. (Formulare funktionieren out-of-the-box.)
   Alternativ **Vercel**/**GitHub Pages** — Formulare dann als `mailto:` oder über einen Dienst wie Formspree konfigurieren.
3. Domain verbinden (z. B. `buttrcup.ch`).

## ToDos vor Livegang
- **Impressum/Datenschutz/AGB**: Platzhalter `[[...]]` durch echte Firmendaten ersetzen; rechtlich prüfen lassen.
- **Bilder**: Platzhalterbilder in `assets/images` durch Produktfotos ersetzen.
- **E-Mail**: `info@buttrcup.com` ggf. anpassen.
- **Domain**: `manifest.webmanifest`, `sitemap.xml`, `<link rel="canonical">`-Einträge auf Ihre Domain setzen.
- Optional: Shopify/WooCommerce für echten Checkout integrieren.

Viel Erfolg mit dem Launch!
