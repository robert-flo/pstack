# Contexto

Vocabulario del atlas: el sitio Starlight en `atlas/` que explica, en español, cómo está armado pstack archivo por archivo. La spec es [#2](https://github.com/robert-flo/pstack/issues/2).

## Términos

**Atlas.** El sitio de documentación de construcción, publicado en `https://robert-flo.github.io/pstack/`. No es la guía de usuario del plugin: explica para qué existe cada archivo y con qué se relaciona.

**Plugin de origen.** El checkout local del pstack publicado por Cursor. Cada capítulo explica el archivo tal como funciona ahí, no como está la copia en este repo. Este repo solo decide qué unidades ya tienen página.

**Unidad.** Un archivo del plugin que merece página propia porque se invoca o tiene trabajo propio: el README del plugin, el manifiesto, cada skill del directorio principal, cada playbook, cada agent, cada skill de Benny, el README de Benny, el documento para agentes de Benny y cada página de la guía.

**Unidad dueña.** La unidad a la que pertenece un archivo de apoyo. Su página explica también sus apoyos.

**Archivo de apoyo.** Un archivo que no es unidad: templates, references, scripts, tests, lockfiles. La licencia, el gitignore y el logo se explican dentro de la página del manifiesto.

**Capítulo.** La página de una unidad. Prosa libre en español; nombres de skills, comandos y citas en inglés. Vive en `atlas/src/content/docs/<grupo>/<slug>.md` y se publica en `/<grupo>/<slug>/`. El slug es el nombre del archivo sin extensión.

**Página temporal.** El capítulo provisional de un archivo de apoyo cuyo dueño todavía no tiene página. Vive en el grupo del futuro dueño. Su slug es la ruta del archivo con barras y puntos cambiados por guiones. Cuando llega el dueño, su prosa pasa a la página del dueño, la página temporal se borra y sus enlaces apuntan al dueño.

**Portada.** `atlas/src/content/docs/index.md`. No pertenece a ningún grupo. Tiene una introducción estable, que nadie reescribe, y el bloque Relaciones.

**Bloque Relaciones.** La parte de la portada entre `<!-- relaciones:inicio -->` y `<!-- relaciones:fin -->`. Se reescribe entero a partir de todos los `habla-con`. Enlaza solo capítulos que existen; los vecinos sin página aparecen por nombre, sin enlace.

**Grupo.** La carpeta de un capítulo y el valor de su campo `grupo`. Hay seis:

- `raiz`: el README y el manifiesto del plugin.
- `skills`: cada skill del directorio principal de skills.
- `playbooks`: cada playbook.
- `agents`: cada agent que publica el plugin.
- `automations`: Benny, sus skills, su README y su documento para agentes.
- `guia`: cada página de la guía, explicada como archivo del sistema.

## Frontmatter

Todo capítulo lleva, además de `title`, estos cuatro campos. El build falla si falta uno o si no cumple su forma.

- `grupo`: uno de los seis grupos, igual a la carpeta.
- `orden`: entero, múltiplo de 10, según el orden de dependencias dentro del grupo. El salto deja sitio para insertar sin renumerar.
- `fuente`: la ruta del archivo en el plugin de origen, por ejemplo `skills/principle-laziness-protocol/SKILL.md`.
- `habla-con`: lista de slugs de otras unidades (minúsculas, cifras y guiones), tengan o no página.

## Enlaces internos

Un enlace a otro capítulo lleva la base del sitio: `/pstack/<grupo>/<slug>/`. El build falla si un enlace interno no tiene base o apunta a una página que no existe.
