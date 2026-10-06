---
name: atlas
description: Escribe o completa el capítulo del atlas para un archivo del plugin de origen y reescribe el bloque Relaciones de la portada.
disable-model-invocation: true
---

# Atlas

Se invoca con la ruta de **un solo archivo**, relativa a la raíz del plugin: `/atlas skills/principle-laziness-protocol/SKILL.md`. Opcionalmente, `--origen <dir>` fija la raíz del plugin de origen.

El vocabulario (unidad, unidad dueña, archivo de apoyo, capítulo, portada, bloque Relaciones, grupo) es el de `CONTEXT.md`. Léelo antes del paso 1.

## 1. Resolver el plugin de origen

Con `--origen`, esa carpeta es el plugin de origen. Sin él, es el checkout más reciente de la caché de Cursor:

```bash
ls -dt ~/.cursor/plugins/cache/cursor-public/pstack/*/ | head -1
```

Hecho cuando la carpeta contiene `.cursor-plugin/plugin.json`. Si no lo contiene, o el glob no devuelve nada, detente y pide `--origen`.

## 2. Validar la ruta

La ruta pasa si es exactamente una y nombra un archivo regular dentro del plugin de origen. Un directorio se rechaza, aunque contenga un solo archivo: detente y pide la ruta de un archivo. Una ruta que no existe en el plugin de origen también se rechaza.

## 3. Clasificar

Clasifica la ruta con [`clasificacion.md`](clasificacion.md). El resultado es una unidad, con su grupo y su slug, o un archivo de apoyo, con su unidad dueña.

Si es un archivo de apoyo, detente: dile al usuario cuál es su unidad dueña y que la página de esa unidad lo explica.

Si es una unidad, el capítulo es `atlas/src/content/docs/<grupo>/<slug>.md`. Si ese archivo ya existe, el paso 5 lo completa; si no, lo crea.

## 4. Leer el plugin de origen entero

Lee todos los archivos de texto del plugin de origen, no solo el de la unidad. Los lockfiles y las imágenes cuentan por su nombre. Lee también los capítulos que ya existen en `atlas/src/content/docs/`.

Hecho cuando puedes contestar, con la ruta y la línea en la mano, dos preguntas: qué unidades nombra o enlaza este archivo, y qué archivos del plugin de origen nombran o enlazan esta unidad. Búscala por su nombre de archivo, su slug y su título.

## 5. Escribir el capítulo

El capítulo explica el archivo tal como funciona en el plugin de origen, no la copia de este repo.

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

### Prosa

- En español: las explicaciones, los encabezados, las transiciones.
- En inglés: los nombres de skills, playbooks, agents, comandos, campos y archivos, en `código`, y toda cita del archivo, literal, entre comillas o en un bloque `>`. Una cita traducida deja de ser cita: cítala en inglés y explícala en español al lado.
- Cada afirmación sobre el sistema tiene una línea en el plugin de origen que la sostiene. Un ejemplo que el plugin de origen no trae se queda fuera.
- Un nombre de unidad con capítulo enlaza con la base del sitio: `[Build the Lever](/pstack/skills/principle-build-the-lever/)`. Un nombre sin capítulo va en `código`, sin enlace.
- La página de `plugin` explica también `LICENSE`, `.gitignore` y `assets/logo.png`. Ninguno de los tres tiene página propia.

Si el capítulo ya existe, consérvale la prosa que cumple estas reglas y corrige solo lo que las rompe o lo que falta.

## 6. Reescribir el bloque Relaciones

```bash
node .agents/skills/atlas/relaciones.mjs
```

El script reescribe en la portada solo lo que va entre `<!-- relaciones:inicio -->` y `<!-- relaciones:fin -->`, a partir de los `habla-con` de todos los capítulos. Hecho cuando `git diff atlas/src/content/docs/index.md` no toca nada fuera de esas marcas y el capítulo nuevo aparece enlazado en el bloque.

## 7. Verificar

```bash
cd atlas && npm test
```

Hecho cuando sale en verde. Si falla, corrige el capítulo y repite.

## 8. Entregar

Deja los cambios sin commitear en el árbol de trabajo: el usuario decide cuándo entran. No hagas commit ni push. Lista al usuario los archivos que escribiste y el `orden` que asignaste.
