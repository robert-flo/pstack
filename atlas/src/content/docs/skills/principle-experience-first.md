---
title: Experience First
description: "Apply when product, UX, or feature-scope tradeoffs come up. Choose user delight over implementation convenience; ship fewer polished features over more rough ones."
grupo: skills
orden: 80
fuente: skills/principle-experience-first/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - feature
  - prototype
  - principle-foundational-thinking
---

> **Regla de oro:** *Apply when product, UX, or feature-scope tradeoffs come up. Choose user delight over implementation convenience; ship fewer polished features over more rough ones.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 8 de 10).
* **Qué es:** Una regla de desempate: cuando la comodidad de implementación choca con la experiencia de quien usa el trabajo, gana la experiencia.
* **Para qué sirve:** Frena las decisiones que se toman porque son fáciles de programar y no porque sean mejores para quien las va a usar.
* **Cuándo se usa:** En cualquier disyuntiva de producto, de interfaz o de alcance de una funcionalidad. Aparece sobre todo en tareas de tipo `feature` y `prototype`.

---

### 2. El Patrón

* **Cada funcionalidad, control y opción debe justificarse.** Lo que no se justifica, no entra.
* **Entrega menos, entrega mejor.** Una experiencia pulida con tres funciones vence a una tosca con diez.
* **Prototipa antes de comprometerte.** Las decisiones de diseño son mucho más baratas en un HTML desechable que en código de producción.
* **Cuida los detalles:** transiciones, alineación, espaciado, retroalimentación y estados de error.
* **Aprieta el bucle central.** Cada función sirve al flujo principal o se quita de en medio.

---

### 3. Quién es el "usuario"

El usuario es quien consume el trabajo, no solo quien ve una pantalla:

* En una interfaz, es el usuario final.
* En una biblioteca o una API interna, es el colega que la importa.
* En cualquier código, la persona que lo mantenga después también es usuario.

La experiencia de los tres pesa igual, y el impacto se explica desde su punto de vista, no desde el del implementador.

---

### 4. Relación con otros archivos

* **[Foundational Thinking](/pstack/skills/principle-foundational-thinking/)**: es su pareja. Las bases deben servir a la experiencia: ese principio gobierna la **secuencia** del trabajo, este gobierna el **objetivo**.
* **[Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/)**: es cómo se cumple "entrega menos, entrega mejor". Quitar opciones es la vía más directa a una experiencia pulida.
* **[Minimize Reader Load](/pstack/skills/principle-minimize-reader-load/)**: es este mismo principio aplicado al colega que mantiene el código. Menos carga para el lector es mejor experiencia para un usuario real.

---

### 5. Ejemplo breve

Un formulario de alta necesita elegir país.

* **Cómodo de implementar:** un campo de texto libre. Cero trabajo, y después hay que limpiar "SV", "El Salvador", "el salvador" y "Salvador" en la base.
* **Mejor experiencia:** un selector con búsqueda, el país probable preseleccionado por la IP y un estado de error que diga qué falta. Cuesta una tarde y ahorra el error a cada persona que llena el formulario, y la limpieza a quien mantiene los datos.

---

### 6. Redirección Rápida en Chat
Si la IA elige el camino cómodo de implementar:
> `/poteto-mode aplica 'principle-experience-first'. Decide desde la experiencia de quien lo usa, no desde lo que es fácil de programar, y justifica cada opción que propongas.`
