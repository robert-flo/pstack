---
title: Why
description: "Use for 'why does X work this way', 'why we picked Y', design rationale, regressions, postmortems, or data-backed thresholds. Discovers available MCPs and queries each evidence category (source control, issue tracker, long-form docs, real-time chat, infrastructure observability, error tracking, product analytics warehouse) in parallel, then returns a cited read on decisions and tradeoffs. Use how for runtime behavior."
grupo: skills
orden: 220
fuente: skills/why/SKILL.md
habla-con:
  - how
  - 08-principles
  - poteto-mode
  - incident-postmortem
---

> **Regla de oro:** *Use for 'why does X work this way', 'why we picked Y', design rationale, regressions, postmortems, or data-backed thresholds. Discovers available MCPs and queries each evidence category (source control, issue tracker, long-form docs, real-time chat, infrastructure observability, error tracking, product analytics warehouse) in parallel, then returns a cited read on decisions and tradeoffs. Use how for runtime behavior.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** Una skill de investigación de motivación e historia: descubre qué MCPs hay disponibles en el entorno, clasifica cada uno en una categoría de evidencia (control de versiones, tracker de issues, documentos largos, chat de equipo, observabilidad de infraestructura, tracking de errores, warehouse de analítica de producto), lanza un investigador en paralelo por categoría y sintetiza todo en una lectura con citas sobre las decisiones y tradeoffs que moldearon el código.
* **Para qué sirve:** Responder la mitad de la pregunta que [How](/pstack/skills/how/) no cubre. How explica qué hace el código y cómo funciona; why explica qué fuerzas llevaron a su forma actual: la motivación, la intención, la deliberación que nunca llegó a un documento.
* **Cuándo se usa:** Preguntas del tipo "¿por qué funciona X así?", "¿por qué elegimos Y?", diseño de regresiones, postmortems, o umbrales respaldados por datos. No para comportamiento en runtime (eso es `how`).

---

### 2. Ficha de Despliegue (Postura y Anclaje)

* **Postura operativa:** Investigador cuidadoso, cauto y preciso, honesto sobre lo que sabe versus lo que infiere. El framework completo de confianza vive en `references/epistemics.md` y el sintetizador debe seguirlo: no se reescribe el lenguaje de confianza del output.
* **Anclaje de código (Step 2):** Antes de lanzar investigadores, ancla la investigación en código concreto: rutas de archivos y rangos de líneas, símbolos clave, lista inicial de commits (con `git blame -L`, `git log --follow -p`, `git log --oneline -20 --`), y números de PR extraídos de los subjects de merge (`(#1234)`). Los cuerpos y discusiones de PR se traen con `gh pr view`. Este contexto semilla (rutas, símbolos, commits, PRs, ticket IDs) se pasa a cada investigador.

---

### 3. Los Siete Investigadores (Step 3)

**Regla de roster:** Un investigador por categoría con MCP disponible, cada uno dueño exacto de una herramienta. Se lanzan todos en un solo mensaje para correr en paralelo; nunca uno solo cubriendo varios MCPs. Objetivo: un mapa de cobertura completo, no mínimo. Documentar el nulo, no saltarse la búsqueda.

* **Control de versiones.** Git, `gh` para PRs, comentarios de código, tests. Siempre se lanza: la única fuente garantizada. Mejor para racional capturado durante el review.
* **Tracker de issues** (Linear, Jira, GitHub Issues...). Mejor para la función forzante de producto o negocio; fuerte cuando el why es externo a ingeniería.
* **Documentos largos** (Notion, Confluence, Google Docs...). Mejor para el racional de diseño escrito antes de que exista el código.
* **Chat de equipo en tiempo real** (Slack, Discord, Teams...). Mejor para la deliberación que nunca llegó a un documento; clave cuando el rastro en papel es delgado.
* **Observabilidad de infraestructura** (Datadog, New Relic, Grafana...). La realidad de runtime que motivó el código; fuerte para timeouts, retries, rate limits y circuit breakers.
* **Tracking de errores** (Sentry, Rollbar, Bugsnag...). Las excepciones y trayectorias de error que motivaron código defensivo; fuerte para catch blocks, null guards y type checks.
* **Warehouse de analítica de producto** (Databricks, Snowflake, BigQuery...). La realidad de producto y datos que moldeó el código; fuerte para código bajo feature flags y ships dirigidos por experimentos.

