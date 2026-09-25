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

La guía `08-principles` lo dice para los 23: no invocas el principio, usas el nombre para redirigir. Una frase alcanza porque la regla ya está leída.

El archivo cabe en una página. El objetivo, en sus palabras, es el **máximo resultado con el mínimo de código y complejidad**. Seis reglas, y un test.

## Las seis reglas

<div class="atlas-rules-grid">
  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">01</span>
      <span class="atlas-rule-title">Prefer deletion</span>
    </div>
    <p class="atlas-rule-body">Ante un refactor o un "mejóralo", buscar qué quitar antes de qué agregar.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">02</span>
      <span class="atlas-rule-title">Maintain a flat call hierarchy</span>
    </div>
    <p class="atlas-rule-body">Evitar cadenas de llamadas profundas. Una interfaz rica que esconde trabajo de verdad no cuenta como cadena profunda. Si contestar una pregunta obliga a cruzar más de tres archivos o capas, aplanar.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">03</span>
      <span class="atlas-rule-title">Consolidate decisions</span>
    </div>
    <p class="atlas-rule-body">La misma decisión no se repite en varios sitios. Una fuente de verdad, y el resultado viaja como un flag simple.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">04</span>
      <span class="atlas-rule-title">Minimize the diff</span>
    </div>
    <p class="atlas-rule-body">El cambio más chico que resuelve. Menos líneas ganan a un boilerplate "elegante".</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">05</span>
      <span class="atlas-rule-title">Question the threading</span>
    </div>
    <p class="atlas-rule-body">Si la tarea pide pasar una señal nueva por tipos, schemas, pipelines o capas parecidas, parar y buscar un camino más directo.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">06</span>
      <span class="atlas-rule-title">Sweat the small leaks</span>
    </div>
    <p class="atlas-rule-body">Quitar pass-throughs diminutos, fugas de representación y decisiones duplicadas antes de que se esparzan. Las fugas chicas se vuelven costo permanente de coordinación.</p>
  </div>
</div>

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

## Fronteras y contraste

Eso no es `principle-subtract-before-you-add`. Ese otro principio ordena una secuencia: primero quitas peso muerto, después construyes. Laziness juzga el tamaño del cambio que estás por hacer.

Otros archivos lo usan como límite:

- **`principle-attack-the-premise`**: Manda quitar la asimetría en vez de compensarla, y apunta aquí.
- **`principle-build-the-lever`**: Si hace falta un lever, que sea el script más chico que hace o prueba el trabajo, nunca un framework.
- **`architect`**: Repite el corte de tres archivos en su runner, junto con `principle-minimize-reader-load`.
- **`arena`**: Cuando dos candidatos empatan, se queda con el boundary más limpio o la API más chica.
- **`figure-it-out`**: Trata un segundo arena sobre un diseño ya cerrado como over-engineering y lo salta.

## Cuándo tiene techo

Dos playbooks le ponen un techo:

- En **`prototype`**, "smallest change" y la barra de verificación se invierten: importa la velocidad, no el pulido.
- En **`feature`**, Laziness Protocol no sirve para saltarse `arena` cuando hay varias formas válidas de implementar.
- En **`refactoring`**, se aplica al cerrar el paso de restar: el cambio más chico que llega a la forma objetivo, y un cleanup especulativo se revierte.
- En **`hillclimb`**, se queda con una simplificación que sostiene el número.

## Redirección rápida

Para redirigir a mitad de tarea, el nombre basta:

```text
use laziness protocol. delete the wrapper instead of adding another layer.
```
