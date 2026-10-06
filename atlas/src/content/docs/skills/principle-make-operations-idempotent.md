---
title: Make Operations Idempotent
description: "Apply when designing commands, lifecycle steps, or processing loops that run amid crashes, restarts, and retries. Converge to the same end state regardless of partial prior runs."
grupo: skills
orden: 140
fuente: skills/principle-make-operations-idempotent/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-model-the-domain
  - principle-outcome-oriented-execution
---

> **Regla de oro:** *Apply when designing commands, lifecycle steps, or processing loops that run amid crashes, restarts, and retries. Converge to the same end state regardless of partial prior runs.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The architecture principles` (Bloque 4 de 6).
* **Qué es:** Un principio de arquitectura: cada operación que muta estado se diseña para converger al estado correcto sin importar cuántas veces corra o desde dónde arranque.
* **Para qué sirve:** Los comandos, los pasos de ciclo de vida y los bucles de procesamiento corren donde los crashes, los reinicios y los reintentos son normales. Si el estado parcial cambia el resultado de la siguiente corrida, cada reinicio se vuelve una sesión de depuración.
* **Cuándo se usa:** Al diseñar comandos, pasos de ciclo de vida o bucles de procesamiento que conviven con crashes, reinicios y reintentos.

---

### 2. El Patrón

* **Arranque convergente:** escanear el estado existente, limpiar artefactos viejos, adoptar las sesiones vivas.
* **Limpieza por contenido:** comparar por equivalencia de contenido, no por orden de creación.
* **Locks que se sanan solos:** detección de locks viejos por PID.
* **Programación idempotente:** el trabajo fallido reaparece limpio y la entrada fresca se regenera en cada ciclo.

**La prueba son tres preguntas:** ¿Qué pasa si corre dos veces seguidas? ¿Qué pasa si la corrida anterior crasheó en cada punto posible? ¿La re-ejecución converge al mismo estado final? Si alguna respuesta es "depende del estado que quedó", la operación necesita un paso de reconciliación.

---

### 3. Relación con otros archivos

* **[Model the Domain](/pstack/skills/principle-model-the-domain/)**: la convergencia exige poder leer el estado actual (escanear el estado existente es el primer paso del patrón). Las estructuras de dominio de ese principio son las que hacen ese escaneo posible y confiable.
* **[Outcome-Oriented Execution](/pstack/skills/principle-outcome-oriented-execution/)**: una migración o reescritura por fases se reinicia. Si cada fase es idempotente, el reinicio converge al estado objetivo en lugar de acumular efectos de corridas parciales.
* **[Type System Discipline](/pstack/skills/principle-type-system-discipline/)**: se complementan. Ese elimina los estados imposibles en tiempo de compilación; este elimina los finales distintos cuando una operación corre dos veces. Los dos atacan la misma raíz: casos que dependen de cómo quedó el estado.

---

### 4. Ejemplo breve

Un script diario copia archivos de un repo a otro.

* **Sin el principio:** correrlo dos veces duplica archivos, y si se cayó a mitad de camino, el siguiente arranque no sabe qué ya hizo.
* **Con el principio:** antes de copiar compara por contenido: si el archivo ya existe y es idéntico, no duplica nada y sigue con lo que falta. Correrlo dos veces o reanudarlo después de un crash termina en el mismo estado. Esta misma rutina de réplica de pstack sigue el principio: verifica si el archivo ya existe antes de copiar y nunca duplica commits.

---

### 5. Redirección Rápida en Chat
Si la IA diseña un comando o un paso que no sobreviviría a un reinicio a mitad de camino:
> `/poteto-mode aplica 'principle-make-operations-idempotent'. Haz que la operación converja al mismo estado final aunque corra dos veces o crashee a mitad de camino.`
