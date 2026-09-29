# pstack — réplica de estudio

Este repositorio es una **réplica de aprendizaje**, archivo por archivo, del plugin [pstack](https://github.com/cursor/plugins/tree/main/pstack) de Cursor, escrito originalmente por [poteto](https://x.com/poteto).

No es un fork ni una mejora del original. El objetivo es entender pstack construyéndolo: copiar cada archivo tal cual, y al lado escribir en español qué hace, para qué sirve y cómo se conecta con el resto. La copia enseña la forma; la documentación enseña el porqué.

El README original de pstack se conserva sin modificar en [`UPSTREAM-README.md`](./UPSTREAM-README.md).

## Cómo funciona la réplica

Una rutina diaria automatizada replica **dos archivos por día**, ni uno más, aunque vaya adelantada. Cada día:

1. Lee [`CHECKLIST.md`](./CHECKLIST.md) y toma los dos primeros archivos sin marcar.
2. Copia cada archivo desde el original, idéntico byte a byte. Nada se reescribe, resume ni "mejora", ni siquiera los enlaces que todavía apuntan a archivos no replicados.
3. Escribe la documentación en español en `atlas/src/content/docs/`, en la subcarpeta que corresponda.
4. Verifica que la copia sea idéntica comparando el hash del blob de Git contra el original.
5. Marca el checklist, cierra la tarea en el tablero y publica un reporte en [`reports/`](./reports/).

## Orden de replicación

El checklist va **de las hojas hacia el centro**, en nueve fases: primero la caja del repositorio, luego los 23 principios, las skills utilitarias, las skills que se referencian entre sí, el motor de scripting, los 23 playbooks, el centro (`poteto-mode`), el envoltorio de automatizaciones y por último la guía de uso. Así cada archivo llega cuando sus dependencias ya existen.

El estado real siempre vive en [`CHECKLIST.md`](./CHECKLIST.md), no en este README.

## Qué hay en cada carpeta

| Ruta | Qué contiene |
|---|---|
| `skills/` | Copia exacta de las skills del original, una carpeta por skill. |
| `agents/` | Subagentes que consumen las skills. |
| `automations/` | El paquete de automatización `benny`. |
| `docs/guide/` | La guía de uso original. |
| `atlas/` | Sitio Astro con la documentación en español. |
| `reports/` | Un reporte por día de replicación. |
| `CHECKLIST.md` | Los 158 archivos y su estado. |
| `UPSTREAM-README.md` | README original de pstack, sin tocar. |

## Documentación publicada

La documentación en español se publica en **https://robert-flo.github.io/pstack/**, con una página por archivo replicado. Por ejemplo, los principios core viven en `/skills/principles-core/`.

El sitio se construye y despliega solo: cada push a `main` dispara el workflow [`deploy-atlas.yml`](./.github/workflows/deploy-atlas.yml), que instala dependencias, corre los tests de contrato, compila el sitio y lo publica en GitHub Pages. Un pull request corre el mismo build sin desplegar.

### Correr el sitio localmente

```bash
cd atlas
npm ci
npm run dev
```

## Nota sobre este archivo

`README.md` es el único archivo que se apartó a propósito de la copia exacta: explica la réplica en lugar de presentar el plugin. Cualquier comparación con el original debe hacerse contra `UPSTREAM-README.md`.

## Créditos y licencia

pstack es obra de [poteto](https://x.com/poteto) y se distribuye en [cursor/plugins](https://github.com/cursor/plugins) bajo licencia MIT. Esta réplica conserva la misma licencia ([`LICENSE`](./LICENSE)) y no reclama autoría sobre el material original.
