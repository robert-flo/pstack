---
title: Model the Domain
description: "Apply when writing stateful logic, or when code branches a lot or repeats a shape assumption across files. Encode the domain in a structure instead of scattered conditionals."
grupo: skills
orden: 110
fuente: skills/principle-model-the-domain/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-foundational-thinking
  - principle-boundary-discipline
---

> **Regla de oro:** *Apply when writing stateful logic, or when code branches a lot or repeats a shape assumption across files. Encode the domain in a structure instead of scattered conditionals.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The architecture principles` (Bloque 1 de 6).
* **Qué es:** Un principio de arquitectura: el conocimiento del dominio se codifica en una estructura de datos, en lugar de quedar repartido en condicionales por todos lados.
* **Para qué sirve:** Los booleanos dispersos, los supuestos de forma repetidos y las ramas repartidas entre archivos son complejidad accidental. Una estructura que refleja el dominio hace que los estados inválidos sean irrepresentables y borra ramas. Elegirla al escribir es barato; recuperarla después se lee como un refactor y se posterga.
* **Cuándo se usa:** Al escribir lógica con estado, o cuando el código se ramifica mucho o repite un supuesto de forma entre varios archivos.

---

### 2. El Patrón

* **Estructuras que vale la pena considerar:** una máquina de estados en lugar de booleanos, fases o verificaciones de ciclo de vida dispersos; un objeto o modelo tipado en lugar de parámetros sueltos o supuestos de forma repetidos; un mapa, registro, tabla de consulta o unión discriminada en lugar de ramas repartidas entre archivos; un reducer o modelo de comandos y eventos en lugar de mutaciones de estado ad hoc; un módulo organizado alrededor de un cuerpo de conocimiento del dominio en lugar de una secuencia (cargar, validar, transformar, guardar: el orden de ejecución no es la propiedad del código); un límite de módulo pequeño que reúne comportamiento, propiedad o invariantes repetidos; una cola, caché, índice, grafo/árbol o colección normalizada cuando el patrón de acceso a datos lo pide.
* **Cualquier otra estructura que encaje.** Cuando ninguna encaja, se trabaja qué debe permitir el código jamás y cómo se leen los datos, y se encuentra la estructura que codifica exactamente eso.
* **No forzar la abstracción.** Si la forma actual ya es clara, local y poco probable de crecer, se prefiere el código aburrido. Se es escéptico ante una abstracción que agrega indirección sin quitar ramas, reglas duplicadas, estados inválidos ni riesgo de ciclo de vida.

**La señal de que se omitió:** una funcionalidad nueva que agrega una rama más a una cadena de if/else existente, o un segundo booleano que debe permanecer sincronizado con el primero. La descomposición temporal es otra señal: los módulos con nombre de fase repiten las mismas reglas del dominio en cada paso.

---

### 3. Relación con otros archivos

* **[Foundational Thinking](/pstack/skills/principle-foundational-thinking/)**: es la misma decisión tomada antes de escribir lógica. Ese manda elegir bien los tipos y estructuras centrales al empezar; este es el principio que los mantiene al día cuando el dominio cambia o crece.
* **[Boundary Discipline](/pstack/skills/principle-boundary-discipline/)**: se reparten el trabajo de arquitectura. Este decide dónde vive el estado (las estructuras); ese decide dónde viven la validación y los errores (las fronteras). La frontera convierte datos crudos en los tipos que este principio define.
* **[Subtract Before You Add](/pstack/skills/principle-subtract-before-you-add/)**: cuando una estructura nueva reemplaza condicionales dispersos, ese principio manda borrar primero las ramas y validaciones viejas, para no sumar la estructura sobre el desorden.
* **`principle-encode-lessons-in-structure`**: el nombre se parece y el alcance no. Ese (aún no replicado, se cita sin enlace) convierte una instrucción que se repite en un lint, check o script; este trata del conocimiento del dominio del código, no de lecciones de proceso.

---

### 4. Ejemplo breve

Un pedido se modela con tres booleanos: `esPagado`, `esEnviado`, `esCancelado`. Nada impide `esPagado` y `esCancelado` a la vez, y cada regla nueva agrega un `if` que combina los tres.

* **Con el principio:** el pedido se vuelve una máquina de estados (`nuevo`, `pagado`, `enviado`, `cancelado`). Pasar de `cancelado` a `enviado` no compila, así que la regla vive en una sola estructura en lugar de repetirse en cada validación. La próxima funcionalidad agrega un estado, no otra rama en tres archivos.

---

### 5. Redirección Rápida en Chat
Si la IA empieza a apilar condicionales o booleanos que deben mantenerse sincronizados:
> `/poteto-mode aplica 'principle-model-the-domain'. No esparzas condicionales: encuentra la estructura que codifica el dominio y haz que los estados inválidos no se puedan representar.`
