---
title: Laziness Protocol
description: "Apply when refactoring, evaluating diff size, or tempted to add abstractions, layers, or signal threading. Bias toward deletion and the smallest change that solves the problem."
grupo: skills
orden: 10
fuente: skills/principle-laziness-protocol/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - readme
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

## Jerarquía y clasificación

Dentro del sistema pstack, este archivo pertenece a la jerarquía:

> **Skills** › **Principles** › **The core principles**

Según la guía `08-principles`, cada uno de los 23 principios se clasifica en uno de cinco bloques:

- **The core principles** (10 principios): deciden cuánto construir y cuándo repensar el diseño ([Laziness Protocol](/pstack/skills/principle-laziness-protocol/), [Foundational Thinking](/pstack/skills/principle-foundational-thinking/), [Redesign from First Principles](/pstack/skills/principle-redesign-from-first-principles/), [Attack the Premise](/pstack/skills/principle-attack-the-premise/), [Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/), [Minimize Reader Load](/pstack/skills/principle-minimize-reader-load/), [Outcome-Oriented Execution](/pstack/skills/principle-outcome-oriented-execution/), [Experience First](/pstack/skills/principle-experience-first/), [Exhaust the Design Space](/pstack/skills/principle-exhaust-the-design-space/), [Build the Lever](/pstack/skills/principle-build-the-lever/)).
- **The architecture principles** (6 principios): deciden dónde viven el estado, la validación y la compatibilidad ([Model the Domain](/pstack/skills/principle-model-the-domain/), [Boundary Discipline](/pstack/skills/principle-boundary-discipline/), [Type System Discipline](/pstack/skills/principle-type-system-discipline/), [Make Operations Idempotent](/pstack/skills/principle-make-operations-idempotent/), [Migrate Callers Then Delete Legacy APIs](/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/), [Separate Before Serializing Shared State](/pstack/skills/principle-separate-before-serializing-shared-state/)).
- **The verification principles** (4 principios): definen qué cuenta como prueba ([Prove It Works](/pstack/skills/principle-prove-it-works/), [Fix Root Causes](/pstack/skills/principle-fix-root-causes/), `principle-sequence-verifiable-units`, `principle-test-behavior-not-implementation`).
- **The delegation principles** (2 principios): mantienen cuerdo el trabajo en paralelo (`principle-guard-the-context-window`, `principle-never-block-on-the-human`).
- **And one meta principle** (1 principio): convierte lecciones repetidas dos veces en un lint, check o script (`principle-encode-lessons-in-structure`).

`principle-laziness-protocol` es el primero del bloque **Core**. Existe para que el cambio no crezca más que el problema: borrar antes de agregar, y quedarse con el diff más chico que lo resuelve. El `readme` del plugin lo resume en su tabla de principios con la misma frase: "Bias toward deletion and the smallest change that solves the problem."

## Activación y contexto

Nadie lo llama con un slash command. El frontmatter trae `disable-model-invocation: true`, así que la descripción no dispara el skill sola. Lo despierta `poteto-mode`.

En una tarea de varios pasos el modo lee el índice de principios. La entrada de este dice cuándo aplica: "Refactoring, sizing a diff, or tempted to add abstractions, layers, or signal threading." Si el trabajo cae ahí, el modo lee este `SKILL.md` entero, porque su índice manda: "Read the leaf skill in full for any principle you apply." En la respuesta tiene que nombrar el principio y la decisión concreta que cambió. La guía `08-principles` lo dice así: "A principle citation with no decision behind it is the tell that it name-dropped instead of applying."

## Las seis reglas, en una línea

El texto completo de cada regla vive en el `SKILL.md`; acá va solo el mapa, para ubicar cuál aplica antes de ir a leerla:

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
    "If a human developer would find the code exhausting to maintain, it is a bad solution."
  </p>
</div>

La prueba no mide líneas: mide el cansancio de quien va a mantener el código. Por eso cierra las seis reglas.

## Fronteras y contraste

Eso no es [Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/). Ese otro principio ordena una secuencia: primero quitas peso muerto, después construyes. Laziness juzga el tamaño del cambio que estás por hacer, no el orden de los pasos. El playbook `refactoring` los usa a los dos en el mismo paso, uno detrás del otro: resta primero y después "The smallest change that reaches the target shape ships (**principle-laziness-protocol**)."

Con `arena` la relación es de desempate. Cuando dos candidatos quedan parejos, `arena` elige la base así: "Prefer the cleaner boundary or smaller API when two feel tied, per the Laziness Protocol." El principio no sustituye la comparación; decide entre candidatos que ya se compararon.

Otros archivos lo usan como límite más directo:

- **[Attack the Premise](/pstack/skills/principle-attack-the-premise/)**: manda "Remove the asymmetry instead of compensating for it", y apunta aquí para justificarlo.
- **[Build the Lever](/pstack/skills/principle-build-the-lever/)**: si hace falta un lever, "build the smallest script that does or proves the job, never a framework."
- **`architect`**: su runner repite el corte de tres archivos, "per the **laziness-protocol** and **minimize-reader-load** principle skills", junto con [Minimize Reader Load](/pstack/skills/principle-minimize-reader-load/).
- **`figure-it-out`**: trata un segundo `arena` sobre un diseño ya cerrado como over-engineering y lo salta: "A second arena over a settled design is over-engineering."

## Cuándo tiene techo

Cuatro playbooks lo limitan, cada uno por una razón distinta:

- **`prototype`**: es "The one playbook where the Laziness Protocol's \"smallest change\" and the verification bar invert." Ahí manda la velocidad de aprendizaje: el prototipo se tira, así que el costo de mantenerlo no cuenta.
- **`feature`**: cuando la implementación admite varias formas válidas, delegar por `arena` es obligatorio, y "Laziness Protocol does not override it (the gain is review separation, not lines saved)." El diff chico solo es la meta una vez elegido el diseño.
- **`refactoring`**: se aplica al cerrar el paso de restar, con el cambio más chico que llega a la forma objetivo. Un cleanup especulativo no se salva por ser chico: "A speculative cleanup that \"might help\" gets reverted."
- **`hillclimb`**: "Correctness and simplicity outrank the number." Se queda con la simplificación que sostiene el número: "keep a simplification that holds the number."

## Redirección rápida

La guía `08-principles` explica cómo se usa a mitad de tarea: "You don't invoke principles. You use their names to steer." Nombrar Laziness Protocol en un mensaje basta para que el agente vuelva a la regla que ya leyó.
