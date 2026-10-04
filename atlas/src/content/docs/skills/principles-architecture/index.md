---
title: The Architecture Principles
description: "Los 6 principios de arquitectura de pstack: deciden dónde viven el estado, la validación y la compatibilidad."
grupo: skills
orden: 105
familia: The architecture principles
fuente: skills/
habla-con:
  - 08-principles
  - poteto-mode
  - principle-model-the-domain
  - principle-boundary-discipline
---

## Jerarquía y clasificación

Dentro del sistema **pstack**, este índice agrupa los principios de la jerarquía:
> **Skills** › **Principles** › **The architecture principles**

Según la guía [`08-principles`](https://github.com/cursor/plugins/blob/main/pstack/docs/guide/08-principles.md), los principios de arquitectura deciden dónde viven el estado, la validación y la compatibilidad.

**Nota:** réplica en curso. Hay 4 de 6 principios replicados y documentados; el resto se agregará a este índice conforme se repliquen.

---

### Principios en esta sección:

1. **[Model the Domain](./principle-model-the-domain/)** (Orden #110)  
   *Apply when writing stateful logic, or when code branches a lot or repeats a shape assumption across files. Encode the domain in a structure instead of scattered conditionals.*

2. **[Boundary Discipline](./principle-boundary-discipline/)** (Orden #120)  
   *Apply when wiring validation, error handling, or framework adapters. Concentrate guards at system boundaries (CLI, config, network, external APIs); trust internal types and keep business logic in pure functions.*
3. **[Type System Discipline](./principle-type-system-discipline/)** (Orden #130)  
   *Apply when designing types, reviewing a function signature, or writing code in any statically-typed language. Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, refuse to lie to the compiler, exhaust variants, derive from authoritative schemas.*

4. **[Make Operations Idempotent](./principle-make-operations-idempotent/)** (Orden #140)  
   *Apply when designing commands, lifecycle steps, or processing loops that run amid crashes, restarts, and retries. Converge to the same end state regardless of partial prior runs.*
