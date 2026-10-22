---
title: Atlas de pstack
description: Mapa interactivo de arquitectura, principios, skills y playbooks de pstack.
---

Este atlas explica cómo está armado pstack, archivo por archivo.

<div class="atlas-rules-grid">
  <a href="/pstack/skills/principle-laziness-protocol/" class="atlas-rule-card" style="text-decoration: none;">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">⚡</span>
      <span class="atlas-rule-title">Skills & Principios</span>
    </div>
    <p class="atlas-rule-body">Heurísticas y protocolos activos del sistema. Empieza explorando <strong>Laziness Protocol</strong>.</p>
  </a>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">📋</span>
      <span class="atlas-rule-title">Playbooks</span>
    </div>
    <p class="atlas-rule-body">Flujos deterministas para desarrollo de features, prototipos, arena y refactoring.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">🤖</span>
      <span class="atlas-rule-title">Agents</span>
    </div>
    <p class="atlas-rule-body">Modos de agente, subagentes autónomos y contratos de triaje operativo.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">⚙️</span>
      <span class="atlas-rule-title">Automations</span>
    </div>
    <p class="atlas-rule-body">Scripts, verificadores y automatizaciones de soporte para el pipeline.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">📖</span>
      <span class="atlas-rule-title">Guía</span>
    </div>
    <p class="atlas-rule-body">Reglas de diseño, convención de nombres y manual de operaciones.</p>
  </div>

  <div class="atlas-rule-card">
    <div class="atlas-rule-header">
      <span class="atlas-rule-index">📁</span>
      <span class="atlas-rule-title">Raíz</span>
    </div>
    <p class="atlas-rule-body">Contexto central, directrices de arquitectura (ADRs) y configuración base.</p>
  </div>
</div>

## Relaciones

<!-- relaciones:inicio -->

Cada capítulo y las unidades con las que habla. Los nombres sin enlace todavía no tienen página.

