---
title: Laziness Protocol
description: Bias toward deletion and the smallest change that solves the problem.
grupo: skills
orden: 10
fuente: skills/principle-laziness-protocol/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - prototype
  - feature
  - refactoring
  - hillclimb
  - architect
  - arena
  - figure-it-out
  - principle-build-the-lever
  - principle-attack-the-premise
---

`principle-laziness-protocol` es uno de los 23 principios, y el primero del bloque Core dentro de `poteto-mode`. Existe para que el cambio no crezca más que el problema: borrar antes de agregar, y quedarse con el diff más chico que lo resuelve.

## Activación y contexto

Nadie lo llama con un slash command. El frontmatter trae `disable-model-invocation: true`, así que la descripción no dispara el skill sola. Lo despierta `poteto-mode`.

En una tarea de varios pasos el modo lee el índice de principios. Si el trabajo es un refactor, hay que medir un diff, o aparece la tentación de agregar una abstracción, una capa, o de enhebrar una señal nueva por tipos y schemas, el modo lee este `SKILL.md` entero. En la respuesta tiene que nombrar el principio y la decisión concreta que cambió. Citarlo sin esa decisión es name-dropping.

## Las seis reglas, en una línea

El texto completo de cada regla vive en el `SKILL.md` — acá va solo el mapa, para ubicar cuál aplica antes de ir a leerla:

| # | Regla | Cuándo la necesitas |
|---|---|---|
| 01 | **Prefer deletion** | Antes de agregar código a un "mejóralo" |
| 02 | **Flat call hierarchy** | Contestar algo te obliga a cruzar >3 archivos |
| 03 | **Consolidate decisions** | La misma decisión aparece en más de un sitio |
| 04 | **Minimize the diff** | Dos soluciones resuelven lo mismo, distinto tamaño |
| 05 | **Question the threading** | Piden pasar una señal nueva por tipos/schemas/pipelines |
| 06 | **Sweat the small leaks** | Un pass-through o una fuga de representación se repite |

<div class="atlas-test-card">
  <div class="atlas-test-header">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    The Test
  </div>
  <p class="atlas-test-quote">
    Si un humano se agotaría manteniendo el código, es una mala solución.
  </p>
</div>

## Cómo se ve en la práctica

<div class="atlas-case-card">
  <div class="atlas-case-title">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
    Caso — threading (regla 05)
  </div>
  <p class="atlas-case-body">
    La tarea pide que un flag <code>debugMode</code> llegue desde la config hasta un logger tres capas abajo. El camino "obvio" es agregarlo al tipo de config, al schema de validación, y a cada función intermedia que lo reenvía. Laziness Protocol para eso ahí: la pregunta correcta es si el logger puede leer el flag directo de un singleton o de contexto, sin que viaje por firma de función. El diff resultante es una línea en el logger, no cuatro archivos tocados.
  </p>
</div>

<div class="atlas-case-card">
  <div class="atlas-case-title">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
    Caso — deletion (regla 01)
  </div>
  <p class="atlas-case-body">
    Piden "mejorar" el manejo de errores de un endpoint. El impulso es envolver la lógica existente en un <code>try/catch</code> más granular con tipos de error custom. Antes de eso, la regla obliga a preguntar qué del manejo actual ya no se usa — típicamente hay un fallback muerto o una rama que nunca se ejecuta porque el caller ya valida antes. Sacar eso primero deja ver si el problema real necesitaba menos código, no más.
  </p>
</div>

## Fronteras y contraste

Eso no es `principle-subtract-before-you-add`. Ese otro principio ordena una secuencia: primero quitas peso muerto, después construyes. Laziness juzga el tamaño del cambio que estás por hacer, no el orden de los pasos.

La tensión más real es con `arena`: cuando hay dos diseños válidos para el mismo problema, `arena` pide compararlos, lo cual puede parecer lo opuesto de "el diff más chico". No lo es — Laziness Protocol decide el tamaño de cada candidato antes de que `arena` los enfrente; no autoriza saltarse la comparación cuando de verdad hay ambigüedad de diseño. `feature` es donde esto se vuelve explícito: ahí Laziness Protocol no sirve de excusa para evitar `arena` solo porque comparar toma más texto que no comparar.

Otros archivos lo usan como límite más directo:

- **`principle-attack-the-premise`**: manda quitar la asimetría en vez de compensarla, y apunta aquí para decidir cuánto quitar.
- **`principle-build-the-lever`**: si hace falta un lever, que sea el script más chico que hace o prueba el trabajo, nunca un framework.
- **`architect`**: repite el corte de tres archivos en su runner, junto con `principle-minimize-reader-load`.
- **`figure-it-out`**: trata un segundo `arena` sobre un diseño ya cerrado como over-engineering y lo salta.

## Cuándo tiene techo

Cuatro playbooks lo limitan, cada uno por una razón distinta:

- **`prototype`**: "smallest change" se invierte porque lo que se mide ahí es velocidad de aprendizaje, no costo de mantenimiento — el código se va a tirar, así que el argumento de "un humano tendrá que mantener esto" no aplica.
- **`feature`**: no sirve para saltarse `arena` cuando hay varias formas válidas de implementar (ver arriba) — el diff chico solo es la meta correcta una vez elegido el diseño.
- **`refactoring`**: se aplica al cerrar el paso de restar — el cambio más chico que llega a la forma objetivo — pero un cleanup especulativo (sin issue que lo pida) se revierte, porque ahí el diff mínimo es cero.
- **`hillclimb`**: se queda con la simplificación que sostiene el número que se está optimizando; una simplificación que lo baja no cuenta, sin importar cuánto código ahorre.

## Redirección rápida

Para redirigir a mitad de tarea, el nombre basta:

```text
use laziness protocol. delete the wrapper instead of adding another layer.
```
