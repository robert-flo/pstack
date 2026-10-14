---
title: Encode Lessons in Structure
description: "Apply when you catch yourself writing the same instruction a second time, or notice a recurring correction. Encode the rule as a lint, metadata flag, runtime check, or script instead of more text."
grupo: skills
orden: 250
fuente: skills/principle-encode-lessons-in-structure/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-guard-the-context-window
  - principle-never-block-on-the-human
---

> **Regla de oro:** *Apply when you catch yourself writing the same instruction a second time, or notice a recurring correction. Encode the rule as a lint, metadata flag, runtime check, or script instead of more text.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The meta principles` (bloque meta, cierre de la fase de principios).
* **Qué es:** El principio meta del paquete: cada vez que una corrección se repite o una instrucción se escribe por segunda vez, la lección se codifica en la estructura del sistema (un lint, una bandera de metadata, un chequeo en runtime, un script) en lugar de agregar más texto.
* **Para qué sirve:** Convertir texto que se repite en mecanismo que se cumple solo. La instrucción repetida es el síntoma; la regla codificada impide el error sin depender de que alguien la vuelva a leer. Si la lección necesita juicio y no se puede codificar, entonces sí: hacerla más prominente y añadir un ejemplo del modo de falla.
* **Cuándo se usa:** Al detectar que se está escribiendo la misma instrucción por segunda vez, o al notar una corrección que vuelve a aparecer.

---

### 2. El Patrón

* **Detectar la repetición.** Una instrucción escrita dos veces o una corrección recurrente son la señal: el sistema pide una regla, no otra frase.
* **Codificar, no redactar.** La regla se convierte en lint, metadata, chequeo en runtime o script, según dónde quepa mejor.
* **Si no se puede codificar, elevarla.** Cuando la lección requiere juicio humano, la instrucción se hace más prominente y se acompaña de un ejemplo concreto del modo de falla.
* **Corolario:** si el fix es estructural, solo se usa el fix estructural. La instrucción es el síntoma, no la cura.

---

### 3. Relación con otros archivos

* **[Guard the Context Window](/pstack/skills/principle-guard-the-context-window/)**: comparten la economía de presupuesto: texto que se repite gasta contexto en cada lectura; una regla codificada se cumple sin ocupar espacio en el hilo.
* **[Never Block on the Human](/pstack/skills/principle-never-block-on-the-human/)**: la corrección recurrente del humano es exactamente la señal de este principio: en lugar de que el supervisor la repita en cada ronda, el sistema la absorbe y se auto-repara.
* **`08-principles`** y **`poteto-mode`** (aún no replicados): el índice de principios y el motor que los consume; este principio meta cierra el bloque.

---

### 4. Ejemplo breve

El revisor corrige por tercera vez que nadie debe enviar mensajes externos sin aprobación.

* **Sin el principio:** se vuelve a escribir la regla en el prompt, en el README y en el mensaje de la cuarta revisión; la quinta ocurre igual.
* **Con el principio:** la regla se codifica: el script que envía mensajes externos exige una variable de aprobación y falla sin ella, y el lint marca llamadas directas. La instrucción desaparece y la regla se cumple sola.

---

### 5. Redirección Rápida en Chat
Si la IA escribe la misma instrucción por segunda vez o corrige lo mismo otra vez:
> `/poteto-mode aplica 'principle-encode-lessons-in-structure'. Codifica la regla como lint, metadata, chequeo en runtime o script; si no se puede codificar, hazla más prominente y añade un ejemplo del modo de falla.`

