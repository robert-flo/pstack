---
title: Test Behavior, Not Implementation
description: "Apply when you write, change, or keep a test. Call the code the way its users do and assert the result they observe against a literal expected value. If the test would still pass when every imported function returns undefined, rewrite the assertion or delete the test."
grupo: skills
orden: 200
fuente: skills/principle-test-behavior-not-implementation/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-prove-it-works
  - principle-sequence-verifiable-units
---

> **Regla de oro:** *Apply when you write, change, or keep a test. Call the code the way its users do and assert the result they observe against a literal expected value. If the test would still pass when every imported function returns undefined, rewrite the assertion or delete the test.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The verification principles` (Principio 4 de 4 del bloque).
* **Qué es:** Un principio de verificación para tests: un test llama al código como lo llaman sus usuarios y afirma el resultado que observan contra un valor esperado literal. Un test que afirma qué llamadas hizo el código, o que reafirma una constante que el código contiene, no hace ninguna de las dos cosas.
* **Para qué sirve:** La comprobación: antes de conservar un test, preguntar si seguiría pasando si cada función que importa devolviera `undefined`. Si sí, no observa comportamiento y no puede fallar por un defecto. Un test que no puede fallar por un defecto cuesta tiempo de CI y atención de revisión, y no atrapa nada. Además, un pin de constante también falla cuando alguien edita la constante o el prompt que reafirma, así que impide esa edición.
* **Cuándo se usa:** Al escribir, cambiar o mantener un test.

---

### 2. El Patrón

**Cinco formas que siguen pasando cuando cada función importada devuelve `undefined`:**

* **Aserción débil o ausente.** Sin `expect`, o solo `toBeDefined`, `toBeTruthy`, `not.toThrow`, `toBeInstanceOf`, `toBeGreaterThan(0)`.
* **Solo mock o ausencia.** Solo `toHaveBeenCalled`, `not.toHaveBeenCalled`, `toBeUndefined`, `toEqual([])`, `toHaveLength(0)`, `not.toBe(wrongValue)`.
* **Autorreferencial.** El valor esperado viene del código bajo prueba: `expect(f(a)).toBe(f(a))`, `expect(parsed.url).toBe(buildUrl(...))`.
* **Pin de constante.** La aserción reafirma una constante mantenida a mano, un default de configuración, una fila de tabla o una cadena de prompt: `expect(LIMITS.maxTools).toBe(8)`, `expect(PROMPT).toContain("You are")`.
* **Fixture que afirma fixture.** La aserción lee datos que el propio test construyó o un valor calculado en `beforeEach`, y el sujeto nunca corre dentro del cuerpo.

**El arreglo:** llamar al sujeto dentro del cuerpo del test con una entrada concreta y afirmar la salida literal o el efecto observable, `expect(slugify("Hello, World!")).toBe("hello-world")`. Para una ausencia, afirmar la presencia en la otra entrada en el mismo test. Para una constante, probar el mecanismo que la lee con una entrada en lugar de reafirmar el valor. Para un mock, afirmar el payload que recibió o el estado después de la llamada, no que fue llamada. Cuando no existe tal aserción, borrar el test.

**Se conservan** un test de una relación entre filas de una tabla (una clave presente en dos tablas, un padre que existe) y una comprobación en tiempo de compilación en un archivo `*.test-d.ts`.

---

### 3. Relación con otros archivos

* **[Prove It Works](/pstack/skills/principle-prove-it-works/)**: es el principio que mantiene cada comprobación real contra el artefacto; Test Behavior, Not Implementation aplica esa misma exigencia al nivel del test individual: la aserción observa comportamiento, no una representación del código.
* **[Sequence Verifiable Units](/pstack/skills/principle-sequence-verifiable-units/)**: manda que cada unidad termine en un estado verificable; este principio define qué cuenta como una aserción verificable dentro de esa unidad.

---

### 4. Ejemplo breve

Un test cubre una función `slugify`.

* **Sin el principio:** `expect(slugify(input)).toBeDefined()` pasa aunque la función devuelva basura, o `expect(slugify("Hola Mundo")).toBe("hola-mundo")` donde `"hola-mundo"` se calcula llamando de nuevo a `slugify`: el test afirma el código contra sí mismo.
* **Con el principio:** una entrada concreta y una salida literal: `expect(slugify("Hello, World!")).toBe("hello-world")`. Si la función se rompe, el test se pone rojo por el defecto.

---

### 5. Redirección Rápida en Chat
Si la IA escribe un test con aserción débil o un pin de constante:
> `/poteto-mode aplica 'principle-test-behavior-not-implementation'. Llama al código como lo llaman sus usuarios y afirma contra un valor literal; si el test pasaría con todas las funciones importadas devolviendo undefined, reescríbelo o bórralo.`
