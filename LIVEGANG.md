# So bringen wir die neue Website online – einfache Anleitung

Stand: September 2026. Ohne Fachbegriffe – jeder Schritt sagt, wer ihn macht.

**Die Idee in einem Satz:** Die neue Website wird zuerst unsichtbar auf den
Strato-Speicher gelegt, gründlich geprüft – und ganz am Ende wird mit einem
einzigen Klick von der alten auf die neue Website umgeschaltet.

**Wer macht was:**
- Der Kollege mit Strato-Zugang: zwei kurze Einsätze (Teil A jetzt,
  Teil B beim Umschalten)
- Christian / Claude: alles Technische dazwischen
- Die alte Website bleibt bis zum Umschalt-Klick vollständig online

---

## Teil A – Vorbereitung bei Strato (Kollege, ca. 15 Minuten, jetzt)

1. Auf **www.strato.de** einloggen und das Paket öffnen, in dem die
   Website liegt.
2. Im Menü den Punkt **„Sicherheit"** suchen, darin **„FTP-Zugänge"**
   (heißt je nach Paket auch „Passwörter festlegen").
   Dort einen **neuen Zugang anlegen**. Strato zeigt einen Benutzernamen an,
   das Passwort legt man selbst fest. **Beides aufschreiben.**
   *Wozu? Mit diesem Zugang darf unser System die neue Website automatisch
   auf den Strato-Speicher legen. Kein Mensch muss damit je arbeiten.*
3. Im Menü **„Mein Vertrag"** (oder „Verträge") nach **„Auftragsverarbeitung"**
   bzw. **„AVV"** suchen und online abschließen.
   *Wozu? Ein Standard-Datenschutzvertrag mit Strato, Pflicht für jede
   Firmen-Website. Zwei Klicks, kostet nichts.*
4. **Drei Angaben an Christian geben** – am besten am Telefon oder über
   einen Passwort-Manager, nicht einfach in eine E-Mail schreiben:
   - Servername (steht bei den FTP-Zugängen, meist `ftp.strato.de`)
   - Benutzername
   - Passwort
5. **Wichtig: Sonst nichts ändern!** Besonders die Einstellungen der Domain
   `lichtblicke-bestattung.de` nicht anfassen – die alte Website soll erst
   offline gehen, wenn die neue fertig bereitliegt (Teil B).

## Teil B – Der Umschalt-Klick (Kollege, 2 Minuten, erst nach Freigabe)

Erst wenn Christian sagt: „Die neue Seite liegt bereit."

1. Bei Strato einloggen → Menü **„Domains"** → **„Domainverwaltung"**.
2. Bei `lichtblicke-bestattung.de` auf **„Einstellungen"** klicken. Dort ist
   hinterlegt, aus welchem **Ordner** die Website kommt – aktuell der Ordner
   der alten Seite.
3. Diesen Eintrag ändern auf: **`/lichtblicke-bestattung`**
4. Falls `www.lichtblicke-bestattung.de` separat aufgeführt ist: dort
   denselben Ordner eintragen.
5. Christian Bescheid geben. **Ab diesem Moment ist die neue Seite online.**

*Sicherheitsnetz: Sollte irgendetwas nicht stimmen, trägt man einfach wieder
den alten Ordner ein – dann ist sofort die alte Seite zurück.*

---

## Was Christian/Claude dazwischen und danach machen

**Nach Teil A** (sobald die drei Angaben da sind):
- Die Zugangsdaten werden verschlüsselt im System hinterlegt.
- Die neue Website wird automatisch auf den Strato-Speicher geladen –
  in einen eigenen Ordner, die alte Seite merkt davon nichts.
- Kurzer Test, dass alles vollständig angekommen ist → dann Freigabe
  für Teil B.

**Direkt nach Teil B** (Kontrolle der neuen Seite):
- Die Seite lädt unter `https://lichtblicke-bestattung.de`.
- Alle alten Adressen (auch mit `www.` davor und die alten
  WordPress-Links) leiten automatisch auf die richtigen neuen Seiten um –
  gespeicherte Links und Google-Einträge laufen also nicht ins Leere.
- Die Bearbeitung der Inhalte über `/admin` funktioniert weiter wie gewohnt.

**In den Tagen danach:**
- Website bei Google anmelden (Search Console) und das
  Google-Unternehmensprofil aktualisieren – Adresse und Telefonnummer
  überall identisch.
- Datenschutzerklärung einmal von einem Anwalt prüfen lassen (war von
  Anfang an so geplant).
- Nach ein paar Wochen: Die alte WordPress-Seite liegt dann immer noch
  ungenutzt auf dem Speicher. Einmal sichern und danach löschen – eine
  veraltete, ungepflegte Installation ist sonst ein Sicherheitsrisiko.

## Der Alltag danach – ändert sich nichts

- Inhalte pflegt der Kunde weiter wie gewohnt über die
  Bearbeitungsoberfläche (`/admin`). Jede gespeicherte Änderung erscheint
  nach wenigen Minuten automatisch auf der Website.
- Größere Änderungen macht die Agentur wie bisher.
- Niemand muss je manuell Dateien zu Strato hochladen – das passiert
  vollautomatisch im Hintergrund.
