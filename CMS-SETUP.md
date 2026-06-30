# CMS einrichten (Sveltia CMS)

Die Website hat ein eingebautes Redaktionssystem (**Sveltia CMS**), mit dem sich
**alle Texte, Kontaktdaten und Pakete** bequem im Browser bearbeiten lassen –
ohne Code. Gespeicherte Änderungen werden automatisch ins GitHub-Repository
geschrieben und über GitHub Actions live gestellt (Dauer: ca. 1–2 Minuten).

Die Oberfläche erreichst du unter:

```
https://christiansrimpler-create.github.io/lichtblicke-bestattung/admin/
```

> **Was schon fertig ist:** Die Admin-Oberfläche (`src/admin/`), die komplette
> Feld-Konfiguration (`src/admin/config.yml`) und die pflegbaren Datendateien
> (`src/_data/`) sind angelegt. Der Login funktioniert per **Access Token** –
> kein Server, kein Cloudflare-Worker, keine OAuth-App nötig.

---

## Login per Access Token (Personal Access Token)

Sveltia CMS meldet sich direkt bei GitHub an – über einen persönlichen
Zugriffsschlüssel (*Personal Access Token*, kurz **PAT**). Das ist genau das
gleiche Verfahren wie bei der austroPott-Seite.

### Schritt 1 – Zugang einrichten (einmalig, durch die Agentur)

Jede Person, die Inhalte pflegen soll, braucht:

- einen **GitHub-Account**, und
- **Schreibrecht** auf das Repository: auf GitHub →
  `christiansrimpler-create/lichtblicke-bestattung` → **Settings → Collaborators**
  → die Person mit der Rolle **„Write"** einladen (sie muss die Einladung per
  E-Mail bestätigen).

### Schritt 2 – Anmelden & Token erstellen

1. Die Adresse `…/lichtblicke-bestattung/admin/` aufrufen.
2. Auf **„Sign In with Token"** klicken.
3. Es öffnet sich ein Dialog mit einem **Link zur GitHub-Token-Seite** – die
   benötigten Berechtigungen sind dort bereits vorausgewählt.
4. Auf GitHub eine **Ablaufzeit** wählen (z. B. 90 Tage oder „No expiration")
   und den Token erzeugen. Den angezeigten Token **kopieren**
   (wird nur einmal angezeigt!).
5. Zurück im CMS den Token in das Feld **einfügen** – fertig, man ist angemeldet.

> Der Token wird nur lokal im Browser gespeichert. Auf einem neuen Gerät, in
> einem anderen Browser oder nach Ablauf des Tokens meldet man sich einfach
> erneut mit einem neuen Token an.

### Sicherheits-Tipp (optional, empfohlen)

Statt des vorausgewählten „klassischen" Tokens kann man einen **Fine-grained
Personal Access Token** mit minimalen Rechten erstellen
(GitHub → **Settings → Developer settings → Personal access tokens →
Fine-grained tokens**):

- **Repository access:** nur `lichtblicke-bestattung`
- **Permissions → Contents:** **Read and write**

So hat der Token nur Zugriff auf genau diese eine Website und nichts anderes.

---

## Bedienung

Nach der Anmeldung links die Bereiche wählen:

- **Einstellungen & Kontakt** – Telefon, E-Mail, Adresse, Claim, Footer, Impressum-Daten
- **Pakete & Preise** – die vier Bestattungspakete
- **Seiten (Texte)** – die Texte jeder einzelnen Seite

Bearbeiten → **Speichern**. Die Änderung wird committet und nach ca. 1–2 Minuten
automatisch veröffentlicht.

---

## Hinweise

- **Layout bleibt geschützt:** Über das CMS lassen sich nur Texte/Inhalte ändern,
  nicht das Design oder die HTML-Struktur. Das ist Absicht.
- **Version pinnen (optional):** In `src/admin/index.html` lädt das CMS aktuell
  die jeweils neueste Sveltia-Version. Für maximale Stabilität auf einer
  Kundenseite kann man auf eine feste Version pinnen, z. B.
  `https://unpkg.com/@sveltia/cms@0.x.x/dist/sveltia-cms.js`.
- **Domain-Umzug:** Beim Wechsel auf die echte Domain anpassen: `PATH_PREFIX`
  (in `.github/workflows/pages.yml` auf `/`) sowie `site_url`/`display_url`
  in `src/admin/config.yml`.
