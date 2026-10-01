---
title: Outcome-Oriented Execution
description: "Apply during planned rewrites and migrations with explicit phase boundaries. Converge on the target architecture; don't preserve smooth intermediate states with throwaway compatibility code."
grupo: skills
orden: 70
familia: The core principles
fuente: skills/principle-outcome-oriented-execution/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - multi-phase-plan
  - refactoring
  - principle-subtract-before-you-add
---

> **Regla de oro:** *Apply during planned rewrites and migrations with explicit phase boundaries. Converge on the target architecture; don't preserve smooth intermediate states with throwaway compatibility code.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 7 de 10).
* **Qué es:** Un principio de ejecución: se optimiza para el estado final previsto y verificable, no para que cada paso intermedio quede perfectamente estable.
* **Para qué sirve:** Evita el código de compatibilidad temporal que nace "solo para esta migración" y termina viviendo años. Mantener cada paso intermedio totalmente estable es justo lo que genera esa deuda.
* **Cuándo se usa:** En reescrituras y migraciones **planificadas**, con fronteras de fase explícitas. Aparece sobre todo en `multi-phase-plan` y `refactoring`. No es permiso para romper cosas sin plan.

---

### 2. La regla central

1. **Integridad del estado final por encima de la estabilidad de la transición.**
2. **Romper en medio es aceptable** cuando la rotura es planificada, acotada y reversible.

---

### 3. Los frenos

* Úsalo solo en reescrituras y migraciones planificadas con fronteras de fase explícitas.
* **Declara dónde** se acepta la rotura temporal, antes de empezar.
* Mantén las verificaciones de alta señal en las áreas que estás tocando mientras migras.
* Exige verificación completa, estática y en ejecución, al cerrar el plan.

---

### 4. Relación con otros archivos

* **[Subtract Before You Add](./principle-subtract-before-you-add/)**: es su aliado natural. Converger hacia la arquitectura destino casi siempre significa borrar el puente temporal en vez de conservarlo.
* **[Redesign From First Principles](./principle-redesign-from-first-principles/)**: define *cuál* es la arquitectura destino; este principio dice cómo llegar a ella sin ir dejando capas de compatibilidad.
* **[Attack the Premise](./principle-attack-the-premise/)**: si al converger la misma fase falla una y otra vez el mismo *gate*, el destino declarado es la premisa que toca cuestionar.
* **`principle-prove-it-works`** y **`principle-sequence-verifiable-units`**: son el complemento de verificación de este principio (qué cuenta como prueba al cerrar cada fase). Todavía no están replicados en este repositorio, así que aquí se citan sin enlace.

---

### 5. Ejemplo breve

Hay que migrar de un cliente HTTP viejo a uno nuevo en doce módulos.

* **Mal:** se escribe una fachada que acepta las dos interfaces para que ningún commit rompa nada. La migración termina, la fachada se queda, y dos años después nadie sabe cuál de los dos caminos usa cada módulo.
* **Bien:** se declara que durante la fase 2 los módulos 7 al 12 quedan rotos a propósito, se mantienen los tests de los módulos 1 al 6 que sí se están tocando, y al cerrar la fase se exige que compile y pase todo. No queda fachada porque nunca existió.

---

### 6. Redirección Rápida en Chat
Si la IA propone una capa de compatibilidad para no romper nada en el camino:
> `/poteto-mode aplica 'principle-outcome-oriented-execution'. Nada de código puente: declara qué se rompe en cada fase y qué se verifica al cerrarla.`
