---
title: Minimize Reader Load
description: "Apply when reviewing or shaping code that's hard to trace. Count layers between question and answer, and hidden state in the reader's head; collapse one-caller wrappers and shrink mutable scope."
grupo: skills
orden: 60
familia: The core principles
fuente: skills/principle-minimize-reader-load/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - interrogate
  - no-comments
  - principle-subtract-before-you-add
---

> **Regla de oro:** *Apply when reviewing or shaping code that's hard to trace. Count layers between question and answer, and hidden state in the reader's head; collapse one-caller wrappers and shrink mutable scope.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 6 de 10).
* **Qué es:** Una definición operativa de mantenibilidad: el trabajo que un lector debe hacer para entender el código.
* **Para qué sirve:** Reemplaza las métricas indirectas (líneas de código, complejidad ciclomática, "arquitectura limpia") por las dos que de verdad cuentan: capas que hay que rastrear y estado que hay que sostener en la cabeza.
* **Cuándo se usa:** Al revisar o dar forma a código difícil de seguir, y antes de añadir una capa o una pieza de estado nueva. Aparece en revisiones (`interrogate`), en limpieza de código y en cualquier refactorización de legibilidad.

---

### 2. Los dos ejes

1. **Capas que rastrear.** Cuántas indirecciones hay entre la pregunta y la respuesta.
2. **Estado que sostener.** Cuánto contexto oculto o mutable debe recordar el lector.

Los dos ejes son **independientes**: un archivo plano con 50 variables globales puede ser tan difícil de razonar como una pila de seis adaptadores. Hay que cuidar ambos. El código se lee muchísimo más de lo que se escribe.

---

### 3. El Patrón

* **Colapsa las capas** que cuestan más de lo que ahorran: envoltorios con un solo llamador, adaptadores sin una segunda implementación, indirección especulativa que nunca se necesitó. Se integran en línea.
* **Que cada capa cambie la abstracción.** Una capa que repite los mismos métodos y argumentos suma carga sin comprimir nada: es una capa de paso y se colapsa.
* **Exige compresión en la interfaz.** Una interfaz amplia que esconde poca complejidad obliga al lector a aprender la superficie *y* la implementación. Mejores son los límites que esconden decisiones significativas.
* **Reduce el alcance del estado:** funciones puras (devolver en vez de mutar) sobre campos, campos sobre estado de módulo, y estado de módulo sobre globales. Derivar en vez de sincronizar.
* **Nombra el invariante en el límite,** no en cada consumidor, para que el lector lo aprenda una sola vez.
* Antes de añadir una capa o una pieza de estado, pregunta: ¿esto reduce la carga del lector en otro lugar al menos en la misma medida?

**La prueba:** ¿puede un lector nuevo responder "¿de dónde viene X?" y "¿qué puede cambiar X?" en menos de 30 segundos? Si no, hay que cortar capas o cortar estado.

---

### 4. Relación con otros archivos

* **[Subtract Before You Add](./principle-subtract-before-you-add/)**: es su herramienta. Este principio dice qué medir; ese dice cuándo quitarlo.
* **[Foundational Thinking](./principle-foundational-thinking/)**: baja el eje del estado desde el inicio. Elegir bien los tipos y estructuras base evita el estado compartido que después hay que sostener al leer.
* **[Laziness Protocol](./principle-laziness-protocol/)**: coincide en el resultado. El cambio más pequeño suele ser también el que menos carga al lector.
* **`principle-guard-the-context-window`**: el archivo original lo enlaza como el análogo de este principio para la ventana de contexto de un agente (la memoria de trabajo también es finita para las máquinas). Todavía no está replicado en este repositorio, así que aquí se cita sin enlace.

---

### 5. Ejemplo breve

Un lector pregunta de dónde sale el `userId` en un handler.

* **Carga alta:** el handler llama a un servicio, que llama a un repositorio, que llama a un cliente, y ninguno de los tres cambia la abstracción; además el valor se escribe en un objeto de sesión mutable que tocan cuatro módulos. Responder la pregunta toma diez minutos.
* **Carga baja:** los tres pasos de paso se colapsan en uno y el `userId` llega como parámetro explícito. La respuesta está en dos saltos y nadie más lo puede cambiar.

---

### 6. Redirección Rápida en Chat
Si el código cuesta seguirlo:
> `/poteto-mode aplica 'principle-minimize-reader-load'. Cuenta las capas entre la pregunta y la respuesta y el estado mutable que debo sostener, y dime qué colapsar.`
