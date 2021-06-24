---
name: Bug report
about: Basistemplate für Bugs
title: "[BUG] Titel"
labels: bug
assignees: ''

---

**Problem**

Beim mehrfachem Klick auf den Button "weitere Elemente laden..." erhält der Benutzer nach einiger Zeit eine Fehlermeldung mit dem Inhalt, dass ein nicht identifizierbarer Fehler aufgetreten ist.

**Reproduktionsschritte**

1. Navigation zu "Startseite"
2. Mehrfach auf den Button "weitere Elemente laden..." klicken

**Lösung**

Um das oben genannte Problem zu beheben, wird der betroffene Button nach erstmaligem Klick solange deaktiviert, bis der Server die weiteren Elemente geladen hat.