- [Laziness Protocol](/pstack/skills/principle-laziness-protocol/) habla con `poteto-mode`, `08-principles`, `readme`, `prototype`, `feature`, `refactoring`, `hillclimb`, `architect`, `arena`, `figure-it-out`, [Build the Lever](/pstack/skills/principle-build-the-lever/) y [Attack the Premise](/pstack/skills/principle-attack-the-premise/).
- [Foundational Thinking](/pstack/skills/principle-foundational-thinking/) habla con `poteto-mode`, `08-principles`, `feature`, `architect` y `multi-phase-plan`.
- [Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/) habla con `poteto-mode`, `08-principles`, `architect`, `refactoring` y [Attack the Premise](/pstack/skills/principle-attack-the-premise/).
- [Attack the Premise](/pstack/skills/principle-attack-the-premise/) habla con `poteto-mode`, `08-principles`, `bug-fix`, `investigation` y [Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/).
- [Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/) habla con `poteto-mode`, `08-principles`, `refactoring`, [Laziness Protocol](/pstack/skills/principle-laziness-protocol/) y [Minimize Reader Load](/pstack/skills/principle-minimize-reader-load/).
- [Minimize Reader Load](/pstack/skills/principle-minimize-reader-load/) habla con `poteto-mode`, `08-principles`, `interrogate`, `no-comments` y [Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/).
- [Outcome-Oriented Execution](/pstack/skills/principle-outcome-oriented-execution/) habla con `poteto-mode`, `08-principles`, `multi-phase-plan`, `refactoring` y [Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/).
- [Experience First](/pstack/skills/principle-experience-first/) habla con `poteto-mode`, `08-principles`, `feature`, `prototype` y [Foundational Thinking](/pstack/skills/principle-foundational-thinking/).
- [Exhaust the Design Space](/pstack/skills/principle-exhaust-the-design-space/) habla con `poteto-mode`, `08-principles`, `prototype`, `architect` y [Experience First](/pstack/skills/principle-experience-first/).
- [Build the Lever](/pstack/skills/principle-build-the-lever/) habla con `poteto-mode`, `08-principles`, [Laziness Protocol](/pstack/skills/principle-laziness-protocol/), [Attack the Premise](/pstack/skills/principle-attack-the-premise/) y `swarm`.
- [Model the Domain](/pstack/skills/principle-model-the-domain/) habla con `08-principles`, `poteto-mode`, [Foundational Thinking](/pstack/skills/principle-foundational-thinking/) y [Boundary Discipline](/pstack/skills/principle-boundary-discipline/).
- [Boundary Discipline](/pstack/skills/principle-boundary-discipline/) habla con `08-principles`, `poteto-mode` y [Model the Domain](/pstack/skills/principle-model-the-domain/).
- [Type System Discipline](/pstack/skills/principle-type-system-discipline/) habla con `08-principles`, `poteto-mode`, [Model the Domain](/pstack/skills/principle-model-the-domain/), [Boundary Discipline](/pstack/skills/principle-boundary-discipline/) y [Make Operations Idempotent](/pstack/skills/principle-make-operations-idempotent/).
- [Make Operations Idempotent](/pstack/skills/principle-make-operations-idempotent/) habla con `08-principles`, `poteto-mode`, [Model the Domain](/pstack/skills/principle-model-the-domain/) y [Outcome-Oriented Execution](/pstack/skills/principle-outcome-oriented-execution/).
- [Migrate Callers Then Delete Legacy APIs](/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/) habla con `08-principles`, `poteto-mode`, [Outcome-Oriented Execution](/pstack/skills/principle-outcome-oriented-execution/) y [Model the Domain](/pstack/skills/principle-model-the-domain/).
- [Separate Before Serializing Shared State](/pstack/skills/principle-separate-before-serializing-shared-state/) habla con `08-principles`, `poteto-mode`, [Model the Domain](/pstack/skills/principle-model-the-domain/) y [Make Operations Idempotent](/pstack/skills/principle-make-operations-idempotent/).
- [Prove It Works](/pstack/skills/principle-prove-it-works/) habla con `08-principles`, `poteto-mode`, [Fix Root Causes](/pstack/skills/principle-fix-root-causes/) y `show-me-your-work`.
- [Fix Root Causes](/pstack/skills/principle-fix-root-causes/) habla con `08-principles`, `poteto-mode`, [Prove It Works](/pstack/skills/principle-prove-it-works/) y [Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/).
- [Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/) habla con `08-principles`, `poteto-mode`, [Prove It Works](/pstack/skills/principle-prove-it-works/), [Build the Lever](/pstack/skills/principle-build-the-lever/) y [Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/).
- [Test Behavior, Not Implementation](/pstack/skills/principle-test-behavior-not-implementation/) habla con `08-principles`, `poteto-mode`, [Prove It Works](/pstack/skills/principle-prove-it-works/) y [Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/).
- [How](/pstack/skills/how/) habla con `08-principles`, `poteto-mode`, `why` e `interrogate`.
- [Why](/pstack/skills/why/) habla con [How](/pstack/skills/how/), `08-principles`, `poteto-mode` e `incident-postmortem`.
- [Unslop](/pstack/skills/unslop/) corta los patrones de escritura de IA; habla con [Why](/pstack/skills/why/) y `technical-writing`.
- [Bro](/pstack/skills/bro/) reexplica la última respuesta sin jerga, en lenguaje humano; habla con [Technical Writing](/pstack/skills/technical-writing/) y [Unslop](/pstack/skills/unslop/).
- [Technical Writing](/pstack/skills/technical-writing/) fija el estándar de escritura en cuatro capas (Diátaxis, Google, STE, Global English) y aplica [Unslop](/pstack/skills/unslop/) a cada doc que toca.
- [TDD](/pstack/skills/tdd/) convierte el bug en un test de regresión que falla antes del fix; habla con [Prove It Works](/pstack/skills/principle-prove-it-works/) y [Test Behavior, Not Implementation](/pstack/skills/principle-test-behavior-not-implementation/).
- [TypeScript Best Practices](/pstack/skills/typescript-best-practices/) condensa las reglas de tipado en una tabla; aplica primero [Type System Discipline](/pstack/skills/principle-type-system-discipline/) y remite a [Boundary Discipline](/pstack/skills/principle-boundary-discipline/) en las fronteras.
- [Guard the Context Window](/pstack/skills/principle-guard-the-context-window/) habla con `08-principles`, `poteto-mode`, `swarm` y [Laziness Protocol](/pstack/skills/principle-laziness-protocol/).
- [Never Block on the Human](/pstack/skills/principle-never-block-on-the-human/) habla con `08-principles`, `poteto-mode`, `autonomous-run` y [Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/).
- [Encode Lessons in Structure](/pstack/skills/principle-encode-lessons-in-structure/) habla con `08-principles`, `poteto-mode`, [Guard the Context Window](/pstack/skills/principle-guard-the-context-window/) y [Never Block on the Human](/pstack/skills/principle-never-block-on-the-human/).

- [No Comments](/pstack/skills/no-comments/) lanza Comment Sicko y actúa solo sobre sus hallazgos aceptados; aplica [Fix Root Causes](/pstack/skills/principle-fix-root-causes/) y [Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/), con [How](/pstack/skills/how/) y [Why](/pstack/skills/why/) como check previo de cada kill o keep delgado.
- [Comment Sicko](/pstack/agents/comment-sicko/) es el cazador de comentarios muertos detrás de [No Comments](/pstack/skills/no-comments/); solo reporta y marca `MUST KILL`, y sentencia con [How](/pstack/skills/how/) y [Why](/pstack/skills/why/).
- [Blast Radius](/pstack/skills/blast-radius/) encuentra lo que un cambio rompe más allá del diff y prueba el hecho único de su seguridad corriendo código real; cierra la tríada con [How](/pstack/skills/how/) y [Why](/pstack/skills/why/), y escribe a través de [Unslop](/pstack/skills/unslop/).
- [Figure It Out](/pstack/skills/figure-it-out/) diseña el playbook auditable cuando ningún playbook más estrecho encaja: encuadra con [Prove It Works](/pstack/skills/principle-prove-it-works/), corre el bucle de hipótesis con [Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/) y commitea la bitácora con show-me-your-work.
- [Create Verification Skill](/pstack/skills/create-verification-skill/) genera una skill de verificación local que maneja la app como la usaría un usuario y deja evidencia que sobrevive al teardown; prueba contra [Prove It Works](/pstack/skills/principle-prove-it-works/) y remite a `maintain-verification-skill` para el mantenimiento.
<!-- relaciones:fin -->
