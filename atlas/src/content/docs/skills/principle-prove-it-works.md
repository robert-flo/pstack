---
title: Prove It Works
description: "Apply after completing a task, before declaring done. Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or 'it compiles.'"
grupo: skills
orden: 170
fuente: skills/principle-prove-it-works/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-fix-root-causes
  - show-me-your-work
---

> **Regla de oro:** *Apply after completing a task, before declaring done. Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or "it compiles."*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The verification principles` (Principio 1 de 4 del bloque).
* **Qué es:** Un principio de verificación: todo resultado de una tarea se comprueba contra el artefacto real (ejecutar la funcionalidad, leer el valor real, inspeccionar el diff), nunca contra un proxy, un autoreporte o un "compila".
* **Para qué sirve:** El trabajo sin verificar tiene una corrección desconocida. La verificación indirecta (fechas de archivo, frescura de la salida, autoreportes del agente, capturas en caché) se siente más barata que la observación directa, pero actuar sobre una inferencia equivocada cuesta mucho más que mirar la fuente una vez.
* **Cuándo se usa:** Al terminar una tarea, antes de declararla hecha.

---

### 2. El Patrón

* **Revisar la cosa real, no un proxy:**
  * Comprobar la vivencia del proceso directamente, no de forma indirecta a través de estado derivado.
  * Leer el valor real, no una representación en caché o derivada.
  * Cuando la verificación falla, sospechar primero del método de observación antes que del sistema.
* **Escribir un script de comprobación cuando se pueda.** La prueba más fuerte es un script determinista que vuelve a correr la misma comparación, no una mirada de una sola vez: se escribe el script, se corre y se guarda su salida como artefacto que un revisor puede volver a ejecutar en lugar de fiarse de tu palabra.
* **Dejar el artefacto visible para el humano.** Se comitea solo en trabajo grande o complejo donde el rastro tiene que poder auditarse después, como un port o una migración grande (la skill **show-me-your-work**, aún no replicada, se cita sin enlace).

---

### 3. Relación con otros archivos

* **[Fix Root Causes](/pstack/skills/principle-fix-root-causes/)**: es el principio que vive justo después de este. Prove It Works detecta que algo no funciona contra el artefacto real; Fix Root Causes manda no tapar ese hallazgo con un guard o un parche de síntoma, y arreglar la causa.
* **`principle-sequence-verifiable-units`** (aún no replicado, se cita sin enlace): manda trocear el trabajo en unidades que se puedan verificar una por una; este principio es la comprobación que corre sobre cada unidad.
* **`show-me-your-work`** (aún no replicado, se cita sin enlace): la skill que este principio menciona para commitear el artefacto de verificación cuando el trabajo es grande.

---

### 4. Ejemplo breve

Un agente migra un script y declara la tarea hecha porque el proceso arrancó sin errores y el archivo tiene fecha reciente.

* **Con el principio:** en lugar de fiarse de esos proxies, corre la funcionalidad y lee el valor que produce; descubre que el script arranca pero escribe en la ruta vieja. Escribe un script de comprobación que compara la salida con la esperada, lo corre, guarda la salida y ahora sí cierra la tarea.

---

### 5. Redirección Rápida en Chat
Si la IA declara una tarea hecha sin mostrar la comprobación:
> `/poteto-mode aplica 'principle-prove-it-works'. No declares done con proxies ni autoreportes: verifica contra el artefacto real y muestra la prueba.`
