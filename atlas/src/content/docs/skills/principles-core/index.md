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
