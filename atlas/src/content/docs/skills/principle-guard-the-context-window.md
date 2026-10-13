---
title: Guard the Context Window
description: "Apply when context is filling up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents; keep summaries in the main thread, not raw payloads."
grupo: skills
orden: 230
fuente: skills/principle-guard-the-context-window/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - swarm
  - principle-laziness-protocol
---

> **Regla de oro:** *Apply when context is filling up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents; keep summaries in the main thread, not raw payloads.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The delegation principles` (Principio 1 de 2 del bloque).
* **Qué es:** Un principio de delegación: protege la ventana de contexto del agente principal. El overflow de contexto degrada la calidad del razonamiento, crea artefactos de compresión y detiene el progreso.
* **Para qué sirve:** Decidir dónde vive el volumen. Los payloads grandes (salidas largas, archivos completos, lecturas repetidas, planificación en abanico) se enrutan a subagentes; en el hilo principal se conservan los resúmenes, no los payloads crudos.
* **Cuándo se usa:** Cuando el contexto se está llenando: salidas grandes, archivos largos, lecturas repetidas o planificación que abre muchos frentes a la vez.

---

### 2. El Patrón

* **Dimensionar fases y acotar el alcance.** Limitar archivos por fase, fijar presupuestos de turnos y contabilizar los costos de cada mecanismo antes de lanzar el trabajo.
* **Enrutar el volumen hacia abajo.** Un subagente que procesa mil líneas y devuelve diez es más barato para el hilo principal que leer las mil líneas y comprimirlas a mano.
* **Resúmenes arriba, payloads abajo.** Lo que vuelve al hilo principal es la conclusión y lo suficiente para actuar; el detalle queda en el subagente, en un archivo o en un commit.

---

### 3. Relación con otros archivos

* **[Laziness Protocol](/pstack/skills/principle-laziness-protocol/)**: reduce el trabajo al mínimo necesario; este principio aplica esa misma economía al material que entra al contexto, no solo a las tareas.
* **[Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/)**: manda trocear el trabajo en unidades verificables; aquí cada fase se dimensiona además para que quepa en el presupuesto de contexto.
* **`swarm`** (aún no replicado): es el mecanismo de abanico al que este principio enruta el trabajo masivo.

---

### 4. Ejemplo breve

Una revisión necesita leer treinta archivos.

* **Sin el principio:** el agente principal lee los treinta en el hilo, el contexto se llena con código crudo, el razonamiento se degrada y las últimas decisiones se toman sobre un resumen comprimido que perdió detalles.
* **Con el principio:** se lanza un subagente por lote de archivos (o por área), cada uno devuelve un resumen con hallazgos y rutas, y el hilo principal decide sobre los resúmenes con el presupuesto de contexto intacto.

---

### 5. Redirección Rápida en Chat
Si la IA acumula salidas grandes o lee archivos completos en el hilo principal:
> `/poteto-mode aplica 'principle-guard-the-context-window'. Enruta el volumen a subagentes y conserva en el hilo principal los resúmenes, no los payloads crudos; dimensiona cada fase dentro del presupuesto de contexto.`

