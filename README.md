# Lichtblicke Bestattung – Website

Relaunch der Website von **Lichtblicke Bestattung** (Freiburg) – einer Marke der
Müller Bestattungen GmbH. Gebaut mit dem statischen Seitengenerator
[Eleventy](https://www.11ty.dev/). Die Veröffentlichung auf GitHub Pages geschieht
automatisch bei jedem Push (siehe `.github/workflows/pages.yml`).

## Vorschau-Adresse

https://christiansrimpler-create.github.io/lichtblicke-bestattung/

## Inhalte bearbeiten

Alle Inhalte liegen im Ordner `src/`:

| Was | Datei |
| --- | --- |
| Kontaktdaten, Telefon, Texte (zentral) | `src/_data/einstellungen.yaml` |
| Die vier Bestattungspakete & Leistungen | `src/_data/pakete.yaml` |
| Startseite | `src/index.njk` |
| Über uns / Preise / Bestattung im Wandel / Kontakt | `src/*.njk` |
| Impressum & Datenschutz | `src/impressum.njk`, `src/datenschutz.njk` |
| Logo & Bilder | `src/assets/img/` |
| Gestaltung (Farben, Schrift) | `src/assets/css/style.css` |

Das Logo-Grün liegt als CSS-Variable `--lime` (`#84ae1e`), das tiefe Grün als
`--green` in `src/assets/css/style.css`.

## Lokal ansehen

```bash
npm install      # einmalig
npm run serve    # startet Vorschau auf http://localhost:8080
```

## Veröffentlichen

Änderungen committen und pushen – die GitHub Action baut und veröffentlicht
automatisch:

```bash
git add -A && git commit -m "Inhalt aktualisiert" && git push
```

## Offene Punkte (vor dem echten Livegang)

- **Preise** der vier Pakete ergänzen (stehen aktuell auf „auf Anfrage“).
- **Paket-Leistungen** prüfen – sie sind ein erster Entwurf.
- **Datenschutzerklärung** rechtlich prüfen lassen.
- **Karte** auf dem Kontaktbereich: Marker-Koordinaten ggf. exakt setzen.
