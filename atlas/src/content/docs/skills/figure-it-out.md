---
title: Figure It Out
description: "Design an auditable playbook when no narrower one fits: a large migration, an ambitious multi-part change, or work a human reviews after stepping away. Scales rigor to the task, runs a hypothesis loop, and logs decisions. Use for /figure-it-out or 'figure it out'."
grupo: skills
orden: 310
familia: Utilitarias independientes (fase 2)
fuente: skills/figure-it-out/SKILL.md
habla-con:
  - prove-it-works
  - never-block-on-the-human
  - foundational-thinking
  - architect
  - arena
  - show-me-your-work
  - poteto-mode
---

> **Regla de oro:** *When the task matches no playbook, design one. The deliverable before any code is the workflow itself.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** La meta-skill para cuando ningún playbook más estrecho encaja: una migración grande, un cambio ambicioso en varias partes o un trabajo que un humano revisa después de ausentarse. Su entregable antes de escribir código es el propio flujo de trabajo: una secuencia de fases que escala el rigor a la tarea, corre el método científico y deja una bitácora de decisiones que un humano puede auditar.
* **Para qué sirve:** Diseñar el playbook a la medida cuando la tarea cae fuera de los moldes: encuadrar primero (done como predicado falsable, alcance cuantificado, nivel de rigor), diseñar el flujo en unidades verificables, ejecutarlo como bucle de hipótesis y registrar cada decisión en una bitácora que viaja con el diff.
* **Cuándo se usa:** Se pide explícitamente con `/figure-it-out` o "figure it out" (lleva `disable-model-invocation: true`).

---

### 2. Qué pide exactamente

* **Fase A, encuadrar:** aterrizar antes de comprometerse. No arranca la corrida hasta poder enunciar: la definición de done como predicado falsable (la skill **[Prove It Works](/pstack/skills/principle-prove-it-works/)**), el alcance cuantificado (unidades y esfuerzo aproximados, más los bloqueos que el aterrizaje destapó) y el nivel de rigor, sesgado a alto: las puertas de un solo sentido y el blast radius alto reciben más, los pasos reversibles de bajo riesgo reciben menos; el rigor son gates y artefactos, no "esforzarse más". Presenta el encuadre y los tradeoffs antes de comprometer una corrida larga: el trabajo reversible procede (la skill **[Never Block on the Human](/pstack/skills/principle-never-block-on-the-human/)**), pero una corrida de varias horas gana un checkpoint.
* **Fase B, diseñar el flujo:** descomponer en unidades atómicas e independientemente aterrizables, con lo más incierto primero, y andamiaje y verificación antes de features (la skill **[Foundational Thinking](/pstack/skills/principle-foundational-thinking/)**). El harness de verificación se construye antes que el trabajo, con el baseline capturado del estado pre-cambio, para que el chequeo lea "valor viejo vs valor nuevo". Para decisiones de diseño de un solo sentido corre la skill `architect` (que a su vez corre `arena`); se la salta en trabajo mecánico de forma ya concreta, y una segunda arena sobre un diseño ya asentado es sobreingeniería (la skill **[Laziness Protocol](/pstack/skills/principle-laziness-protocol/)**). Decide qué se reparte en paralelo: solo por seams, cada worker con su propio worktree o rama (la skill **[Separate Before Serializing Shared State](/pstack/skills/principle-separate-before-serializing-shared-state/)**), sin sobre-repartir, y elige a cada subagente su nivel de razonamiento y su velocidad rápida o estándar según la sección Subagents de `poteto-mode`. La lista de fases diseñadas se escribe: esa lista es lo que el humano revisa. Luego ejecuta el diseño, agregando sus pasos como ítems concretos entre las fases C y D del todolist, corriendo cada uno bajo la disciplina de la fase C y tejiendo la bitácora de la fase D fila a fila, no al final.
* **Fase C, correr el bucle:** cada unidad es un experimento. Enunciar la hipótesis, hacer el cambio más pequeño, medir contra el predicado en el artefacto real, conservarlo si avanzó y revertirlo si no; verificar cada unidad antes de arrancar la siguiente, sin acumular chequeos para el final (la skill **[Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/)**). Verificar inspeccionando el artefacto, nunca un self-report; cuando algo pasa demasiado fácil, se sospecha del método de observación antes que del sistema. El trabajo delegado va emparejado con un juez: si el worker maquilla el gate, reset y endurecer el contrato; si el gate está mal, arreglarlo en su propio cambio en vez de esquivarlo. El veredicto es VERIFIED, NOT VERIFIED o INCONCLUSIVE: un inconclusive no es un pase y no se esconde un negativo.
* **Fase D, bitácora de auditoría:** registrar la corrida con la skill `show-me-your-work`; su trabajo suele ser ambicioso como para commitear la bitácora y que el revisor la lea en el PR. Bitácora más diff es lo que permite al humano volver y confiar en el trabajo.
* **Fase E, verificar y devolver:** chequear el todo contra el predicado de la fase A en el producto real, no solo en el harness; codificar cualquier corrección recurrente como gate, regla de lint, chequeo o script (la skill **[Encode Lessons in Structure](/pstack/skills/principle-encode-lessons-in-structure/)**). La respuesta final: el playbook diseñado, el nivel de rigor y su porqué, la ruta de la bitácora, qué quedó verificado contra el predicado y qué sigue abierto.

---

### 3. Relación con otros archivos

* **[Prove It Works](/pstack/skills/principle-prove-it-works/)**: la definición de done de la fase A es un predicado falsable tomado de esta skill, y la fase E mide contra él en el producto real.
* **[Never Block on the Human](/pstack/skills/principle-never-block-on-the-human/)**: el trabajo reversible procede mientras dura la corrida; el checkpoint es el compromiso que compra una corrida de horas.
* **[Foundational Thinking](/pstack/skills/principle-foundational-thinking/)**: manda el orden de la fase B: andamiaje y verificación antes de features, con lo más incierto primero.
* **[Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/)**: el bucle de la fase C verifica cada unidad antes de la siguiente, en vez de acumular chequeos.
* **[Laziness Protocol](/pstack/skills/principle-laziness-protocol/)**: el freno del diseño: una segunda arena sobre un diseño ya asentado es sobreingeniería y no pasa.
* **[Encode Lessons in Structure](/pstack/skills/principle-encode-lessons-in-structure/)**: cierra el ciclo en la fase E codificando las correcciones recurrentes como gates.
* `architect`, `arena`, `show-me-your-work` y `poteto-mode` (aún no replicados, se citan sin enlace): el diseñador de arquitectura para las decisiones de un solo sentido, el análisis multi-modelo, la bitácora de trabajo y el orquestador al que figure-it-out entrega su flujo.

---

### 4. Ejemplo breve

Una migración grande sin playbook que encaje: figure-it-out encuadra primero (done como predicado falsable: "todos los módulos compilan contra la API nueva y la suite no baja de verde"), diseña el flujo con el harness antes que el trabajo y las unidades más inciertas primero, corre cada unidad como experimento con veredicto VERIFIED o NOT VERIFIED, commitea la bitácora junto al diff para que el revisor la lea en el PR, y cierra chequeando el todo contra el predicado en el producto real, codificando como lint la corrección que tuvo que repetir tres veces.
