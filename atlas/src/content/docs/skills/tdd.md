---
title: TDD
description: "Use only when the user explicitly asks for TDD, a failing test, or a regression test, OR when the bug has an obvious cheap local test target. Skip when the test path is unclear, expensive, integration-heavy, or not requested."
grupo: skills
orden: 260
familia: Utilitarias independientes (fase 2)
fuente: skills/tdd/SKILL.md
habla-con:
  - prove-it-works
  - test-behavior-not-implementation
---

> **Regla de oro:** *Make the broken behavior executable before changing production code.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** Un flujo de trabajo de corrección de bugs con test primero: antes de tocar código de producción, convertir el comportamiento roto en un test de regresión enfocado que falla antes del arreglo y pasa después. No es TDD dogmático: la condición de entrada es explícita y el objetivo es un test de regresión, no cobertura.
* **Para qué sirve:** Anclar el bug con evidencia ejecutable. El resultado final reporta la evidencia, no solo el desenlace: el test que falló antes y la falla que produjo, la corrida que pasa después, y si no se pudo demostrar la evidencia de falla previa, por qué y qué verificación de regresión más cercana se usó.
* **Cuándo se usa:** Solo cuando el usuario pide explícitamente TDD, un test que falla o un test de regresión, o cuando el bug tiene un objetivo de test local barato y obvio. Se salta cuando la vía de test es poco clara, cara, pesada en integración o no fue pedida (lleva `disable-model-invocation: true`, así que se pide explícitamente).

---

### 2. El flujo de trabajo

1. **Entender el bug:** comportamiento esperado, actual, la ruta afectada y la reproducción observable más pequeña.
2. **Elegir el chequeo ejecutable más angosto:** preferir el test unitario, de componente, de integración o de regresión más cercano que ya usa ese código. Si no hay vía de test práctica, no se crea una desde cero solo para cumplir el flujo.
3. **Escribir primero el test que falla:** el más pequeño y enfocado que habría atrapado el bug; codifica el comportamiento esperado, no espeja la implementación actual.
4. **Correrlo antes de arreglar:** confirmar que falla por la razón correcta; si pasa o falla por algo ajeno, corregir el test o la reproducción antes de tocar la implementación.
5. **Arreglar el bug:** el cambio de producción más pequeño que satisface el comportamiento esperado conservando los contratos cercanos.
6. **Correr de nuevo el test de regresión:** confirmar que ahora pasa.

**Si el test que falla es poco práctico:** usar el chequeo de regresión ejecutable más cercano (script dirigido, comando manual de reproducción, automatización de navegador, comparación de snapshots, aserción de logs, chequeo de integración enfocado). Preferir ningún test nuevo sobre un test malo: uno malo prueba principalmente mocks, codifica la implementación actual, depende de timing o estado global ajeno, necesita infraestructura cara para un fix chico, o se borraría justo después de probar el fix.

**Guardarraíles:** no cambiar tests para que casen con una implementación equivocada; no debilitar aserciones existentes salvo que el comportamiento esperado haya cambiado de verdad y la razón sea clara; mantener el test enfocado en el bug; si el bug es flaky, hacer el test determinístico y documentar la señal que se fija; si el bug expone una clase más amplia de fallas, primero aterrizar la vía de regresión enfocada y luego considerar cobertura hermana.

---

### 3. Relación con otros archivos

* **[Prove It Works](/pstack/skills/principle-prove-it-works/)**: el principio del que sale la exigencia de evidencia; TDD es su forma operativa en corrección de bugs.
* **[Test Behavior, Not Implementation](/pstack/skills/principle-test-behavior-not-implementation/)**: por eso el test que falla codifica comportamiento esperado y no espeja la implementación actual.

---

### 4. Ejemplo breve

Un bug hace que un rename de columna no falle el build. Antes de tocar el migrador, se escribe el test pequeño que corre el migrador contra el schema con la columna renombrada y espera el error: falla (el migrador la ignora), se corrige el migrador, y el mismo test pasa. El reporte final nombra ambos corridas y el motivo de cada resultado.
