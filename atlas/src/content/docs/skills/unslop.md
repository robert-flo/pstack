---
title: Unslop
description: "Cut AI tells from any writing."
grupo: skills
orden: 230
familia: Utilitarias independientes (fase 2)
fuente: skills/unslop/SKILL.md
habla-con:
  - why
  - technical-writing
---

> **Regla de oro:** *Cut AI tells from any writing.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** Una skill de edición: escanea un texto buscando los patrones que delatan escritura de IA (el "slop") y los reescribe. No es una lista de reglas decorativa: cada regla tiene un número estable que otras skills citan, así que una regla eliminada deja un hueco.
* **Para qué sirve:** Quedarse con el significado y el tono pretendido, quitando el patrón. El criterio de la skill es conservar la idea y cambiar el embalaje.
* **Cuándo se usa:** Al revisar cualquier texto propio o generado antes de publicarlo. Nota: el original lleva `disable-model-invocation: true`, así que no se invoca sola desde el modelo; es una herramienta que se pide explícitamente.

---

### 2. Los patrones, por bloque

* **Contenido:** frases superficiales en gerundio ("highlighting...", "ensuring...", "showcasing...") que se borran o se expanden con fuentes reales, y atribuciones vagas ("Experts believe", "Industry reports suggest") que o nombran su fuente o desaparecen.
* **Lenguaje:** el vocabulario de IA (additionally, crucial, delve, pivotal, showcase, tapestry, testament, underscore, vibrant y compañía) se reemplaza por palabras planas; las formas fatuas de decir "is" ("serves as", "stands as", "boasts") vuelven a ser "is" o "has"; el "not just X, but Y" se dice directo; nada de forzar ideas en grupos de tres; nada de ciclar sinónimos en un párrafo (protagonist, main character, hero: elige uno y repítelo); nada de rangos falsos "from X to Y" que no están en una escala real.
* **Estilo:** cero rayas em (se acaban las frases con punto o coma, sin paréntesis ni en dashes); los dos puntos solo antes de una lista o ejemplo, nunca como conector a mitad de frase; nada de negritas en cada nombre propio; las listas con encabezado en línea ("**Performance:** Performance improved...") se vuelven prosa (un encabezado en negrita que termina en punto y trae detalle nuevo sí vale); encabezados en sentence case; sin emojis decorativos; comillas rectas.
* **Artefactos de chatbot:** frases de cierre ("I hope this helps!", "Let me know if...", "Of course!") y tono servil ("Great question! You're absolutely right!") se eliminan y se responde directo.
* **Relleno:** "In order to" se vuelve "To"; "Due to the fact that" se vuelve "Because"; "It is important to note that" se borra; el hedge excesivo ("could potentially possibly be argued that it might") se vuelve "may"; las conclusiones genéricas ("The future looks bright.") dan paso a planes o hechos concretos.
* **Jerga:** los sustantivos-metáfora abstractos (substrate, wedge, vector, locus, vantage, nexus, primitive, harness, bedrock, scaffolding, modality, paradigm, north star, flywheel) tienen casi siempre una palabra concreta más simple, y esa es la que se usa.
* **Habla llana:** decir qué hace la cosa, no cómo se siente ("SQL you can read" no dice nada; "`.toSQL()` returns the exact string sent to the database" sí); partir las frases densas que obligan a releer; voz activa nombrando al actor ("the compiler validates queries", no "queries are validated"); cortar adverbios o usar un verbo más fuerte ("runs quickly" es "is fast" o la cifra); preferir la palabra simple (utilize → use, facilitate → help, numerous → many); bajar la prosa amanerada (aforismos, fragmentos retóricos, código personificado); y descomprimir el exceso de compresión: frases completas con sus artículos y verbos, flechas y abreviaturas deletreadas.

---

### 3. Relación con otros archivos

* **[Why](/pstack/skills/why/)**: la skill de investigación de motivación produce texto que también pasa por este filtro antes de salir.
* La regla 13 (cero em dashes) y el bloque de estilo son los mismos criterios con los que se escriben los docs de este sitio.

---

### 4. Ejemplo breve

Un párrafo que dice "Leveraging a robust test suite, ensuring coverage stays pivotal, showcases our commitment to quality" se convierte en "Our test suite keeps coverage above 90%, and CI fails the build when it drops". El significado sobrevive; el slop no.
