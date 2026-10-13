---
title: Never Block on the Human
description: "Apply when tempted to ask 'should I do X?' on reversible work."
grupo: skills
orden: 240
fuente: skills/principle-never-block-on-the-human/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - autonomous-run
  - babysit
---

> **Regla de oro:** *Apply when tempted to ask "should I do X?" on reversible work.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The delegation principles` (Principio 2 de 2 del bloque).
* **Qué es:** Un principio de delegación: el humano supervisa de forma asíncrona y los agentes deben mantenerse desbloqueados. Ante trabajo reversible, se decide con criterio razonable, se procede y se deja que el humano corrija después; un error en código reversible y revisable suele costar menos que bloquear.
* **Para qué sirve:** Distinguir en qué casos una pregunta "¿hago X?" detiene el trabajo sin aportar nada. Se procede y se presenta el resultado; no se pregunta si se debe hacer, se hace y se explica por qué.
* **Cuándo se usa:** Cuando aparece la tentación de preguntar "¿debería hacer X?" sobre trabajo reversible: escribir código, editar notas, dividir tareas.

---

### 2. El Patrón

* **Proceder y luego presentar.** Hacer el trabajo, mostrar el resultado. No preguntar "¿debería hacer X?": hacer X y explicar por qué.
* **Hacer el sistema auto-reparable.** Al notar un problema, registrarlo y arreglarlo en la siguiente ronda en lugar de detenerse a preguntar.
* **Las acciones irreversibles siguen pidiendo confirmación.** Force-push, borrar datos de producción, enviar mensajes externos: ahí sí se confirma antes.
* **Las acciones reversibles avanzan sin bloquear.** Escribir código, editar notas, dividir tareas.
* **La dirección del producto viene del humano; la ejecución no bloquea.**

---

### 3. Relación con otros archivos

* **[Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/)**: trocear el trabajo en unidades verificables es lo que hace barato el error: cada unidad se puede corregir en la siguiente ronda sin rehacer todo.
* **[Prove It Works](/pstack/skills/principle-prove-it-works/)**: presentar el resultado con su verificación es la mitad "presentar" del patrón; proceder no significa entregar trabajo sin comprobar.
* **`autonomous-run` y `babysit`** (aún no replicados): los playbooks donde este principio se aplica a toda la corrida: el agente corre sin supervisión síncrona.

---

### 4. Ejemplo breve

El agente encuentra una función muerta durante un refactor.

* **Sin el principio:** se detiene y pregunta "¿la elimino o la dejo?", la sesión queda esperando respuesta y el trabajo avanza solo cuando el humano responde horas después.
* **Con el principio:** la elimina en su commit, lo explica en el resumen del cambio y sigue; si el humano discrepa, el historial muestra exactamente qué revertir. Una fuerza-push o un borrado en producción, en cambio, siguen confirmando antes.

---

### 5. Redirección Rápida en Chat
Si la IA pregunta "¿debería hacer X?" sobre trabajo reversible:
> `/poteto-mode aplica 'principle-never-block-on-the-human'. Procede, presenta el resultado y explica la decisión; confirma solo lo irreversible (force-push, datos de producción, mensajes externos).`

