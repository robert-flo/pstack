---
title: Sequence Verifiable Units
description: "Apply to multi-step work (sweeps, migrations, runs of similar edits) and to how you stack commits and PRs. Break work into small units that each end in a verifiable state, check each before the next, and order delivery so the sequence proves itself to a reviewer."
grupo: skills
orden: 190
fuente: skills/principle-sequence-verifiable-units/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-prove-it-works
  - principle-build-the-lever
---

> **Regla de oro:** *Apply to multi-step work (sweeps, migrations, runs of similar edits) and to how you stack commits and PRs. Break work into small units that each end in a verifiable state, check each before the next, and order delivery so the sequence proves itself to a reviewer.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The verification principles` (Principio 3 de 4 del bloque).
* **Qué es:** Un principio de verificación que ordena el trabajo como una secuencia de unidades pequeñas, cada una terminando en un estado que se puede comprobar, y no avanza hasta que la unidad actual está en verde.
* **Para qué sirve:** Un error atrapado en la unidad que lo causó es barato de localizar. El mismo error atrapado después de un lote queda enterrado, y ya se construyó más encima de una base rota. Además, secuenciar las unidades en una entrega que un revisor puede reproducir convierte el "confía en mí" en "míralo ponerse rojo y luego verde".
* **Cuándo se usa:** En trabajo de varios pasos: barridos, migraciones, series de ediciones similares, y al apilar commits y PRs.

---

### 2. El Patrón

* **Ejecución:** en un barrido, migración o cualquier serie de ediciones similares, verificar cada cambio antes de empezar el siguiente. Cada unidad es un paréntesis antes/después: estado bueno conocido, un cambio, correr la comprobación, y solo entonces avanzar. Hacer rebase sobre un trunk limpio primero, para que cada comprobación mida contra la base real.
* **Cuando una palanca hace las ediciones**, la comprobación por unidad es casi gratis. Correrla igual.
* **Entrega:** apilar commits y PRs en el orden que prueba el trabajo. La forma canónica es el test fallando primero, luego el arreglo encima. Otros órdenes de relato: una resta antes de la reestructuración, una captura de línea base antes del tratamiento, el andamio antes de la funcionalidad. Cada commit aterriza por sí solo y la secuencia se lee como un argumento.

---

### 3. Relación con otros archivos

* **[Prove It Works](/pstack/skills/principle-prove-it-works/)**: el complemento de secuenciación de este principio. Sequence Verifiable Units trocea el trabajo en unidades verificables; Prove It Works es la comprobación que mantiene cada chequeo real, contra el artefacto.
* **[Build the Lever](/pstack/skills/principle-build-the-lever/)**: hace que la comprobación por unidad sea barata, lo que permite verificar cada cambio sin pagar el costo completo cada vez.
* **[Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/)**: el original cita la resta antes de la reestructuración como uno de los órdenes de relato válidos al apilar una entrega.

---

### 4. Ejemplo breve

Un agente renombra una función que se usa en 40 archivos.

* **Sin el principio:** edita los 40 archivos en un solo commit gigante; el build se rompe y nadie sabe cuál de los 40 ediciones fue.
* **Con el principio:** divide en unidades (un módulo por unidad), y por cada una: estado bueno conocido, renombrar, correr el build y los tests, avanzar. Si el build se rompe, el error quedó atrapado en la unidad que lo causó.

---

### 5. Redirección Rápida en Chat
Si la IA apila ediciones en un lote grande y verifica solo al final:
> `/poteto-mode aplica 'principle-sequence-verifiable-units'. Trocea el trabajo en unidades que terminen en un estado verificable y comprueba cada una antes de avanzar; apila los commits en el orden que prueba el trabajo.`