**Cuándo saltarse uno:** Solo con justificación explícita y escrita en la sección final "Sources Consulted", por dos razones válidas: no hay MCP para esa categoría (se marca como hueco, no como elección), o la fuente es demostrablemente irrelevante (barra alta; "probablemente irrelevante" no alcanza).

---

### 4. Síntesis y Salida (Steps 4 y 5)

* **Sintetizador (Step 4):** Un subagente recibe los hallazgos (incluidos nulos y categorías saltadas con justificación), el anclaje de código, la pregunta original, el framework de epistemics y la plantilla de prompt. Su check de calidad verifica citas al azar, lo que puede requerir acceso a MCPs: por eso corre en modo agente, no readonly.
* **Estructura de salida (Step 5):** La Question, The Code in Question, What We Found, What We Can Reasonably Infer, Competing Hypotheses, What We Don't Know, Sources Consulted (una línea por investigador, incluidos los que no devolvieron nada o se saltaron, con la razón) y Confidence Summary. Se adapta, pero la separación de niveles de confianza se conserva intacta.
* **Puente a planificación:** Si la pregunta `why` es precursora de cambiar ese código, los hallazgos de linaje se convierten en un conjunto de restricciones Preserve / Change / Avoid / Risk.

---

### 5. Relación con otros archivos

* **[How](/pstack/skills/how/)**: la skill compañera para la otra mitad de la pregunta. How responde mecanismo; why responde motivación e historia.
* **`08-principles`** (aún no replicado, se cita sin enlace): el bloque de 23 principios es, en buena medida, la destilación de respuestas `why` repetidas del upstream.
* **`poteto-mode`** (aún no replicado, se cita sin enlace): el orquestador que consume las skills utilitarias; los investigadores y el sintetizador son subagentes Task dentro de ese motor.
* **`incident-postmortem`** (`references/sources/incident-postmortem.md`): el playbook transversal que se da a los investigadores cuando el código objetivo se ve defensivo.

---

### 6. Archivos de apoyo

* **`references/epistemics.md`** (aún no replicado): los niveles de confianza y la guía de fraseo. El sintetizador debe seguirlo.
* **`references/investigator-prompt.md`** (aún no replicado): la plantilla base del prompt de cada investigador.
* **`references/source-playbook.md`** (aún no replicado): el índice de los playbooks por categoría.
* **`references/sources/*.md`** (aún no replicados): un playbook autocontenido por categoría de evidencia, más el transversal `incident-postmortem.md`. Cada investigador recibe solo el archivo que corresponde a su categoría, adaptado al MCP disponible.
* **`references/synthesizer-prompt.md`** (aún no replicado): la plantilla del prompt del sintetizador, incluido el formato de salida.

---

### 7. Modos de Fallo Comunes

* **Sesgo de recencia.** Asumir que el commit más reciente es la autoridad. La forma actual suele ser la acumulación de muchas decisiones anteriores: trazar hacia atrás.

---

### 8. Ejemplo Breve

> Pregunta: "¿por qué el `AuthClient` reintenta con backoff exponencial y no lineal?"
>
> La skill ancla en `AuthClient.refresh()`, extrae el PR `#482` y lanza siete investigadores en paralelo: el de control de versiones encuentra que el backoff lineal original saturaba el endpoint de tokens; el de tracking de errores (Sentry) muestra la tasa de 429 que lo motivó; el de documentos encuentra la decisión escrita en un RFC; el de chat recupera la deliberación de Slack que descartó el jitter por completitud. El sintetizador devuelve la lectura con niveles de confianza separados y, si viene del plan de una mejora, el conjunto de restricciones Preserve / Change / Avoid / Risk.
