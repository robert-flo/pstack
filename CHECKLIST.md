# pstack — checklist de réplica (158 archivos)

Orden de dependencia: de las hojas hacia el centro (`poteto-mode`). Marca con `[x]` cada archivo ya replicado y verificado. Verifica cada fase con `diff -r`.

Origen (solo lectura): https://github.com/cursor/plugins/tree/main/pstack/
Destino: https://github.com/robert-flo/pstack
Sitio: https://robert-flo.github.io/pstack/

## Fase 0 — La caja (5)

- [x] `README.md`
- [x] `LICENSE`
- [x] `.gitignore`
- [x] `.cursor-plugin/plugin.json`
- [x] `assets/logo.png`

## Fase 1 — Los átomos: 23 principios (23)

Core:

- [x] `skills/principle-laziness-protocol/SKILL.md`
- [x] `skills/principle-foundational-thinking/SKILL.md`
- [x] `skills/principle-redesign-from-first-principles/SKILL.md`
- [x] `skills/principle-attack-the-premise/SKILL.md`
- [ ] `skills/principle-subtract-before-you-add/SKILL.md`
- [ ] `skills/principle-minimize-reader-load/SKILL.md`
- [ ] `skills/principle-outcome-oriented-execution/SKILL.md`
- [ ] `skills/principle-experience-first/SKILL.md`
- [ ] `skills/principle-exhaust-the-design-space/SKILL.md`
- [ ] `skills/principle-build-the-lever/SKILL.md`

Arquitectura:

- [ ] `skills/principle-model-the-domain/SKILL.md`
- [ ] `skills/principle-boundary-discipline/SKILL.md`
- [ ] `skills/principle-type-system-discipline/SKILL.md`
- [ ] `skills/principle-make-operations-idempotent/SKILL.md`
- [ ] `skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md`
- [ ] `skills/principle-separate-before-serializing-shared-state/SKILL.md`

Verificación:

- [ ] `skills/principle-prove-it-works/SKILL.md`
- [ ] `skills/principle-fix-root-causes/SKILL.md`
- [ ] `skills/principle-sequence-verifiable-units/SKILL.md`
- [ ] `skills/principle-test-behavior-not-implementation/SKILL.md`

Delegación:

- [ ] `skills/principle-guard-the-context-window/SKILL.md`
- [ ] `skills/principle-never-block-on-the-human/SKILL.md`

Meta:

- [ ] `skills/principle-encode-lessons-in-structure/SKILL.md`

## Fase 2 — Skills utilitarias independientes (31)

- [ ] `skills/how/SKILL.md`
- [ ] `skills/how/references/explorer-prompt.md`
- [ ] `skills/how/references/explainer-prompt.md`
- [ ] `skills/why/SKILL.md`
- [ ] `skills/why/references/epistemics.md`
- [ ] `skills/why/references/investigator-prompt.md`
- [ ] `skills/why/references/source-playbook.md`
- [ ] `skills/why/references/synthesizer-prompt.md`
- [ ] `skills/why/references/sources/code-archaeology.md`
- [ ] `skills/why/references/sources/databricks.md`
- [ ] `skills/why/references/sources/datadog.md`
- [ ] `skills/why/references/sources/incident-postmortem.md`
- [ ] `skills/why/references/sources/linear.md`
- [ ] `skills/why/references/sources/notion.md`
- [ ] `skills/why/references/sources/sentry.md`
- [ ] `skills/why/references/sources/slack.md`
- [ ] `skills/unslop/SKILL.md`
- [ ] `skills/bro/SKILL.md`
- [ ] `skills/technical-writing/SKILL.md`
- [ ] `skills/tdd/SKILL.md`
- [ ] `skills/typescript-best-practices/SKILL.md`
- [ ] `skills/typescript-best-practices/references/patterns.md`
- [ ] `skills/no-comments/SKILL.md`
- [ ] `agents/comment-sicko.md` (lo consume no-comments)
- [ ] `skills/blast-radius/SKILL.md`
- [ ] `skills/figure-it-out/SKILL.md`
- [ ] `skills/create-verification-skill/SKILL.md`
- [ ] `skills/create-verification-skill/references/feature-map-example/README.md`
- [ ] `skills/create-verification-skill/references/feature-map-example/create-note.md`
- [ ] `skills/create-verification-skill/references/feature-map-example/search.md`
- [ ] `skills/maintain-verification-skill/SKILL.md`

## Fase 3 — Skills con referencia entre sí (24)

- [ ] `skills/arena/SKILL.md`
- [ ] `skills/swarm/SKILL.md`
- [ ] `skills/interrogate/SKILL.md`
- [ ] `skills/interrogate/references/rubric.md`
- [ ] `skills/interrogate/references/code-quality-review.md`
- [ ] `skills/interrogate/references/reviewer-prompt.md`
- [ ] `skills/interrogate/references/lead-judgment.md`
- [ ] `skills/architect/SKILL.md`
- [ ] `skills/architect/references/design-red-flags.md`
- [ ] `skills/architect/references/rationale-template.md`
- [ ] `skills/architect/references/runner-prompt.md`
- [ ] `skills/teach/SKILL.md`
- [ ] `skills/recall/SKILL.md`
- [ ] `skills/reflect/SKILL.md`
- [ ] `skills/reflect/references/divergent-reviewer.md`
- [ ] `skills/reflect/references/judgment-reviewer.md`
- [ ] `skills/reflect/references/synthesizer.md`
- [ ] `skills/reflect/references/tooling-reviewer.md`
- [ ] `skills/show-me-your-work/SKILL.md`
- [ ] `skills/show-me-your-work/references/decision-log-template.tsv`
- [ ] `skills/show-me-your-work/scripts/log.sh`
- [ ] `skills/automate-me/SKILL.md`
- [ ] `skills/setup-pstack/SKILL.md`
- [ ] `skills/make-bot-ui/SKILL.md`

