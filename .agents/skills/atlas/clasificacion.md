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

| Ruta en el plugin de origen | Unidad dueña |
|---|---|
| `LICENSE`, `.gitignore`, `assets/logo.png` | `plugin` |
| `skills/poteto-mode/references/**`, `skills/poteto-mode/scripts/**` | `poteto-mode` |
| `skills/<skill>/references/**`, `skills/<skill>/scripts/**` | `<skill>` |
| `automations/benny/skills/<skill>/references/**` | `<skill>` |
| `automations/benny/templates/configuration.example.yaml` | `setup-benny` |
| `automations/benny/templates/triage-automation-prompt.md` | `triage-issue-reports` |
| `automations/benny/templates/reproduce-automation-prompt.md` | `reproduce-and-fix-issues` |
| `docs/guide/images/<imagen>` | la página de la guía que la incrusta (búscala con `grep -l 'images/<imagen>' docs/guide/*.md`) |

La unidad dueña cae en el grupo que le da la tabla de unidades.

Una ruta que no casa con ninguna fila es nueva en el plugin de origen. Detente y pide al usuario que decida su grupo antes de escribir.
