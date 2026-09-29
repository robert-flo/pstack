---
title: Redesign From First Principles
description: "Apply when integrating a new requirement into an existing design. Redesign as if the requirement had been a foundational assumption from day one, instead of bolting it on."
grupo: skills
orden: 30
familia: The core principles
fuente: skills/principle-redesign-from-first-principles/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - architect
  - refactoring
  - principle-attack-the-premise
---

> **Regla de oro:** *Apply when integrating a new requirement into an existing design. Redesign as if the requirement had been a foundational assumption from day one, instead of bolting it on.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 3 de 10).
* **Qué es:** Un principio de diseño que prohíbe "atornillar" un requisito nuevo sobre una arquitectura ya existente.
* **Para qué sirve:** Evita la deuda técnica por acumulación: en lugar de añadir una excepción, un flag o una rama especial, el diseño se vuelve a pensar como si el requisito hubiera existido desde el día uno.
* **Cuándo se usa:** Al integrar un cambio o requisito nuevo en un diseño que ya funciona. Se activa típicamente en tareas de tipo `feature`, `refactoring` o `architect` dentro de `/poteto-mode`.

---

### 2. Las 4 Reglas del Rediseño

1. **Lee antes de tocar:** Revisa todos los archivos afectados y entiende el diseño actual completo.
2. **Haz la pregunta fundacional:** "Si escribiéramos esto desde cero con este requisito nuevo, ¿qué construiríamos?".
3. **Propaga el cambio hasta el final:** Tipos, documentación, ejemplos y secciones de justificación. Ninguna referencia se queda con el diseño viejo.
4. **Piensa el rediseño completo, entrégalo por partes:** El diseño se razona entero; la implementación se entrega de forma incremental.

El resultado es la preservación del *option value*: el diseño sigue abierto a cambios futuros en lugar de endurecerse con cada parche.

---

### 3. Relación con otros archivos

* **[Attack the Premise](./principle-attack-the-premise/)**: es el principio hermano y complementario. Este rediseña el diseño alrededor de un requisito nuevo; *Attack the Premise* cuestiona un hecho que el diseño actual da por cierto.
* **[Laziness Protocol](./principle-laziness-protocol/)**: marca el límite. Rediseñar no es reescribir por gusto: sigue vigente el sesgo hacia el cambio más pequeño que resuelve el problema.
* **[Foundational Thinking](./principle-foundational-thinking/)**: aporta el orden de trabajo del rediseño (primero tipos y estructuras de datos, después la lógica).

---

### 4. Ejemplo breve

Llega el requisito "un usuario puede pertenecer a varias organizaciones" sobre un modelo con `user.organizationId`.

* **Atornillado (incorrecto):** se añade `user.extraOrganizationIds` y cada consulta revisa los dos campos.
* **Rediseñado (correcto):** se modela la relación `membership (userId, organizationId, role)`, se migran los llamadores y se elimina `organizationId`; los tipos, los docs y los ejemplos se actualizan en el mismo paso.

---

### 5. Redirección Rápida en Chat
Si la IA empieza a parchear el diseño existente:
> `/poteto-mode aplica 'principle-redesign-from-first-principles'. No atornilles el requisito: rediseña como si hubiera estado desde el día uno y propaga el cambio a tipos, docs y ejemplos.`
