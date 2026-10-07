---
name: atlas
description: Escribe o completa la página del atlas para un archivo del plugin de origen, sea unidad o archivo de apoyo, y reescribe el bloque Relaciones de la portada.
disable-model-invocation: true
---

# Atlas

Se invoca con la ruta de **un solo archivo**, relativa a la raíz del plugin: `/atlas skills/principle-laziness-protocol/SKILL.md`. Opcionalmente, `--origen <dir>` fija la raíz del plugin de origen.

El vocabulario (unidad, unidad dueña, archivo de apoyo, capítulo, página temporal, portada, bloque Relaciones, grupo) es el de `CONTEXT.md`. Léelo antes del paso 1.

Los scripts de esta carpeta hacen la parte mecánica: calcular slugs, detectar páginas temporales, redirigir enlaces, enlazar menciones y reescribir la portada. Córrelos desde la raíz del repo; tú escribes la prosa.

## 1. Resolver el plugin de origen

Con `--origen`, esa carpeta es el plugin de origen. Sin él, es el checkout más reciente de la caché de Cursor:

```bash
ls -dt ~/.cursor/plugins/cache/cursor-public/pstack/*/ | head -1
```

Hecho cuando la carpeta contiene `.cursor-plugin/plugin.json`. Si no lo contiene, o el glob no devuelve nada, detente y pide `--origen`.

## 2. Validar la ruta

La ruta pasa si es exactamente una y nombra un archivo regular dentro del plugin de origen. Un directorio se rechaza, aunque contenga un solo archivo: detente y pide la ruta de un archivo. Una ruta que no existe en el plugin de origen también se rechaza.

## 3. Clasificar

Clasifica la ruta con [`clasificacion.md`](clasificacion.md). El resultado es una unidad, con su grupo y su slug, o un archivo de apoyo, con su unidad dueña y el grupo de esa dueña. Una unidad tiene capítulo si existe `atlas/src/content/docs/<grupo>/<slug>.md`.

La clasificación decide la **página destino** de esta invocación:

| Caso | Página destino |
|---|---|
| Unidad | Su capítulo, `<grupo>/<slug>.md`. |
| Apoyo cuyo dueño tiene capítulo | El capítulo del dueño. No se crea otra página. |
| Apoyo cuyo dueño no tiene capítulo | Una página temporal en el grupo del dueño: `<grupo-del-dueño>/<slug-temporal>.md`. |

El slug temporal lo da el script; nunca lo escribas a mano:

```bash
node .agents/skills/atlas/temporales.mjs slug <ruta>
```

Si la página destino ya existe, el paso 5 la completa; si no, la crea.

## 4. Leer el plugin de origen entero

Lee todos los archivos de texto del plugin de origen, no solo el de la ruta. Los lockfiles y las imágenes cuentan por su nombre. Lee también los capítulos que ya existen en `atlas/src/content/docs/`.

Si la ruta es una unidad, junta además sus **apoyos pendientes**:

- las páginas temporales que `node .agents/skills/atlas/temporales.mjs listar` muestra con `dueño=<slug>`; lee su prosa;
- los archivos de este repo que la clasificación da a esta unidad (por ejemplo, lo que hay bajo `skills/<skill>/` además de `SKILL.md`). Cada uno se explica leyendo su versión del plugin de origen.

Hecho cuando puedes contestar, con la ruta y la línea en la mano, dos preguntas: qué unidades nombra o enlaza este archivo, y qué archivos del plugin de origen nombran o enlazan su unidad. Búscala por su nombre de archivo, su slug y su título. Si es una unidad, tienes además la lista completa de sus apoyos pendientes.

## 5. Escribir la página destino

La página explica el archivo tal como funciona en el plugin de origen, no la copia de este repo.

### Frontmatter

```yaml
---
title: Laziness Protocol
description: "<la description del frontmatter de origen, literal>"
grupo: skills
orden: 10
fuente: skills/principle-laziness-protocol/SKILL.md
habla-con:
  - poteto-mode
---
```

- `title`: el nombre de la unidad en inglés, el del encabezado `#` del archivo si lo tiene.
- `description`: la `description` del frontmatter de origen, literal y entre comillas. Si el archivo no tiene, una frase en español.
- `grupo`: el de la clasificación. Debe coincidir con la carpeta del capítulo; si no coincide, no escribas el archivo.
- `orden`: múltiplo de 10 que ubica la unidad en el orden de dependencias de su grupo: después de las unidades del grupo que usa, antes de las que la usan. Un capítulo que ya existe conserva su `orden` salvo que viole esa regla. Si el hueco no tiene un múltiplo de 10 libre, suma 10 al `orden` de los capítulos siguientes del grupo, y solo a ese campo.
- `fuente`: la ruta del paso 2.
- `habla-con`: los slugs de las dos respuestas del paso 4, tengan página o no. Un archivo de apoyo cuenta por el slug de su unidad dueña. Excluye el propio slug.

