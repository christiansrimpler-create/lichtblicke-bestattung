# CMS einrichten (Sveltia CMS)

Die Website hat ein eingebautes Redaktionssystem (**Sveltia CMS**), mit dem sich
**alle Texte, Kontaktdaten und Pakete** bequem im Browser bearbeiten lassen –
ohne Code. Gespeicherte Änderungen werden automatisch ins GitHub-Repository
geschrieben und über GitHub Actions live gestellt (Dauer: ca. 1–2 Minuten).

Die Oberfläche erreichst du nach dem Setup unter:

```
https://christiansrimpler-create.github.io/lichtblicke-bestattung/admin/
```

> **Was schon fertig ist:** Die Admin-Oberfläche (`src/admin/`), die komplette
> Feld-Konfiguration (`src/admin/config.yml`) und die pflegbaren Datendateien
> (`src/_data/`) sind angelegt. Es fehlt nur noch der **Login** – dafür sind die
> drei Schritte unten nötig (einmalig, ca. 10 Minuten).

---

## Warum ein Login-Setup nötig ist

Die Seite läuft auf **GitHub Pages** (statisches Hosting ohne Server). Ein
Git-basiertes CMS braucht aber einen kleinen Vermittler, der den GitHub-Login
abwickelt. Dafür nutzen wir den offiziellen, kostenlosen **Cloudflare-Worker**
[`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth). Ihr besitzt
ihn selbst – keine Abhängigkeit von Drittanbieter-Diensten.

---

## Schritt 1 – GitHub OAuth-App anlegen

1. Auf GitHub einloggen → **Settings** → **Developer settings** →
   **OAuth Apps** → **New OAuth App**.
   (Direktlink: <https://github.com/settings/developers>)
2. Felder ausfüllen:
   - **Application name:** z. B. `Lichtblicke CMS`
   - **Homepage URL:** `https://christiansrimpler-create.github.io/lichtblicke-bestattung/`
   - **Authorization callback URL:** vorerst irgendeinen Platzhalter eintragen,
     z. B. `https://example.com/callback` – wird in Schritt 3 korrigiert.
3. **Register application** klicken.
4. **Client ID** notieren. Dann **Generate a new client secret** klicken und das
   **Client Secret** notieren (wird nur einmal angezeigt!).

---

## Schritt 2 – Cloudflare-Worker deployen

1. Kostenlosen Cloudflare-Account anlegen/einloggen: <https://dash.cloudflare.com>
2. Den Worker `sveltia-cms-auth` deployen – am einfachsten über den
   **„Deploy to Cloudflare"**-Button auf der Projektseite:
   <https://github.com/sveltia/sveltia-cms-auth>
   *(Alternativ lokal: Repo klonen und `wrangler deploy` ausführen.)*
3. Nach dem Deploy die **Worker-URL** notieren, Form:
   ```
   https://sveltia-cms-auth.<DEIN-SUBDOMAIN>.workers.dev
   ```
4. Im Cloudflare-Dashboard zum Worker → **Settings → Variables** → folgende
   Umgebungsvariablen anlegen:

   | Variable               | Wert                                                    | Pflicht |
   |------------------------|---------------------------------------------------------|---------|
   | `GITHUB_CLIENT_ID`     | Client ID aus Schritt 1                                 | ✅       |
   | `GITHUB_CLIENT_SECRET` | Client Secret aus Schritt 1 (als *Secret/encrypted*)    | ✅       |
   | `ALLOWED_DOMAINS`      | `christiansrimpler-create.github.io`                    | empfohlen |

   > `ALLOWED_DOMAINS` schränkt ein, welche Websites den Worker zum Login nutzen
   > dürfen (Sicherheit). Mehrere Domains kommagetrennt; beim späteren Umzug auf
   > die echte Domain diese hier ergänzen (z. B. `*.lichtblicke-bestattung.de`).

---

## Schritt 3 – Worker mit dem CMS verbinden

1. **Callback-URL korrigieren:** Zurück zur GitHub-OAuth-App (Schritt 1) →
   **Authorization callback URL** auf die echte Worker-URL setzen:
   ```
   https://sveltia-cms-auth.<DEIN-SUBDOMAIN>.workers.dev/callback
   ```
   Speichern.
2. **base_url eintragen:** In `src/admin/config.yml` die Platzhalter-Zeile
   ersetzen:
   ```yaml
   backend:
     name: github
     repo: christiansrimpler-create/lichtblicke-bestattung
     branch: main
     base_url: https://sveltia-cms-auth.<DEIN-SUBDOMAIN>.workers.dev
   ```
3. Änderung committen & pushen. Nach dem nächsten Deploy ist der Login aktiv.

---

## Schritt 4 – Wer darf Inhalte pflegen?

Jede Person, die Inhalte bearbeiten soll, braucht:

- einen **GitHub-Account**, und
- **Schreibrecht** auf das Repository
  (`christiansrimpler-create/lichtblicke-bestattung` → **Settings → Collaborators**
  → Person mit „Write"-Rolle einladen).

Für den Kunden legt die Agentur in der Regel einen eigenen GitHub-Account an
oder lädt seine bestehende GitHub-Adresse als Collaborator ein.

---

## Bedienung

1. `…/lichtblicke-bestattung/admin/` aufrufen.
2. **Mit GitHub anmelden**.
3. Links die Bereiche wählen:
   - **Einstellungen & Kontakt** – Telefon, E-Mail, Adresse, Claim, Footer, Impressum-Daten
   - **Pakete & Preise** – die vier Bestattungspakete
   - **Seiten (Texte)** – die Texte jeder einzelnen Seite
4. Bearbeiten → **Save/Speichern**. Die Änderung wird committet und nach
   ca. 1–2 Minuten automatisch veröffentlicht.

---

## Hinweise

- **Layout bleibt geschützt:** Über das CMS lassen sich nur Texte/Inhalte ändern,
  nicht das Design oder die HTML-Struktur. Das ist Absicht.
- **Version pinnen (optional):** In `src/admin/index.html` lädt das CMS aktuell
  die jeweils neueste Sveltia-Version. Für maximale Stabilität auf einer
  Kundenseite kann man auf eine feste Version pinnen, z. B.
  `https://unpkg.com/@sveltia/cms@0.x.x/dist/sveltia-cms.js`.
- **Domain-Umzug:** Beim Wechsel auf die echte Domain zusätzlich anpassen:
  `PATH_PREFIX` (in `.github/workflows/pages.yml` auf `/`), `site_url`/`display_url`
  in `config.yml`, `ALLOWED_DOMAINS` im Worker und die Homepage-URL der OAuth-App.
