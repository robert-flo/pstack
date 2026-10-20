---
title: TypeScript Best Practices
description: "TypeScript best practices. Use when reading or editing any .ts or .tsx file."
grupo: skills
orden: 270
familia: Utilitarias independientes (fase 2)
fuente: skills/typescript-best-practices/SKILL.md
habla-con:
  - type-system-discipline
  - boundary-discipline
---

> **Regla de oro:** *Apply the **type-system-discipline** principle skill first.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** Un catálogo de reglas de TypeScript condensado en una tabla: modelado (uniones discriminadas, tipos con marca, modelado constructivo), tipado defensivo (`unknown` sobre `any`, schemas antes de guards, nada de `as` sin validación), estrechamiento y exhaustividad, validación en fronteras, tipos derivados de schemas, argumentos por objeto, tests reales y telemetría estructurada.
* **Para qué sirve:** Que el compilador sea el que impide los estados imposibles: modelar la forma para que el valor ilegal no se pueda construir (`[T, ...T[]]` para no vacíos, `[T, T][]` para longitudes pares, `start` más `duration` para un rango), y validar una sola vez en la frontera.
* **Cuándo se usa:** Al leer o editar cualquier archivo `.ts` o `.tsx` (declara `paths: ["**/*.ts", "**/*.tsx"]` en su frontmatter). Lleva `disable-model-invocation: true`, así que se pide explícitamente.

---

### 2. Las reglas, agrupadas

* **Modelado:** uniones discriminadas con un literal `kind` para que los estados imposibles no se puedan representar (nada de bolsas de campos opcionales); tipos con marca (`& { readonly __brand: "X" }`) con validación única en la frontera, y la marca sale de un type guard verificador (`input is AgentId`), nunca de `as`; el tipo total más simple: mantener `T[]` mientras toda operación siga siendo total, y estrechar a `NonEmpty<T>` solo donde el tipo suelto fuerza `!`, un cast o un throw de "no debería pasar".
* **Tipado defensivo:** datos externos son `unknown`; antes de escribir a mano un type guard propiedad por propiedad, usar la librería de schemas del repo e inferir el tipo (`z.infer`); cada `as` es un crash de runtime esperando, castear solo tras validar; jerarquía de estrechamiento: switch por discriminante > operador `in` > `typeof`/`instanceof` > type guard propio > `as`; los type guards deben verificar lo que dicen (un guard mentiroso es peor que `as` porque el bug se esconde detrás de un nombre que dice que es seguro) y se llaman `isX` o `hasX`; exhaustividad con `const _exhaustive: never = x;` en las ramas default; `satisfies` sobre `as` para validar sin ensanchar tipos literales.
* **Fronteras y derivación:** parsear donde los datos cruzan hacia adentro, a un tipo de dominio con nombre, y a partir de ahí confiar en los tipos (ver el principio de disciplina de fronteras); antes de declarar una interfaz nueva, buscar `Pick`/`Omit`/`Parameters`/`ReturnType`/`Awaited`/`typeof`.
* **Ergonomía y verificación:** argumentos por objeto, no posicionales, salvo en rutas calientes (render por frame, tokenizers, parsers); no mockear lo que se puede correr: primitives reales del framework con chequeos de leak/disposables y verificar la UI en un build corriendo; telemetría estructurada con contexto suficiente para depurar desde un id, sin `console.log` en código que se envía.

Los ejemplos completos viven en `references/patterns.md` (ver Archivos de apoyo).

---

### 3. Relación con otros archivos

* **[Type System Discipline](/pstack/skills/principle-type-system-discipline/)**: el principio que esta skill manda aplicar primero; la tabla es su instanciación concreta en TypeScript.
* **[Boundary Discipline](/pstack/skills/principle-boundary-discipline/)**: la regla de validación en fronteras (`Record<string, unknown>` se detiene en el parse) remite a ese principio.

---

### 4. Ejemplo breve

En lugar de `interface Agent { id?: string; kind?: string }`, una unión discriminada (`{ kind: "human", name: string } | { kind: "bot", model: string }`) hace que el estado sin `kind` no compile; el id llega como `unknown` de la API, se valida con un schema en la frontera y de ahí en adelante el tipo `AgentId` con marca viaja verificado.

---

### 5. Archivos de apoyo

* **`references/patterns.md`** (replicado y verificado): los ejemplos de código de cada regla de la tabla, un bloque por patrón. Cubre los tipos con marca (`AgentId = string & { readonly __brand: "AgentId" }` con guard verificador), las uniones discriminadas con su discriminante literal (`kind`, `type` o `tag`, uno solo y para siempre), el modelado constructivo (`NonEmpty<T>` por tupla variádica, `Pairs<T>`, `TimeRange` como `start` + `durationMs`, con la nota de no marcar por reflejo), el tipo total más simple con sus señales (`!`, `arr[0] as T`, el throw de "no debería pasar"), `unknown` sobre `any` con la lista completa de fuentes externas (payloads RPC, `JSON.parse`, `postMessage`, IPC, archivos, variables de entorno, resultados de base de datos), schemas antes de guards a mano (`z.infer`, `safeParse` cuando la falla es una rama esperada, sin dependencia nueva para un solo guard), la eliminación de `as` con sus cuatro causas al refactorizar (discriminante faltante, tipo fuente demasiado ancho, frontera sin tipar, genuinamente inexpresable), la jerarquía de estrechamiento del switch al cast, los type guards que verifican lo que dicen, la exhaustividad en estilo return y void, `satisfies` sobre `as`, la validación en fronteras (wire formats con `ignoreUnknownFields`, JSON persistido versionado con try/catch, sin revalidar adentro), los tipos derivados de schemas (`Pick`/`Omit` antes de interfaces nuevas) y los argumentos por objeto con su excepción en rutas calientes.
