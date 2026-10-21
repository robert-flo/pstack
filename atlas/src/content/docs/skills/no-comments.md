---
title: No Comments
description: "Spawn Comment Sicko, fix accepted findings, and offer encodings for claimed constraints."
grupo: skills
orden: 280
familia: Utilitarias independientes (fase 2)
fuente: skills/no-comments/SKILL.md
habla-con:
  - fix-root-causes
  - redesign-from-first-principles
  - how
  - why
---

> **Regla de oro:** *Spawn Comment Sicko. Act on accepted findings.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** El orquestador de la limpieza de comentarios muertos: lanza al agente `comment-sicko` (el cazador de comentarios que ya no dicen la verdad), revisa su reporte con criterio, corrige lo aceptado hasta la causa raíz y ofrece codificar en estructuras las restricciones reales que la caza deja al descubierto.
* **Para qué sirve:** Convertir una pasada de matanza de comentarios en trabajo verificable: los comentarios que describen código que ya cambió mueren; los que definen algo que el código no puede expresar por sí solo se codifican en un tipo, un test o un lint, o sobreviven solo con prueba de que la restricción no se puede cambiar.
* **Cuándo se usa:** Se pide explícitamente con el comando `no-comments` (lleva `disable-model-invocation: true`). Su alcance por defecto es el diff actual contra la rama base (`main`), incluyendo el working tree, o los archivos que el llamador le pase.

---

### 2. Qué pide exactamente

El flujo es de seis pasos, cada uno con su criterio de rechazo:

* **Lanzar Comment Sicko** con `Task` y `subagent_type: "comment-sicko"`, pasando solo el alcance. Cada subagente lleva su nivel de razonamiento y velocidad rápida o estándar según la sección Subagents de la skill de `poteto-mode`; no se le repiten sus reglas.
* **Revisar el reporte y el diff** con desconfianza: se rechazan ediciones de código de aplicación, escapes de alcance, eliminaciones protegidas por excepciones, razones `MUST KILL` mal declaradas y banderas que tratan código intencional conservado como culpable; las banderas de sorpresas en código propio siguen accionables. Un keep solo sobrevive con prueba de que se trata de algo que no se puede cambiar. Se audita el lint del alcance y las suppressions de TypeScript que se hayan saltado; las suppressions de corrección o seguridad siguen siendo `MUST KILL`. Antes de aceptar kills o keeps delgados (`IMPORTANT`, `do not remove`), se corre `/how` o `/why` sobre su símbolo. Con un kill ambiguo no se restaura nada; con un keep refutado o ambiguo, se elimina. Un reporte rechazado se reejecuta una vez con la falla nombrada; a la segunda se marca abierto y `/no-comments` falla.
* **Arreglar las banderas triviales aceptadas** directo: borrar una ruta muerta, soltar un parámetro, usar la API real. Si algún fix necesita una forma, se corre `/architect` una sola vez sobre el conjunto aceptado y el código alrededor, y se para en el boceto: el arquitecto da las formas, el paso 4 implementa.
* **Implementar el fix mínimo de causa raíz** dentro del alcance, removiendo cada workaround nombrado. Los principios `fix-root-causes` y `redesign-from-first-principles` guían la intención solo: ni uno ni otro autoriza ensanchar la cerca ni arreglar instancias fuera del alcance. Nada de guardas sintomáticas.
* **Codificar las restricciones reales**: los comentarios que dicen `do not remove`, `do not change wording` o `talk to X before changing` se dejan solo si describen algo que no se puede cambiar. Se ofrece la codificación más barata dentro del alcance (tipo, runtime, test o lint de CI) y se espera aprobación interactiva; desatendido y en evals se requiere preaprobación del llamador. Aprobada, se codifica y se borra el comentario; no aprobada, se borra, la restricción queda reportada abierta y se boceta el trabajo fuera de alcance.
* **Reportar** el conteo de eliminaciones, comentarios restaurados, reejecuciones, boceto del arquitecto, fixes, ofertas de codificación, codificaciones aplicadas, restricciones sin reforzar y el resto del trabajo abierto.

---

### 3. Relación con otros archivos

* **[Comment Sicko](/pstack/agents/comment-sicko/)**: el agente que hace la caza; `no-comments` es su orquestador y su filtro. Le pasa solo el alcance y revisa cada bandera de su reporte antes de actuar.
* **[Fix Root Causes](/pstack/skills/principle-fix-root-causes/)** y **[Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/)**: guían la intención de los fixes de causa raíz, sin autorizar nunca a ensanchar el alcance.
* **[How](/pstack/skills/how/)** y **[Why](/pstack/skills/why/)**: el check previo antes de aceptar un kill o keep delgado; si el símbolo del comentario no tiene historia clara, la ambigüedad resuelve contra el comentario.

---

### 4. Ejemplo breve

Tras un refactor, Comment Sicko marca `// must be sorted before this call` sobre una función que ahora ordena por sí misma: el reporte se acepta, el comentario muere y el fix mínimo es dejarlo morir sin guarda nueva. En cambio `// do not remove: la API del gateway lo exige` describe una restricción externa: sobrevive, y se ofrece codificarla con el tipo o el test más barato que obligue al orden dentro del alcance.