Una **página temporal** cambia tres campos: `title` es la ruta del archivo de apoyo; `orden` es el que tendrá el dueño en su grupo; `habla-con` lleva primero el slug del dueño. El build la reconoce porque su slug sale de su `fuente`, exige que nombre a su dueño y falla si el dueño ya tiene capítulo.

Un **apoyo plegado** en el capítulo de su dueño no toca `title`, `description`, `grupo`, `orden` ni `fuente`, que siguen siendo los del dueño. Solo suma a `habla-con` los slugs que trae el apoyo.

### Prosa

- En español: las explicaciones, los encabezados, las transiciones.
- En inglés: los nombres de skills, playbooks, agents, comandos, campos y archivos, en `código`, y toda cita del archivo, literal, entre comillas o en un bloque `>`. Una cita traducida deja de ser cita: cítala en inglés y explícala en español al lado.
- Cada afirmación sobre el sistema tiene una línea en el plugin de origen que la sostiene. Un ejemplo que el plugin de origen no trae se queda fuera.
- Un nombre de unidad con capítulo enlaza con la base del sitio: `[Build the Lever](/pstack/skills/principle-build-the-lever/)`. Un nombre sin capítulo va en `código`, sin enlace.
- La página de `plugin` explica también `LICENSE`, `.gitignore` y `assets/logo.png`. Ninguno de los tres tiene página propia.

- Un apoyo se explica donde encaja en la prosa del dueño, sin un encabezado obligatorio.
- El capítulo de una unidad explica cada apoyo pendiente del paso 4: la prosa de sus páginas temporales pasa aquí, corregida con estas reglas, y cada apoyo que ya estaba en el repo gana su explicación en esta misma escritura.

Si la página destino ya existe, consérvale la prosa que cumple estas reglas y corrige solo lo que las rompe o lo que falta.

## 6. Absorber las páginas temporales

Solo si la ruta es una unidad y tenía páginas temporales:

```bash
node .agents/skills/atlas/temporales.mjs absorber <slug>
```

El script borra las páginas temporales del dueño y reescribe, en todos los capítulos y la portada, los enlaces que las apuntaban y sus slugs en `habla-con`, para que apunten al dueño. Se niega si el dueño aún no tiene capítulo: el paso 5 va antes. Hecho cuando `temporales.mjs listar` ya no muestra `dueño=<slug>`.

## 7. Enlazar a los vecinos

Solo si la ruta es una unidad. Primero, cada capítulo existente que aparece en las dos respuestas del paso 4 y no lista `<slug>` en su `habla-con` lo gana ahí. Después:

```bash
node .agents/skills/atlas/enlazar.mjs <slug>
```

El script recorre los capítulos que listan `<slug>` en `habla-con` y enlaza sus menciones `` `<slug>` ``, `` `/<slug>` `` y `**<slug>**`, fuera de citas `>` y bloques de código. Un capítulo que no lo nombra sale como `sin mención` y su prosa queda como estaba: la relación vive en `habla-con` y en la portada. Si una línea recién enlazada aclara que la unidad no tiene página («aún no replicado, se cita sin enlace»), borra solo esa aclaración. Hecho cuando el script terminó y revisaste cada línea que enlazó.

## 8. Reescribir el bloque Relaciones

```bash
node .agents/skills/atlas/relaciones.mjs
```

El script reescribe en la portada solo lo que va entre `<!-- relaciones:inicio -->` y `<!-- relaciones:fin -->`, a partir de los `habla-con` de todos los capítulos. Enlaza un slug solo si su capítulo existe; los demás van por nombre, en `código`. Hecho cuando `git diff atlas/src/content/docs/index.md` no toca nada fuera de esas marcas y la página destino aparece enlazada en el bloque.

## 9. Verificar

```bash
cd atlas && npm test
```

Hecho cuando sale en verde. Si falla, corrige la página y repite.

## 10. Entregar

Deja los cambios sin commitear en el árbol de trabajo: el usuario decide cuándo entran. No hagas commit ni push. Lista al usuario los archivos que escribiste, los que borraste y el `orden` que asignaste.
