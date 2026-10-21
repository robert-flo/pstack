---
title: Blast Radius
description: "Find what a change could break somewhere else before it ships, beyond the diff, and prove the one fact it's safe because of by running real code instead of writing it up. Use for 'blast radius of X', 'what could this break', or reviewing a small diff you don't trust."
grupo: skills
orden: 300
familia: Utilitarias independientes (fase 2)
fuente: skills/blast-radius/SKILL.md
habla-con:
  - how
  - why
  - unslop
---

> **Regla de oro:** *A blast-radius writeup that sounds right is worthless. Find the one fact it's safe because of and prove it by running code.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** La skill de análisis de impacto que va más allá del diff: encontrar lo que un cambio puede romper en otra parte antes de que salga, y probar por ejecución real el único hecho del que depende su seguridad, en lugar de escribirlo convincente.
* **Para qué sirve:** Cerrar la trampa del writeup que "suena bien": un análisis de blast radius lee convincente sea o no verdad, así que no se entrega el escrito; se encuentra el hecho central ("esta llamada solo elimina entradas de caché ya muertas y no hace nada más") y se prueba corriendo el código real. Listar los callers no es el trabajo: el grep los encuentra en un segundo; el trabajo es el breakage que el grep no muestra.
* **Cuándo se usa:** Se pide explícitamente ("blast radius of X", "what could this break") o al revisar un diff pequeño que todavía no inspira confianza (lleva `disable-model-invocation: true`).

---

### 2. Qué pide exactamente

* **Escala de certeza por hecho:** cada hecho del que depende la seguridad del cambio se lleva lo más abajo posible en la lista de cinco, y se dice dónde se detuvo: (1) lo dijiste tú, sin valor por sí solo; (2) señalaste la línea, un `file:line` real o la fuente de la librería; (3) mostraste que el caso malo no puede pasar, recorriendo la falla paso a paso; (4) lo corriste, un script o test que llama al código real y falla ruidoso si estás equivocado; (5) lo reproduciste en la app corriendo. El paso 4 suele ser un script chico que importa la misma librería que la app embarca y llama la función exacta que preocupa.
* **Seis pasos:** leer el cambio (el diff, los símbolos que agrega, cambia y elimina, y lo que ahora hace diferente, incluida la parte que el diff no dice; usar el paso 2 de `why` para jalar el PR y los commits); encontrar el único hecho por el que es seguro; mirar donde el grep se detiene (la fuente de la librería que se llama, su versión fijada y parches locales; cuándo corren las cosas: microtasks, unmount y teardown, Solid versus React; lo que la búsqueda de símbolos no ve: el JSON que devuelve una API, una columna de DB, un wire format, otro lenguaje leyendo los mismos bytes, un feature flag, código tres saltos abajo); ser honesto con cada riesgo (probabilidad real y costo real; los confirmados se quedan, los chequeados y despejados se listan aparte, con las mismas reglas de `why`: citar un `file:line` real, una búsqueda que no encuentra nada también es respuesta, y nunca inventar un caller ni una API); probar el hecho único con un script o test real y pegar lo que pasó; y para cambios grandes o anchos, correrlo como `arena` preguntando a más de un modelo lo mismo y fusionando las respuestas.
* **Qué entrega:** qué hace el cambio (incluida la parte no obvia); el hecho único por el que es seguro, con el paso alcanzado y la prueba, o marcado `unproven` si no se pudo; los riesgos (cómo rompe, `file:line`, qué tan probable y qué tan grave, cómo chequearlo, con la prueba pegada para los que importan); lo despejado y por qué está bien; y el test o repro más barato que caza el bug real antes del merge, incluido el script escrito. Se escribe a través de `unslop`, se cita código real y se limpia todo lo privado antes de que salga a algún lado público.

---

### 3. Relación con otros archivos

* **[How](/pstack/skills/how/)** y **[Why](/pstack/skills/why/)**: la tríada. `how` dice qué hace el código, `why` dice por qué está formado así, y blast radius dice qué rompe en otra parte. Además usa el paso 2 de `why` para jalar el PR y los commits, y las reglas de honestidad de `why` para los riesgos.
* **[Unslop](/pstack/skills/unslop/)**: el writeup final se pasa por unslop antes de entregarse.
* **`arena`** (aún no replicado): para cambios grandes o anchos, el paso 6 manda correr el análisis como arena con varios modelos y fusionar respuestas.

---

### 4. Ejemplo breve

Un diff pequeño toca la purga de caché y "no toca nada más". El análisis encuentra el hecho único que lo hace seguro ("la llamada solo descarta entradas ya muertas") y lo prueba con un script de diez líneas que importa la librería real, llama la función con una entrada viva y falla ruidoso si la toca: el hecho queda probado en el paso 4, y los riesgos restantes se listan con su `file:line`, probabilidad y costo.
