---
title: Subtract Before You Add
description: "Apply when sequencing an addition, refactor, or rewrite. Remove dead code, redundant validators, and stub references first, then build on the simpler base."
grupo: skills
orden: 50
fuente: skills/principle-subtract-before-you-add/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - refactoring
  - principle-laziness-protocol
  - principle-minimize-reader-load
---

> **Regla de oro:** *Apply when sequencing an addition, refactor, or rewrite. Remove dead code, redundant validators, and stub references first, then build on the simpler base.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 5 de 10).
* **Qué es:** Un principio de secuencia: al evolucionar un sistema, primero se quita complejidad y después se construye.
* **Para qué sirve:** Evita que cada añadido se apile sobre lo que ya sobra. Quitar primero deja menos código, revela la estructura esencial y normalmente vuelve obvio el siguiente diseño.
* **Cuándo se usa:** Al secuenciar un añadido, una refactorización o una reescritura, antes de escribir la primera línea nueva. Aparece sobre todo en tareas de tipo `refactoring`, `feature` y en la limpieza de prompts y de skills.

---

### 2. El Patrón

1. **Secuencia la remoción antes de la construcción.** Código muerto, validadores redundantes y referencias vacías se van primero; lo nuevo se apoya sobre la base ya simplificada.
2. **Corta antes de pulir.** Llega al mínimo que resuelve el problema antes de invertir en calidad; pulir algo que va a desaparecer es trabajo perdido.
3. **Diseña para el uso observado,** no para casos límite especulativos.
4. **Sin validadores, parsers ni guardas especulativos** más allá de lo que exige la especificación.
5. **Simplifica los prompts:** quita instrucciones repetidas y plantillas excesivas.
6. **Si una referencia no aporta contenido nuevo, bórrala** en lugar de dejar un *stub*.

**La inversión continua:** la simplificación no es una tarea puntual. La regla es dejar el diseño un poco más simple y más capaz, detrás de una superficie igual o más pequeña que la que encontraste.

---

### 3. Relación con otros archivos

* **[Laziness Protocol](/pstack/skills/principle-laziness-protocol/)**: es su base. Ese sesga hacia el borrado y el cambio más pequeño que resuelve el problema; este dice *cuándo* hacerlo, antes de construir.
* **[Minimize Reader Load](/pstack/skills/principle-minimize-reader-load/)**: es su medida. Cuando dudes de qué restar, resta lo que más carga al lector: capas de una sola llamada y estado mutable innecesario.
* **[Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/)**: el paso siguiente cuando restar no alcanza. Si después de quitar lo que sobra el requisito sigue sin encajar, el problema es el diseño, no el volumen.

---

### 4. Ejemplo breve

Hay que añadir un tercer formato de exportación a un módulo que ya soporta dos.

* **Mal:** se escribe un adaptador nuevo junto a los dos que ya existen, con su propio validador y su propia plantilla. Tres caminos casi iguales, tres lugares que mantener.
* **Bien:** primero se borra el validador del formato viejo que ya nadie usa y se colapsa el adaptador con un solo llamador. Quedan un camino y un punto de extensión; el tercer formato entra como treinta líneas en vez de trescientas.

---

### 5. Redirección Rápida en Chat
Si la IA propone construir encima de lo que ya sobra:
> `/poteto-mode aplica 'principle-subtract-before-you-add'. Antes de añadir: dime qué se puede borrar o colapsar primero, y construye sobre esa base.`
