---
title: Fix Root Causes
description: "Apply when debugging. Trace each symptom to its root cause and fix it there; reproduce first, ask why until you reach it, resist nil-check guards that silence crashes."
grupo: skills
orden: 180
fuente: skills/principle-fix-root-causes/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-prove-it-works
  - principle-sequence-verifiable-units
---

> **Regla de oro:** *Apply when debugging. Trace each symptom to its root cause and fix it there; reproduce first, ask why until you reach it, resist nil-check guards that silence crashes.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The verification principles` (Principio 2 de 4 del bloque).
* **Qué es:** Un principio de depuración: no arreglar síntomas. Rastrear cada problema hasta su causa raíz y arreglarla ahí.
* **Para qué sirve:** Los parches de síntoma se acumulan: cada workaround hace el sistema más difícil de razonar y el bug real sigue ahí. Arreglar la causa raíz cuesta más al principio, pero reduce el tiempo total de depuración.
* **Cuándo se usa:** Al depurar cualquier problema.

---

### 2. El Patrón

* **Reproducir primero.** Sin reproducción no hay forma de comprobar que el arreglo funciona (ver **Prove It Works**).
* **Preguntar "por qué" hasta llegar a la causa raíz.**
* **No agregar guards** (un nil check para silenciar un crash es un parche de síntoma).
* **Si un workaround necesita un comentario de un párrafo para justificarse, el código está mal** (se arregla el código, no el comentario).
* **Buscar el patrón, no solo la instancia** (grep del mismo patrón y arreglo de todas las instancias).
* **Cuando se atasca, instrumentar, no adivinar** (agregar logging, leer el error real).
* **Bugs al reiniciar: sospechar del estado antes que del código.** Cuando algo "falla después de reiniciar", lo primero es sospechar de estado persistente viejo: archivos de configuración, cachés, lock files, estado serializado. Si borrar un archivo de estado restaura el comportamiento, la validación de estado es el arreglo prioritario.

---

### 3. Relación con otros archivos

* **[Prove It Works](/pstack/skills/principle-prove-it-works/)**: el par del bloque. Prove It Works manda verificar contra el artefacto real; Fix Root Causes manda que, cuando esa verificación encuentra un problema, el arreglo vaya a la causa y no al síntoma. Reproducir primero es lo que hace verificable el arreglo.
* **[Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/)**: trocear el trabajo en unidades verificables; con este principio, cada unidad que falla se depura hasta su causa antes de seguir.
* **`08-principles`**: la guía del manual de uso donde este bloque se documenta (aún no replicada, se cita sin enlace).

---

### 4. Ejemplo breve

Un script crashea al arrancar con un `TypeError: cannot read property x of undefined`, y el arreglo tentador es un `if (obj) ` alrededor de la llamada.

* **Con el principio:** se reproduce, se pregunta por qué `obj` es undefined, y se llega a que el archivo de caché que lo carga quedó corrupto después de un reinicio. El arreglo real es validar el estado persistente al cargar (y borrar el archivo corrupto si no pasa la validación), no silenciar el crash. Luego se hace grep del patrón de carga sin validar y se arreglan todas las instancias.

---

### 5. Redirección Rápida en Chat
Si la IA empieza a apilar guards o checks para silenciar fallos:
> `/poteto-mode aplica 'principle-fix-root-causes'. No tapes el síntoma: reproduce, pregunta por qué hasta la causa raíz y arregla ahí.`
