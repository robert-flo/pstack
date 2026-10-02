---
title: Build the Lever
description: "Apply to any non-trivial work, not just bulk work: edits, migrations, analyses, checks. Build the tool that does it or proves it (codemod, script, generator, or a skill your subagents follow) instead of working by hand. The tool is the artifact a reviewer can rerun."
grupo: skills
orden: 100
familia: The core principles
fuente: skills/principle-build-the-lever/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - principle-laziness-protocol
  - principle-attack-the-premise
  - swarm
---

> **Regla de oro:** *Apply to any non-trivial work, not just bulk work: edits, migrations, analyses, checks. Build the tool that does it or proves it (codemod, script, generator, or a skill your subagents follow) instead of working by hand. The tool is the artifact a reviewer can rerun.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 10 de 10).
* **Qué es:** Un principio de método: cuando el trabajo no es trivial, se construye la herramienta que lo hace o lo comprueba en vez de hacerlo a mano.
* **Para qué sirve:** Da dos beneficios. **Rendimiento:** un codemod, un generador o un script hace el trabajo igual cada vez y se vuelve a correr gratis. **Confianza:** la herramienta es un solo artefacto que un revisor puede leer y volver a correr. Un cambio hecho a mano solo se puede re-verificar rehaciéndolo; un script determinista convierte "confía en mí" en "corre esto".
* **Cuándo se usa:** En cualquier trabajo no trivial, no solo en trabajo masivo: ediciones, migraciones, análisis y verificaciones. Se omite solo cuando la tarea es trivial, un par de ediciones obvias que se ven de un vistazo.

---

### 2. El Patrón

* **Haz la primera unidad a mano** para aprender la receta, luego construye la herramienta. Pruébala corriéndola sobre esa misma unidad y comparando con tu versión manual. Hazla segura de volver a correr.
* **Elige la palanca según el trabajo:** codemod o script para ediciones, generador para archivos repetitivos, una consulta sobre un volcado a SQLite para análisis, una verificación re-ejecutable para comprobar.
* **Una palanca determinista vence al reparto.** Si la herramienta procesa todas las unidades en una pasada, córrela tú. No repartas subagentes para aplicar a mano lo que un script puede hacer.
* **Si repartes trabajo entre subagentes,** escribe la palanca como una skill que todos leen: la receta, el contrato de verificación y las zonas prohibidas en un solo artefacto, fuera del alcance de escritura de los delegados para que no puedan editar el contrato.
* **Aplicar el principio produce un archivo.** Si lo citaste y en el diff no hay codemod, script, generador ni skill de delegados, no lo aplicaste.
* **Guarda la palanca en el repo** cuando el trabajo dura más que la sesión.

**Equilibrio:** el umbral es la trivialidad, no la repetición. Un trabajo de una sola vez también merece palanca cuando la palanca es lo que lo vuelve verificable. Siempre el script más pequeño que haga o pruebe el trabajo, nunca un framework.

---

### 3. Relación con otros archivos

* **[Laziness Protocol](./principle-laziness-protocol/)**: el original lo cita para fijar el tamaño de la palanca: el script más pequeño que hace o prueba el trabajo, nunca un framework.
* **[Attack the Premise](./principle-attack-the-premise/)**: su paso de censo es una aplicación directa de este principio. El censo por actor se escribe como un script re-ejecutable, no como una cuenta a mano.
* **[Exhaust the Design Space](./principle-exhaust-the-design-space/)**: los prototipos desechables de ese principio no son palancas; este aplica una vez que el camino está elegido y hay trabajo que ejecutar o comprobar.
* **`principle-encode-lessons-in-structure`**: el original lo distingue explícitamente. Ese convierte una instrucción recurrente en una barrera duradera; este trata del rendimiento y la revisabilidad del trabajo que tienes delante. Todavía no está replicado, así que se cita sin enlace.
* **`principle-prove-it-works`**: el original lo señala para cuando lo que se automatiza es la verificación misma. Todavía no está replicado, así que se cita sin enlace.

---

### 4. Ejemplo breve

Hay que renombrar una función que se usa en 140 archivos.

* **A mano:** se abren los archivos uno por uno con buscar y reemplazar. Para revisar el cambio, alguien tendría que mirar los 140 diffs, y si se agrega un archivo nuevo mañana, hay que repetirlo todo.
* **Con palanca:** se renombra el primer uso a mano, se escribe un codemod de treinta líneas, se corre sobre ese archivo y se compara con la versión manual, y luego se corre sobre todo el repo. El revisor lee treinta líneas y puede volver a correrlas. El codemod queda en el commit.

Esta misma réplica de pstack sigue el principio: la verificación por hash de blob de Git es un chequeo re-ejecutable, no una comparación a ojo.

---

### 5. Redirección Rápida en Chat
Si la IA empieza a hacer a mano un trabajo no trivial:
> `/poteto-mode aplica 'principle-build-the-lever'. No lo hagas a mano: haz la primera unidad, escribe el script que hace el resto y pruébalo contra esa unidad.`
