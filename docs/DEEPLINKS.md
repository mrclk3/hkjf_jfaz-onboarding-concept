# Direktlinks für die Einberufungs-Mail

Das Onboarding liest beim Aufruf zwei optionale URL-Parameter. So landet jede Person direkt
in „ihrem“ Lehrgang, ohne erst den Auswahl-Dialog zu sehen.

| Parameter | Wirkung |
| --- | --- |
| `kurs` | Wählt den Lehrgang vor (Kurs-ID aus der Tabelle unten). Der Auswahl-Dialog entfällt, Schritt 1 gilt als erledigt. War vorher ein anderer Lehrgang gespeichert, startet der Fortschritt neu. |
| `schritt` | Springt direkt zu einem Abschnitt: `lehrgang`, `anreise`, `campus`, `ablauf`, `packliste`, `umgebung`, `quiz` |

Unbekannte Werte werden ignoriert (dann verhält sich die Seite wie ohne Parameter).
Wählt jemand auf der Seite einen anderen Lehrgang, wird `?kurs=` in der Adresszeile mitgeführt,
sodass ein Lesezeichen oder ein weitergeleiteter Link immer den aktuellen Lehrgang enthält.

## Beispiele

```
https://<domain>/?kurs=jf-wertungsrichter
https://<domain>/?kurs=jf-elearning-jugendarbeit&schritt=anreise
https://<domain>/?kurs=jf-survival-outdoor&schritt=packliste
```

Ohne Parameter (z. B. über die offizielle Website verlinkt) öffnet sich beim ersten Besuch der Auswahl-Dialog.

## Kurs-IDs

Quelle: `data/coursesData.ts`. Neue Lehrgänge dort ergänzen; die ID ist dann sofort als `kurs=` nutzbar.

| Kurs-ID | Lehrgang | Format |
| --- | --- | --- |
| `jf-jugendarbeit-kompakt` | Jugendarbeit in der Feuerwehr | Präsenz |
| `jf-grundlagen-jugendarbeit` | Grundlagen der Jugendarbeit | Präsenz |
| `jf-rechte-und-pflichten` | Rechte und Pflichten in der Kinder- und Jugendfeuerwehr | Präsenz |
| `jf-wertungsrichter` | Wertungsrichter auf Kreis- und Stadtebene | Präsenz |
| `jf-24-stunden-uebungen` | 24 Stunden Übungen | Präsenz |
| `jf-wunden-schminken` | Wunden schminken | Präsenz |
| `jf-feuerwehrtechnik-spielerisch` | Feuerwehrtechnisches Wissen spielerisch vermitteln | Präsenz |
| `kf-arbeit-mit-kindern` | Arbeit mit Kindern unter 10 in der Feuerwehr | Präsenz |
| `kf-experimentieren` | Experimentieren in der Kindergruppe | Präsenz |
| `kf-brandschutzerziehung` | Brandschutzerziehung in der Kinderfeuerwehr: Streichhölzer anzünden und Verhalten im Brandfall | Präsenz |
| `jf-survival-outdoor` | Jugendfeuerwehr goes wild – mit dem Rucksack unterwegs | Präsenz |
| `jf-fit-for-fire` | Fit For Fire | Präsenz |
| `jf-erlebnispaedagogik` | Erlebnispädagogik und Teambuilding | Präsenz |
| `jf-kochen-zeltlager` | Kochen im Zeltlager | Präsenz |
| `jf-sitzungen-moderieren` | Sitzungen leiten und moderieren | Präsenz |
| `jf-kindeswohl-praevention` | Sexuelle Gewaltprävention | Präsenz |
| `jf-psnv-krisensicher` | PSNV – krisensicher in den Einsatz | Präsenz |
| `jf-social-media` | Social Media für die Kinder- und Jugendfeuerwehr nutzen | Präsenz |
| `jf-elearning-jugendarbeit` | Jugendarbeit in der Feuerwehr (e-learning) | Online |
| `gremium-online-wertungsrichter` | Seminar für Wertungsrichter auf Landesebene (online) | Online |
| `gremium-online-oeffentlichkeitsarbeit` | Fachtagung Öffentlichkeitsarbeit auf Landesebene (online) | Online |
