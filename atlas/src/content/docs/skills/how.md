---
title: How
description: "Use for \"how does X work\", code walkthroughs before changing something, and placement / ownership / layering questions (\"where should this live\", \"which package owns this\", \"is this the right layer\"). Explains subsystem architecture, runtime flow, onboarding mental models. Use why for motivation."
grupo: skills
orden: 210
fuente: skills/how/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - why
  - interrogate
---

> **Regla de oro:** *Use for "how does X work", code walkthroughs before changing something, and placement / ownership / layering questions ("where should this live", "which package owns this", "is this the right layer"). Explains subsystem architecture, runtime flow, onboarding mental models. Use why for motivation.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Utilitarias independientes` (primera de la fase 2).
* **Qué es:** Una skill de exploración y explicación de código: explora el repositorio para responder preguntas del tipo "¿cómo funciona X?" y produce explicaciones de arquitectura al nivel de un ingeniero senior haciendo onboarding en un subsistema, suficientes para construir un modelo mental funcional, sin leerse como código anotado.
* **Para qué sirve:** Cubre preguntas de cómo funciona algo, recorridos de código antes de cambiar algo, y preguntas de ubicación, pertenencia y capas ("¿dónde debería vivir esto?", "¿qué paquete es dueño de esto?", "¿es la capa correcta?"). Explica arquitectura de subsistemas, flujo en runtime y modelos mentales de onboarding. Para la motivación existe la skill **why** (aún no replicada, se cita sin enlace).
* **Cuándo se usa:** Antes de modificar un subsistema desconocido, al incorporarse a un proyecto, o cuando alguien pregunta cómo está armado algo.

---

### 2. El Patrón

* **Paso 1, evaluar complejidad:** si el alcance es ambiguo, declarar la interpretación y explorar; el usuario puede corregir. Simple (un módulo, una utilidad pequeña, una pregunta acotada): un solo explainer en una pasada, sin explorers. Complejo (un subsistema de varios archivos o servicios, una feature transversal, una vista arquitectónica completa): explorers en paralelo primero, luego el explainer. Ante la duda, el camino simple.
* **Paso 2a, explorar (preguntas complejas):** descomponer la pregunta en 2 a 4 ángulos de exploración, cada uno un corte distinto del subsistema, y lanzar todos los explorers en un solo mensaje (`generalPurpose`, solo lectura; modelo según la línea `how explorer` de `pstack-models.mdc`, por defecto `grok-4.7-xhigh-fast`). Cada explorer recibe el prompt de `references/explorer-prompt.md` con su ángulo ya llenado.
* **Paso 2b, explicar directo (preguntas simples):** un subagente que explora y explica en una pasada, con el prompt de `references/explainer-prompt.md` sin la sección de hallazgos de explorers.
* **Paso 3, sintetizar (preguntas complejas):** cuando todos los explorers regresan, un subagente sintetiza sus hallazgos en una sola explicación (modelo de la línea `how explainer`, por defecto `claude-opus-5-5-xhigh`).
* **Paso 4, presentar:** presentar la salida del explainer con ediciones ligeras de claridad; no reescribirla a fondo.
* **Formato de salida:** las secciones definidas en `references/explainer-prompt.md`, descartando las que no aplican: Overview, Key Concepts, How It Works, Where Things Live, Gotchas.
* **Reglas de modelo:** si el Task tool rechaza un slug, usar el default y decirlo; si rechaza el default, usar el slug válido más cercano de la misma familia según el mensaje de error. Dejar `model` sin asignar cuando el valor sea `auto` o `inherit-parent`.

---

### 3. Archivos de apoyo

* **`references/explorer-prompt.md`** (replicado y verificado): la plantilla del prompt de cada explorer. Le indica que reúna hechos y trace rutas de código sin escribir prosa, que se centre en su ángulo asignado mientras otros explorers cubren los demás cortes en paralelo, y que siga cinco pasos: encontrar el punto de entrada, trazar el flujo, mapear las abstracciones clave, encontrar las fronteras y buscar lo no obvio. Devuelve su salida en una estructura fija (Components Found, Flow, Files Read, Boundaries, Non-Obvious Things, Open Questions) y exige ser honesto con los huecos: "no pude determinar cómo X conecta con Y" es mejor que inventarlo.

---

### 4. Relación con otros archivos

* **`why`** (aún no replicada, se cita sin enlace): la skill hermana para la otra mitad de la pregunta. How explica mecanismo y estructura; why explica motivación e historia.
* **`interrogate`** (aún no replicada, se cita sin enlace): otra skill de investigación del sistema; interrogate cuestiona calidad con rubros, mientras how construye comprensión arquitectónica.
* **`poteto-mode`**: el orquestador al que las skills utilitarias alimentan; los spawn de explorers y explainers son subagentes Task dentro de ese motor.

---

### 5. Ejemplo breve

Un agente recibe "¿cómo funciona el sistema de plugins de Cursor?".

* **Con la skill:** es una pregunta compleja (varios archivos y servicios), así que lanza 3 explorers en paralelo (uno para el ciclo de carga, otro para el runtime de skills, otro para las fronteras con el editor), cada uno con su ángulo de `references/explorer-prompt.md`. Cuando regresan, un explainer sintetiza los tres conjuntos de hallazgos en una sola explicación con secciones Overview, How It Works y Gotchas, y la presenta con ediciones ligeras.
