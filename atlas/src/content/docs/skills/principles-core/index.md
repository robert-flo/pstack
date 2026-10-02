---
title: The Core Principles
description: "Los 10 principios base de pstack: deciden cuánto construir y cuándo repensar el diseño."
grupo: skills
orden: 5
familia: The core principles
fuente: skills/
habla-con:
  - poteto-mode
  - 08-principles
  - principle-laziness-protocol
  - principle-foundational-thinking
  - principle-redesign-from-first-principles
  - principle-attack-the-premise
  - principle-subtract-before-you-add
  - principle-minimize-reader-load
  - principle-outcome-oriented-execution
  - principle-experience-first
  - principle-exhaust-the-design-space
  - principle-build-the-lever
---

## Jerarquía y clasificación

Dentro del sistema **pstack**, este índice agrupa los principios de la jerarquía:
> **Skills** › **Principles** › **The core principles**

Según la guía [`08-principles`](https://github.com/cursor/plugins/blob/main/pstack/docs/guide/08-principles.md), cada uno de los 23 principios se clasifica en uno de cinco bloques:

- **The core principles** (10 principios): deciden cuánto construir y cuándo repensar el diseño.
- **The architecture principles** (6 principios): deciden dónde viven el estado, la validación y la compatibilidad.
- **The verification principles** (4 principios): definen qué cuenta como prueba.
- **The delegation principles** (2 principios): mantienen cuerdo el trabajo en paralelo.
- **And one meta principle** (1 principio): convierte lecciones repetidas dos veces en un lint, check o script.

---

### Principios en esta sección:

1. **[Laziness Protocol](./principle-laziness-protocol/)** (Orden #10)  
   *Bias toward deletion and the smallest change that solves the problem.*

2. **[Foundational Thinking](./principle-foundational-thinking/)** (Orden #20)  
   *Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious.*

3. **[Redesign From First Principles](./principle-redesign-from-first-principles/)** (Orden #30)  
   *Apply when integrating a new requirement into an existing design. Redesign as if the requirement had been a foundational assumption from day one, instead of bolting it on.*

4. **[Attack the Premise](./principle-attack-the-premise/)** (Orden #40)  
   *Apply when two or more fixes that share one premise have failed the same gate. Take a census of which actors hold the imbalance before the next fix, then question the premise instead of writing another fix that assumes it.*

5. **[Subtract Before You Add](./principle-subtract-before-you-add/)** (Orden #50)  
   *Apply when sequencing an addition, refactor, or rewrite. Remove dead code, redundant validators, and stub references first, then build on the simpler base.*

6. **[Minimize Reader Load](./principle-minimize-reader-load/)** (Orden #60)  
   *Apply when reviewing or shaping code that's hard to trace. Count layers between question and answer, and hidden state in the reader's head; collapse one-caller wrappers and shrink mutable scope.*

7. **[Outcome-Oriented Execution](./principle-outcome-oriented-execution/)** (Orden #70)  
   *Apply during planned rewrites and migrations with explicit phase boundaries. Converge on the target architecture; don't preserve smooth intermediate states with throwaway compatibility code.*

8. **[Experience First](./principle-experience-first/)** (Orden #80)  
   *Apply when product, UX, or feature-scope tradeoffs come up. Choose user delight over implementation convenience; ship fewer polished features over more rough ones.*

9. **[Exhaust the Design Space](./principle-exhaust-the-design-space/)** (Orden #90)  
   *Apply when facing a novel UI interaction or architectural decision with no precedent in the codebase. Build 2-3 competing prototypes and compare side by side before committing.*

10. **[Build the Lever](./principle-build-the-lever/)** (Orden #100)  
   *Apply to any non-trivial work, not just bulk work: edits, migrations, analyses, checks. Build the tool that does it or proves it (codemod, script, generator, or a skill your subagents follow) instead of working by hand. The tool is the artifact a reviewer can rerun.*
