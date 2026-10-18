---
title: Technical Writing
description: "Layered technical-writing standard: Diátaxis structure, Google developer style sentences, STE instruction rules, Global English syntax. Use for /technical-writing or when writing or reviewing docs, RFCs, readmes, PR descriptions, or commit messages."
grupo: skills
orden: 250
familia: Utilitarias independientes (fase 2)
fuente: skills/technical-writing/SKILL.md
habla-con:
  - unslop
---

> **Regla de oro:** *Write so a tired engineer understands on the first read. Apply all four layers.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** Un estándar de escritura técnica en cuatro capas apiladas: estructura Diátaxis (tutorial, how-to, reference, explanation), estilo de frases Google developer style, reglas STE para instrucciones y sintaxis Global English. Encima de las cuatro capas van tres reglas previas: cortar toda palabra que no trabaja, usar la palabra corta y cotidiana, y dejar la regla que empeora la frase (una frase que cumple todas las reglas y suena a máquina ha fallado).
* **Para qué sirve:** Que un ingeniero cansado entienda a la primera lectura. El codebase es la lista de palabras: se escribe el símbolo, archivo, flag o comando real, no un sinónimo, y no se inventa jerga nueva; los ofensores nuevos se proponen como adiciones a la regla de metáforas abstractas de `unslop`, con su diff.
* **Cuándo se usa:** Al escribir o revisar docs, RFCs, readmes, descripciones de PR o mensajes de commit (invocable con `/technical-writing`). Lleva `disable-model-invocation: true`, así que se pide explícitamente.

---

### 2. Las cuatro capas

* **Elegir el modo primero (Diátaxis):** un documento, un modo. Dos preguntas lo eligen: ¿informa acción o entendimiento, y sirve para aprender o para trabajar? Acción + aprender es tutorial, acción + trabajar es how-to, entender + trabajar es reference, entender + aprender es explanation. No se mezclan modos: se divide y se enlaza. En reference no hay opinión ni instrucción; en explanation sí la hay, y solo ahí.
* **Escribir frases al lector (Google developer style):** hablar en "tú" y presente, nombrar quién hace qué, instrucciones como comandos, condición antes de instrucción, caso común primero, tono de amigo que sabe (sin buzzwords ni "simply", "easy" o "quickly" en un procedimiento), encabezados que cargan el punto en sentence case, y enlaces con palabras que dicen a dónde van.
* **Declaraciones de una en una (reglas STE):** una instrucción por oración, partirlas pasadas de ~20/25 palabras, advertencia antes del paso que protege, conservar los artículos ("Remove the backup file", no "Remove backup file"), una palabra por acción, y evitar los gerundios donde se pueda.
* **Ninguna oración abierta a dos lecturas (Global English):** "only" y "not" junto a la palabra que modifican, sustantivos largos partidos en cláusulas, cada "it" y "this" apuntando a una cosa obvia, verbos que no se sueltan, "that" estructural que no se sacrifica por brevedad, puntos en vez de punto y coma, sin barras ni "(s)" para plurales, y un solo nombre para cada cosa en todo el doc.

Además: **variar el ritmo** (una doc puede cumplir cada capa y sonar a máquina si todas las oraciones son cortas; mezclar larguras a propósito y ser específico, "a column rename fails the build" y no "schema changes can cause issues"), y reglas propias del repo: las descripciones de PR y los mensajes de commit son escritura también (cada capa salvo Diátaxis; un cuerpo de PR es un briefing que un revisor lee en menos de un minuto, sin logs ni tablas de SHAs pegados, sino enlazados), el código va con tabs, las rutas son reales, y cada cifra o conteo debe ser cierto en el commit que la deja e incluir el comando que la regenera.

---

### 3. Relación con otros archivos

* **[Unslop](/pstack/skills/unslop/)**: esta skill ordena aplicar `unslop` a cada documento que toca; unslop es dueño del catálogo de patrones de slop (vocabulario de IA, relleno, hedges, señales de formato) y de la regla de metáforas abstractas donde se proponen los ofensores nuevos.
* El criterio de estilo de los docs de este sitio (sentence case, sin em dashes, voz activa) sale de estas mismas reglas.

---

### 4. Ejemplo breve

Antes: "Configuration of the proto import ratchet budget script parameters is performed via budget.json. Note that it's important to remember that running with --write, which updates the committed budget to reflect the current count, should only be done when lowering it. If exceeded, CI fails."

Después: "`budget.mjs` reads the committed budget from `budget.json` and counts the files that import protos. If the count exceeds the budget, CI fails. Run `budget.mjs --write` only to lower the budget."
