---
title: Exhaust the Design Space
description: "Apply when facing a novel UI interaction or architectural decision with no precedent in the codebase. Build 2-3 competing prototypes and compare side by side before committing."
grupo: skills
orden: 90
fuente: skills/principle-exhaust-the-design-space/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - prototype
  - architect
  - principle-experience-first
---

> **Regla de oro:** *Apply when facing a novel UI interaction or architectural decision with no precedent in the codebase. Build 2-3 competing prototypes and compare side by side before committing.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 9 de 10).
* **Qué es:** Un principio de exploración: cuando una interacción o una decisión de arquitectura no tiene precedente, se exploran varias alternativas concretas antes de implementar.
* **Para qué sirve:** Construir lo equivocado cuesta más que explorar tres opciones. Comparar prototipos reales lado a lado saca a la luz diferencias que una discusión en abstracto no ve.
* **Cuándo se usa:** Ante una interacción de interfaz nueva, una decisión de arquitectura con varios caminos viables o una decisión de producto donde la experiencia depende de la sensación y no de la lógica. Aparece sobre todo en tareas de tipo `prototype` y `architect`.

---

### 2. La regla

1. **Construye 2 o 3 prototipos o bocetos que compitan** cuando la respuesta correcta no es obvia.
2. **Compáralos lado a lado.**
3. **Solo entonces comprométete** con uno.

"Diseñarlo dos veces" es esta misma regla con otro nombre. **Una segunda variante de la primera forma no cuenta:** las alternativas tienen que ser formas distintas, no el mismo diseño con otro color.

---

### 3. Cuándo aplica y cuándo no

**Aplica:**
* Interacciones de interfaz nuevas, sin precedente en el código.
* Decisiones de arquitectura con varios enfoques viables.
* Decisiones de producto donde la experiencia depende de la sensación, no de la lógica.

**No aplica:**
* Implementación mecánica donde el patrón ya está establecido.
* Arreglos de bugs o refactorizaciones con un estado destino claro.
* Cambios donde las restricciones dejan un solo enfoque viable.

---

### 4. Relación con otros archivos

* **[Experience First](/pstack/skills/principle-experience-first/)**: comparte la idea de prototipar antes de comprometerse. Ese principio define el objetivo (la experiencia de quien usa el trabajo); este da el método para elegir cuando el objetivo admite varias formas.
* **[Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/)**: cuando un requisito nuevo obliga a rediseñar y hay más de un diseño posible desde cero, este principio pide explorar esas opciones antes de elegir.
* **[Laziness Protocol](/pstack/skills/principle-laziness-protocol/)**: lo equilibra. Los prototipos son desechables y mínimos; explorar tres opciones no significa construir tres productos.
* **[Outcome-Oriented Execution](/pstack/skills/principle-outcome-oriented-execution/)**: es su contraparte. Ese se aplica cuando el estado destino ya está claro; este, cuando todavía no lo está.

---

### 5. Ejemplo breve

Hay que diseñar cómo el usuario reordena una lista larga de tareas, algo que la app nunca tuvo.

* **Mal:** se implementa arrastrar y soltar directamente en producción porque "es lo normal", y a la semana resulta incómodo en pantallas táctiles.
* **Bien:** se hacen tres prototipos en HTML desechable (arrastrar y soltar, flechas de subir y bajar, y un modo "mover a posición N"), se prueban lado a lado en escritorio y en móvil, y recién entonces se elige. Una versión de arrastrar con otra animación no habría contado como alternativa.

---

### 6. Redirección Rápida en Chat
Si la IA se compromete con el primer diseño en algo sin precedente:
> `/poteto-mode aplica 'principle-exhaust-the-design-space'. Antes de implementar: dame 2 o 3 prototipos con formas distintas y compáralos lado a lado.`
