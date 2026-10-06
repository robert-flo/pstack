---
title: The Verification Principles
description: "Los 4 principios de verificación de pstack: prueban el artefacto real y arreglan la causa raíz, no el síntoma."
grupo: skills
orden: 165
familia: The verification principles
fuente: skills/
habla-con:
  - 08-principles
  - poteto-mode
  - principle-prove-it-works
  - principle-fix-root-causes
---

## Jerarquía y clasificación

Dentro del sistema **pstack**, este índice agrupa los principios de la jerarquía:
> **Skills** › **Principles** › **The verification principles**

Según la guía [`08-principles`](https://github.com/cursor/plugins/blob/main/pstack/docs/guide/08-principles.md), los principios de verificación comprueban el trabajo contra el artefacto real y van a la causa raíz de cada fallo.

**Nota:** réplica en curso. 2 de 4 principios del bloque están replicados y documentados.

---

### Principios en esta sección:

1. **[Prove It Works](./principle-prove-it-works/)** (Orden #170)  
   *Apply after completing a task, before declaring done. Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or "it compiles."*

2. **[Fix Root Causes](./principle-fix-root-causes/)** (Orden #180)  
   *Apply when debugging. Trace each symptom to its root cause and fix it there; reproduce first, ask why until you reach it, resist nil-check guards that silence crashes.*
