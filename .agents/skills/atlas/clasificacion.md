# Clasificación de rutas

Cada ruta del plugin de origen es una **unidad** o un **archivo de apoyo**. Gana la primera fila que case, de arriba abajo.

## Unidades

| Ruta en el plugin de origen | Grupo | Slug |
|---|---|---|
| `README.md` | `raiz` | `readme` |
| `.cursor-plugin/plugin.json` | `raiz` | `plugin` |
| `skills/poteto-mode/playbooks/<nombre>.md` | `playbooks` | `<nombre>` |
| `skills/<skill>/SKILL.md` | `skills` | `<skill>` |
| `agents/<nombre>.md` | `agents` | `<nombre>` |
| `automations/benny/README.md` | `automations` | `benny-readme` |
| `automations/benny/FOR_AGENTS.md` | `automations` | `for-agents` |
| `automations/benny/skills/<skill>/SKILL.md` | `automations` | `<skill>` |
| `docs/guide/README.md` | `guia` | `guide-readme` |
| `docs/guide/<nombre>.md` | `guia` | `<nombre>` |

El slug es único en todo el atlas, porque `habla-con` lo nombra sin grupo. Por eso los `README.md` que no son el de la raíz llevan delante el nombre de su carpeta. Fuera de esas excepciones, el slug es el nombre del archivo sin extensión, en minúsculas, con `_` cambiado por `-`.

## Archivos de apoyo

Un archivo dentro de la carpeta de una unidad pertenece a esa unidad, aunque otra unidad lo use. Un archivo en una carpeta compartida pertenece a la unidad cuyos pasos lo abren.

| Ruta en el plugin de origen | Unidad dueña |
|---|---|
| `LICENSE`, `.gitignore`, `assets/logo.png` | `plugin` |
| `skills/poteto-mode/references/**`, `skills/poteto-mode/scripts/**` | `poteto-mode` |
| `skills/<skill>/references/**`, `skills/<skill>/scripts/**` | `<skill>` |
| `automations/benny/skills/<skill>/references/**` | `<skill>` |
| `automations/benny/templates/**` | `setup-benny` |
| `docs/guide/images/<imagen>` | la página de la guía que la incrusta (búscala con `grep -l 'images/<imagen>' docs/guide/*.md`) |

La unidad dueña cae en el grupo que le da la tabla de unidades.

### Casos resueltos

- **Playbooks.** Cada `skills/poteto-mode/playbooks/<nombre>.md` es su propia unidad, en `playbooks`, y nunca es dueña de nada: la carpeta `playbooks/` solo contiene unidades. La fila de playbooks va antes que la de skills, así que gana.
- **Scripts de `poteto-mode`.** Todo `skills/poteto-mode/scripts/**` es de `poteto-mode`, también cuando lo llama un playbook: `watch-pr/` desde `babysit` y `shipping`, `orch/` desde `orchestrate`, `check-plan.mjs` desde `multi-phase-plan`, `worktree-audit.sh` desde `worktree-cleanup`. Viven en la carpeta de `poteto-mode` y `watch-pr` tiene dos llamadores. La página del playbook nombra el script y enlaza a `poteto-mode`.
- **Templates de Benny.** Los tres `automations/benny/templates/*` son de `setup-benny`: su paso 2 abre `configuration.example.yaml` y su creación de automatizaciones abre «the matching copied prompt template». Que `triage-automation-prompt.md` y `reproduce-automation-prompt.md` manden a leer `triage-issue-reports` y `reproduce-and-fix-issues` pone esos slugs en el `habla-con` de `setup-benny`, no los hace dueños.
- **References de Benny.** `routing.example.md` y `feature-map.example.md` viven en la carpeta de una skill de Benny y son de esa skill, aunque `setup-benny` los abra.

Una ruta que no casa con ninguna fila es nueva en el plugin de origen. Detente y pide al usuario que decida su grupo antes de escribir.
