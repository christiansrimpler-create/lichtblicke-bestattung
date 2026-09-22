# Lichtblicke Bestattung – Website

Relaunch der Website von **Lichtblicke Bestattung** (Freiburg) – einer Marke der
Müller Bestattungen GmbH. Gebaut mit dem statischen Seitengenerator
[Eleventy](https://www.11ty.dev/). Die Veröffentlichung auf GitHub Pages geschieht
automatisch bei jedem Push (siehe `.github/workflows/pages.yml`).

## Vorschau-Adresse

https://christiansrimpler-create.github.io/lichtblicke-bestattung/

## Inhalte bearbeiten

### Komfortabel im Browser (CMS)

Alle Texte, Kontaktdaten und Pakete lassen sich ohne Code über das eingebaute
Redaktionssystem **Sveltia CMS** pflegen:

```
https://christiansrimpler-create.github.io/lichtblicke-bestattung/admin/
```

Login per **Access Token** (Personal Access Token) – kein Server/Worker nötig.
Einrichtung siehe **[CMS-SETUP.md](CMS-SETUP.md)**.

### Direkt in den Dateien

Alle Inhalte liegen als reine Daten in `src/_data/` – die `.njk`-Dateien sind
nur noch das Layout und greifen auf diese Daten zu:

| Was | Datei |
| --- | --- |
| Kontaktdaten, Telefon, Claim, Footer, Impressum-Daten (zentral) | `src/_data/einstellungen.yaml` |
| Die vier Bestattungspakete & Leistungen | `src/_data/pakete.yaml` |
| Texte der einzelnen Seiten | `src/_data/seiten/*.yaml` |
| Layout/HTML der Seiten | `src/*.njk` |
| CMS-Oberfläche & Feld-Konfiguration | `src/admin/` |
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

- **Preise & Leistungen** der vier Pakete von der alten Seite übernommen (1.990 € / 2.490 €
  inkl. MwSt) – bitte auf Aktualität prüfen.
- **Datenschutzerklärung** rechtlich prüfen lassen.
- **Karte** auf dem Kontaktbereich: Marker-Koordinaten ggf. exakt setzen.

## Hosting auf Strato (Produktion)

Der Workflow `.github/workflows/strato.yml` baut die Seite bei jedem Push für
die Root-Domain (dadurch automatisch **indexierbar**, im Gegensatz zur
GitHub-Pages-Vorschau) und lädt `_site/` per FTPS auf den Strato-Webspace.
Die GitHub-Pages-Vorschau unter dem Unterpfad bleibt parallel bestehen
(weiterhin `noindex`).

Einmalig einzurichten:

1. In der **Strato-Verwaltung** einen FTP-Zugang anlegen bzw. das
   Master-Passwort setzen (Sicherheit → FTP-Zugänge).
2. Im GitHub-Repo unter *Settings → Secrets and variables → Actions* drei
   Secrets anlegen: `STRATO_FTP_SERVER` (in der Regel `ftp.strato.de`),
   `STRATO_FTP_USER`, `STRATO_FTP_PASSWORT`. Ohne diese Secrets überspringt
   der Workflow den Upload mit einem Hinweis (kein Fehler).
3. In der Strato-Verwaltung die Domain `lichtblicke-bestattung.de` (mit und ohne
   www) auf den
   Ordner `/lichtblicke-bestattung/` zeigen lassen (muss zum `ZIELORDNER` im
   Workflow passen) und das **SSL-Zertifikat** für die Domain aktivieren.
4. Danach einen Deploy anstoßen (Push oder in Actions „Run workflow“) und
   prüfen: `https://lichtblicke-bestattung.de` lädt, `http://…` und die
   Variante mit `www` leiten per 301 weiter (Regeln in `src/.htaccess`).

### Nach dem Livegang (SEO)

- **Sitemap** (`/sitemap.xml`) in der **Google Search Console** einreichen.
- **Titel & Meta-Descriptions** fürs lokale SEO optimieren (Stichwort „Freiburg“
  / „Bestatter“) – z. B. Start: „Bestatter Freiburg – würdevoll & bezahlbar“.
- **Google-Unternehmensprofil** anlegen/beanspruchen (stärkster lokaler Hebel),
  mit identischen Adress-/Telefondaten (NAP).
