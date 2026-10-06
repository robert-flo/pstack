---
title: Attack the Premise
description: "Apply when two or more fixes that share one premise have failed the same gate. Take a census of which actors hold the imbalance before the next fix, then question the premise instead of writing another fix that assumes it."
grupo: skills
orden: 40
fuente: skills/principle-attack-the-premise/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - bug-fix
  - investigation
  - principle-redesign-from-first-principles
---

> **Regla de oro:** *Apply when two or more fixes that share one premise have failed the same gate. Take a census of which actors hold the imbalance before the next fix, then question the premise instead of writing another fix that assumes it.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 4 de 10).
* **Qué es:** Un principio de diagnóstico: cuando dos o más arreglos que comparten una misma premisa fallan en la misma verificación, el sospechoso es la premisa, no los arreglos.
* **Para qué sirve:** Corta la serie de parches que asumen lo mismo. Cada fallo bajo una premisa compartida es evidencia sobre esa premisa.
* **Cuándo se usa:** A partir del segundo arreglo que falla el mismo *gate* por la misma razón. Aparece sobre todo en tareas de tipo `bug-fix`, `investigation` y `perf-issue`.

---

### 2. El Patrón en 4 Pasos

1. **Escribe la premisa:** Una sola frase, la que todos los arreglos fallidos asumieron como cierta.
2. **Haz un censo antes del siguiente arreglo:** Cuenta el desbalance por actor. El censo dice **qué** actores cargan el desbalance, no cuán grande es. Se escribe como un script re-ejecutable.
3. **Lee el sesgo:** Si los mismos pocos actores cargan el desbalance en cada corrida, algo les asigna ese rol. Encuentra qué lo asigna: esa asignación es el siguiente "por qué".
4. **Elimina la asimetría, no la compenses:** Rota el rol entre actores, aleatoriza la asignación o muévela, para que ningún actor lo cargue siempre. Un camino de retorno, un pool compartido, una entrega por lotes o un rebalanceo periódico dejan la asignación intacta y añaden trabajo en cada corrida.

**Frenos explícitos:**
* No empieces el siguiente arreglo antes de tener la premisa escrita y el censo hecho.
* Si el censo sale parejo entre actores, la premisa no es la causa: busca en otro lado y conserva el censo como evidencia.

---

### 3. Relación con otros archivos

* **[Redesign From First Principles](/pstack/skills/principle-redesign-from-first-principles/)**: es su contraparte. Ese rediseña un diseño alrededor de un requisito nuevo; este cuestiona un hecho que el diseño actual asume.
* **[Laziness Protocol](/pstack/skills/principle-laziness-protocol/)**: sostiene el paso 4. Quitar la asimetría es más barato que mantener el mecanismo que la compensa.
* **`principle-build-the-lever`** y **`principle-fix-root-causes`**: el archivo original enlaza a ambos (el censo como script re-ejecutable y la búsqueda del siguiente "por qué"). Todavía no están replicados en este repositorio, así que aquí se citan sin enlace.

---

### 4. Ejemplo breve

Una cola de trabajos se atrasa. Se suben los *workers*, luego se añaden reintentos: los dos arreglos fallan el mismo *gate* de latencia.

* **Premisa compartida:** "el trabajo está repartido de forma pareja entre los workers".
* **Censo:** un script cuenta trabajos pendientes por worker y muestra que tres de veinte concentran el 80%.
* **Causa:** el *hash* de particionado los elige siempre para las claves más frecuentes.
* **Arreglo correcto:** cambiar la asignación (rotarla o aleatorizarla), no añadir más reintentos ni más workers.

---

### 5. Redirección Rápida en Chat
Si la IA propone un tercer arreglo con la misma suposición:
> `/poteto-mode aplica 'principle-attack-the-premise'. Antes del siguiente arreglo: escribe la premisa compartida y hazme el censo por actor.`
