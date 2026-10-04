---
title: Type System Discipline
description: "Apply when designing types, reviewing a function signature, or writing code in any statically-typed language. Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, refuse to lie to the compiler, exhaust variants, derive from authoritative schemas."
grupo: skills
orden: 130
familia: The architecture principles
fuente: skills/principle-type-system-discipline/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-model-the-domain
  - principle-boundary-discipline
  - principle-make-operations-idempotent
---

> **Regla de oro:** *Apply when designing types, reviewing a function signature, or writing code in any statically-typed language. Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, refuse to lie to the compiler, exhaust variants, derive from authoritative schemas.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The architecture principles` (Bloque 3 de 6).
* **Qué es:** Un principio de arquitectura: el verificador de tipos es un asistente de pruebas. Se usa para eliminar estados imposibles, primitivas confundidas y variantes sin manejar en tiempo de compilación, no solo para anotar datos.
* **Para qué sirve:** Un caso que los tipos dejan pasar se convierte en un fallo de runtime que el compilador pudo haber detenido. Se prefiere definir errores y casos especiales fuera de existencia antes que multiplicar manejadores.
* **Cuándo se usa:** Al diseñar tipos, al revisar la firma de una función, o al escribir código en cualquier lenguaje con tipado estático.

---

### 2. El Patrón

* **Hacer los estados ilegales irrepresentables.** Modelar variantes como tipos suma (uniones discriminadas en TypeScript, enums con payloads en Rust/Swift/Kotlin, sealed classes en Scala, ADTs en Haskell/OCaml), no como una bolsa de campos opcionales donde las combinaciones contradictorias compilan. Antipatrón típico: `{ completed: boolean; completedAt?: Date }` admite `completed: true; completedAt: undefined`, que no significa nada. Se deriva el booleano de una sola fuente o se modelan las variantes explícitamente.
* **Los tipos son construcciones, no restricciones.** Se construye el tipo desde los valores que se quieren, en vez de recortarlo de un tipo más flojo con chequeos. Una lista no vacía es un head más un resto, no una lista con chequeo de longitud. Un rango de tiempo válido es un inicio más una duración, no dos timestamps que hay que mantener ordenados.
* **Marcar las primitivas semánticas.** `UserId` y `OrderId` son strings por debajo, pero no deben ser intercambiables: newtypes en Rust, branded intersections en TypeScript, etc. Se valida una vez al crear; después se confía en el tipo.
* **Los datos externos no tienen tipo hasta parsearse.** Payloads RPC, JSON, argumentos de CLI, variables de entorno, filas de base de datos: una función de parseo en cada frontera convierte la entrada no estructurada en el modelo tipado.
* **No mentirle al sistema de tipos.** Casts, coerciones inseguras y funciones de aserción que burlan al compilador son crashes latentes. Si el compilador no puede probar un hecho, se prueba (validando, estrechando, refinando el modelo) o se acepta que el cast es un riesgo.
* **El matching exhaustivo es trabajo del compilador.** Si se agrega una variante sin manejo, debe fallar la compilación, con el idioma que cada lenguaje provee.
* **Derivar los tipos de esquemas autoritativos.** Cuando un protobuf, OpenAPI, esquema GraphQL, migración o archivo de tokens define una forma, se deriva de él en lugar de escribir un tipo paralelo a mano.
* **Fortalecer un tipo solo donde aparece parcialidad.** Una aserción de runtime, un chequeo de null o un "esto nunca debería pasar" marca el lugar donde el tipo es demasiado débil: ese chequeo sube al tipo. Y ahí se para. La meta es que los tipos rastreen los casos que cada sitio de uso debe manejar, no describir los datos con la máxima precisión. Se prefieren funciones totales: `sum` de una lista vacía es 0, así que toma la lista corriente; `head` de una lista vacía no tiene respuesta, así que exige la lista no vacía.

**Las pruebas:** si se puede escribir un comentario que explica cuándo es válida una combinación de campos, el tipo es demasiado flojo; si dos argumentos comparten un tipo primitivo pero significan cosas distintas, se marcan; cada `any`, `as` o `assertNotNull` se rastrea hasta la frontera y se valida ahí; si una variante nueva no hace que el compilador señale dónde agregar el caso, el match no es exhaustivo; si un tipo duplica una forma que otro archivo posee, se deriva; y si se está fortaleciendo un tipo solo por precisión y nada podría entrar en pánico, se queda el tipo corriente.

---

### 3. Relación con otros archivos

* **[Model the Domain](./principle-model-the-domain/)**: el corazón de ese principio es "hacer los estados ilegales irrepresentables"; este es el manual de cómo se hace eso en un lenguaje con tipos. Las estructuras que ese pide se construyen con los patrones de este.
* **[Boundary Discipline](./principle-boundary-discipline/)**: este dice qué funciones de parseo deben existir (los datos externos no tienen tipo hasta parsearse); ese dice dónde viven (en las fronteras, y no en la lógica de negocio).
* **[Make Operations Idempotent](./principle-make-operations-idempotent/)**: se complementan en el mismo espíritu de eliminar casos dependientes del estado. Este elimina los estados imposibles con el compilador; ese elimina los finales distintos cuando una operación corre dos veces.
* **`typescript-best-practices`**: el original lo señala como la skill que aterriza este principio en sintaxis concreta. Todavía no está replicada, así que se cita sin enlace.
* **`principle-encode-lessons-in-structure`**: el original lo cita para derivar tipos de esquemas autoritativos. Todavía no está replicado, así que se cita sin enlace.

---

### 4. Ejemplo breve

Una función cobra un pedido y recibe dos strings: `userId` y `orderId`. Alguien los pasa invertidos; compila y cobra el pedido equivocado.

* **Con el principio:** existen dos tipos marcados (`UserId`, `OrderId`), válidados una vez al crearse. Pasarlos invertidos ya no compila: el compilador detuvo en tiempo de compilación lo que habría sido un cobro incorrecto en producción. Y `{ kind: 'done'; at: Date }` reemplaza a `completed: true; completedAt: undefined`: la combinación sin sentido ya no se puede construir.

---

### 5. Redirección Rápida en Chat
Si la IA está apilando chequeos de runtime para estados que el compilador podría detener:
> `/poteto-mode aplica 'principle-type-system-discipline'. Sube los chequeos al tipo: estados ilegales irrepresentables, primitivas marcadas y matching exhaustivo, y valida los datos externos en la frontera.`