## Fase 4 — El motor de scripting (20)

- [ ] `skills/poteto-mode/scripts/package.json`
- [ ] `skills/poteto-mode/scripts/bun.lock`
- [ ] `skills/poteto-mode/scripts/check-plan.mjs`
- [ ] `skills/poteto-mode/scripts/worktree-audit.sh`
- [ ] `skills/poteto-mode/scripts/watch-pr/watch-pr`
- [ ] `skills/poteto-mode/scripts/watch-pr/tsconfig.json`
- [ ] `skills/poteto-mode/scripts/watch-pr/types.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/types.compile.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/github.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/github.test.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/policy.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/policy.test.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/render.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/cli.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/cli.test.ts`
- [ ] `skills/poteto-mode/scripts/watch-pr/fakes.test-helper.ts`
- [ ] `skills/poteto-mode/scripts/orch/orch.ts`
- [ ] `skills/poteto-mode/scripts/orch/store.ts`
- [ ] `skills/poteto-mode/scripts/orch/orch.test.ts`
- [ ] `skills/poteto-mode/scripts/bootstrap.ts`

## Fase 5 — Los 23 playbooks (23)

Resolución de un problema:

- [ ] `skills/poteto-mode/playbooks/investigation.md`
- [ ] `skills/poteto-mode/playbooks/bug-fix.md`
- [ ] `skills/poteto-mode/playbooks/feature.md`
- [ ] `skills/poteto-mode/playbooks/prototype.md`
- [ ] `skills/poteto-mode/playbooks/refactoring.md`
- [ ] `skills/poteto-mode/playbooks/perf-issue.md`
- [ ] `skills/poteto-mode/playbooks/visual-parity.md`
- [ ] `skills/poteto-mode/playbooks/runtime-forensics.md`
- [ ] `skills/poteto-mode/playbooks/trace-forensics.md`
- [ ] `skills/poteto-mode/playbooks/hillclimb.md`

Iteración sobre el propio sistema:

- [ ] `skills/poteto-mode/playbooks/eval.md`
- [ ] `skills/poteto-mode/playbooks/authoring-a-skill.md`

Coordinación y flotas:

- [ ] `skills/poteto-mode/playbooks/autonomous-run.md`
- [ ] `skills/poteto-mode/playbooks/babysit.md`
- [ ] `skills/poteto-mode/playbooks/multi-phase-plan.md`
- [ ] `skills/poteto-mode/playbooks/shipping.md`
- [ ] `skills/poteto-mode/playbooks/autopilot-full.md`
- [ ] `skills/poteto-mode/playbooks/autopilot-stack.md`
- [ ] `skills/poteto-mode/playbooks/orchestrate.md`

Operativos:

- [ ] `skills/poteto-mode/playbooks/session-pickup.md`
- [ ] `skills/poteto-mode/playbooks/pause-safely.md`
- [ ] `skills/poteto-mode/playbooks/opening-a-pr.md` (se invoca al final de casi todos)
- [ ] `skills/poteto-mode/playbooks/worktree-cleanup.md`

## Fase 6 — El centro: poteto-mode (3)

- [ ] `skills/poteto-mode/SKILL.md`
- [ ] `skills/poteto-mode/references/bugbot-triage.md`
- [ ] `agents/poteto-agent.md` (lee poteto-mode en su totalidad)

## Fase 7 — El envoltorio: automations/benny (12)

- [ ] `automations/benny/README.md`
- [ ] `automations/benny/FOR_AGENTS.md`
- [ ] `automations/benny/skills/setup-benny/SKILL.md`
- [ ] `automations/benny/skills/triage-issue-reports/SKILL.md`
- [ ] `automations/benny/skills/triage-issue-reports/references/routing.example.md`
- [ ] `automations/benny/skills/reproduce-and-fix-issues/SKILL.md`
- [ ] `automations/benny/skills/reproduce-and-fix-issues/references/control-adapter.md`
- [ ] `automations/benny/skills/reproduce-and-fix-issues/references/feature-map.example.md`
- [ ] `automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md`
- [ ] `automations/benny/templates/configuration.example.yaml`
- [ ] `automations/benny/templates/triage-automation-prompt.md`
- [ ] `automations/benny/templates/reproduce-automation-prompt.md`

## Fase 8 — Cierre: el manual de uso (17)

- [ ] `docs/guide/README.md`
- [ ] `docs/guide/01-setup.md`
- [ ] `docs/guide/02-poteto-mode.md`
- [ ] `docs/guide/03-understand.md`
- [ ] `docs/guide/04-design.md`
- [ ] `docs/guide/05-build-and-clean.md`
- [ ] `docs/guide/06-verify-and-ship.md`
- [ ] `docs/guide/07-overnight.md`
- [ ] `docs/guide/08-principles.md`
- [ ] `docs/guide/09-make-it-yours.md`
- [ ] `docs/guide/10-recipes-and-pitfalls.md`
- [ ] `docs/guide/images/design.jpg`
- [ ] `docs/guide/images/overnight.jpg`
- [ ] `docs/guide/images/recipes.jpg`
- [ ] `docs/guide/images/router.jpg`
- [ ] `docs/guide/images/understanding.jpg`

Cierre: relee `skills/teach/SKILL.md` (fase 3) para cerrar el ciclo.
