# Pokedex

Diese Pokedex-Seite ist eine Pflichtaufgabe der [Developer Akademie](https://developerakademie.com/). Sie laedt Daten ueber die [PokeAPI](https://pokeapi.co/) und stellt Pokemon in einer kompakten, interaktiven Galerie dar.

## Ueberblick

Die Seite zeigt eine uebersichtliche Liste von Pokemon-Karten mit Bild, Typen und Basisinformationen. Ueber die Suche kannst du nach Namen filtern. Einzelne Pokemon lassen sich in einem Dialogfenster mit Detailansicht oeffnen und mit den Navigationsbuttons direkt weiterblaettern.

## Funktionen

- Laden aller Pokemon ueber die PokeAPI
- Suche nach Pokemon-Namen
- Paginierung mit Vor- und Zurueck-Buttons
- Detailansicht in einem Dialog
- Navigation zum naechsten oder vorherigen Pokemon in der Detailansicht
- Abspielen des Pokemon-Rufs in der Detailansicht
- Impressum-Seite im Unterordner `pages/`

## Projektstruktur

- `index.html` - Startseite der Pokedex-App
- `style.css` - Styling der Anwendung
- `script.js` - Startlogik und Initialisierung
- `scripts/const.js` - DOM-Referenzen und Konstanten
- `scripts/var.js` - Globale Variablen
- `scripts/page_func.js` - UI-Events und Seitenlogik
- `scripts/pokemons.js` - Datenzugriff und Rendering
- `scripts/templates.js` - HTML-Templates fuer Karten und Details
- `pages/impressum.html` - Impressum und Datenschutz

## Starten

Die Anwendung ist eine statische Webseite. Du kannst sie lokal mit einem beliebigen Webserver oeffnen, zum Beispiel mit der Live-Server-Erweiterung in VS Code oder ueber einen einfachen lokalen Server.

Beispiel mit Node.js:

```bash
npx serve .
```

Danach die angezeigte Adresse im Browser oeffnen.

## Hinweis

Die Seite nutzt beim Laden automatisch `init()` und faehrt damit die Datenabfrage und erste Darstellung hoch.
