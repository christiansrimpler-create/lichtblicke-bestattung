# Livegang auf Strato – Komplettanleitung

Stand: September 2026. Die technische Vorbereitung im Repo ist abgeschlossen –
dieser Plan führt von hier bis zur live geschalteten Domain und in den
laufenden Betrieb.

## Phase 0 – Bereits erledigt (Repo-Seite)

- [x] Deploy-Workflow `.github/workflows/strato.yml`: baut bei jedem Push für
  die Root-Domain (indexierbar) und lädt `_site/` per FTPS zu Strato.
  Solange die Secrets fehlen, wird der Upload kommentarlos übersprungen.
- [x] `src/.htaccess`: HTTPS + www als eine 301-Weiterleitung, 404-Seite,
  Browser-Caching.
- [x] `site_url` = `https://www.lichtblicke-bestattung.de` (Canonical,
  Sitemap, Social-Vorschau).
- [x] Datenschutzerklärung: Hosting-Abschnitt auf Strato AG umgestellt
  (Server in Deutschland, AVV nach Art. 28 DSGVO).
- [x] Schriften lokal, keine Cookies, kein Banner nötig.

## Phase 1 – Kollege im Strato-Kundenbereich (ca. 15 Minuten)

1. **FTP-Zugang anlegen:** Hosting-Paket öffnen → „Sicherheit" →
   „FTP-Zugänge" (je nach Paket „Passwörter festlegen"). Eigenen
   FTP-Benutzer anlegen, Benutzername + Passwort notieren.
2. **SSL aktivieren:** „Domains" → Domainverwaltung → bei
   `lichtblicke-bestattung.de` „SSL verwalten" → Zertifikat inkl. `www`
   aktivieren. (Kann sofort passieren, unabhängig vom Go-Live.)
3. **AVV abschließen:** Kundenbereich → „Mein Vertrag"/„Verträge" →
   Vertrag zur Auftragsverarbeitung online abschließen. (Darauf verweist
   unsere Datenschutzerklärung.)
4. **Drei Angaben sicher übermitteln** (Passwortmanager oder Telefon, nicht
   unverschlüsselte E-Mail): FTP-Server (i. d. R. `ftp.strato.de`),
   FTP-Benutzername, FTP-Passwort.
5. **Noch NICHT die Domain umstellen** – das ist der Go-Live-Moment und
   kommt erst in Phase 4, wenn die neue Seite fertig auf dem Webspace liegt.

## Phase 2 – Secrets im Repo hinterlegen (5 Minuten)

GitHub → Repo → *Settings → Secrets and variables → Actions* → drei
Repository-Secrets anlegen (Namen exakt so):

- `STRATO_FTP_SERVER`
- `STRATO_FTP_USER`
- `STRATO_FTP_PASSWORT`

Alternativ per CLI: `gh secret set STRATO_FTP_SERVER` usw.

## Phase 3 – Erster Upload und Test (noch ohne Domain-Umstellung)

1. Deploy anstoßen: Push aufs Repo oder GitHub → Actions →
   „Website bauen und zu Strato hochladen" → „Run workflow".
2. Prüfen, dass der Workflow grün ist und Dateien im Ordner
   `/lichtblicke-bestattung/` auf dem Webspace liegen.
3. Ab jetzt landet jeder Push (auch CMS-Änderungen des Kunden) automatisch
   auf dem Webspace.

## Phase 4 – Go-Live: Domain umstellen

**Vorher klären:** Liegt die alte WordPress-Seite im selben Strato-Paket?
Dann ist der Umzug nur ein Ordnerwechsel. Falls alte URLs bei Google gut
ranken (Search Console der alten Seite prüfen), vorher eine Liste der
wichtigsten alten Pfade besorgen – dafür ergänzen wir 301-Weiterleitungen
in `src/.htaccess`, damit kein Ranking verloren geht.

1. Kollege: „Domains" → Domainverwaltung → `www.lichtblicke-bestattung.de`
   → Verwendungsart „Webspace" → Zielverzeichnis **`/lichtblicke-bestattung`**
   (muss zum `ZIELORDNER` in `.github/workflows/strato.yml` passen).
   Gleiches für die Domain ohne `www`. **Damit ist die alte Seite offline
   und die neue live.**
2. Direkt danach durchtesten:
   - `https://www.lichtblicke-bestattung.de` lädt die neue Seite
   - `http://…` und die Variante ohne `www` leiten per 301 auf
     `https://www.…` weiter
   - `/sitemap.xml` und `/robots.txt` erreichbar
   - eine nicht existierende URL zeigt die eigene 404-Seite
   - Quelltext der Startseite: **kein** `noindex`, Canonical zeigt auf die
     eigene Domain
   - CMS-Login unter `/admin` funktioniert
3. Die GitHub-Pages-Vorschau läuft parallel weiter (noindex) – kann später
   abgeschaltet werden, stört aber nicht.

## Phase 5 – Nach dem Livegang (SEO & Formalia)

- **Google Search Console:** Property für die Domain anlegen,
  `/sitemap.xml` einreichen.
- **Google-Unternehmensprofil** beanspruchen/aktualisieren – Adresse und
  Telefonnummer exakt wie auf der Website (NAP).
- **Datenschutzerklärung rechtlich prüfen lassen** (steht als Grundfassung,
  war von Anfang an so vorgesehen).
- Nach einigen Tagen in der Search Console kontrollieren, ob die Seite
  indexiert wird und keine 404-Fehler von alten URLs auflaufen (falls doch:
  301-Weiterleitungen in `src/.htaccess` nachziehen).

## Laufender Betrieb (unverändert zum bisherigen Workflow)

- Änderungen laufen **immer über das Repo**: lokal/Claude Code oder über das
  CMS unter `/admin`. Jeder Push deployt automatisch zu Strato.
- **Niemals** Dateien direkt per FTP auf dem Webspace bearbeiten – der
  nächste Deploy überschreibt sie.
- CMS-Regel: Nach Code-Änderungen am Datenmodell offene CMS-Tabs neu laden,
  bevor gespeichert wird (sonst verwirft der Editor neue Felder).
