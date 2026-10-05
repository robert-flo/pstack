---
title: Separate Before Serializing Shared State
description: "Apply when concurrent actors might write to the same file, branch, key, or state object. Eliminate the sharing first; serialize structurally only when one shared writer is a real invariant."
grupo: skills
orden: 160
familia: The architecture principles
fuente: skills/principle-separate-before-serializing-shared-state/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-model-the-domain
  - principle-make-operations-idempotent
---

> **Regla de oro:** *Apply when concurrent actors might write to the same file, branch, key, or state object. Eliminate the sharing first; serialize structurally only when one shared writer is a real invariant.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The architecture principles` (Bloque 6 de 6).
* **Qué es:** Un principio de arquitectura: cuando varios actores concurrentes podrían compartir estado mutable, primero se pregunta si de verdad necesitan el mismo objeto mutable. Si no, se elimina la compartición. Cuando la compartición es real, se estructura la serialización con mecanismos: lockfiles, fases secuenciales, propiedad exclusiva.
* **Para qué sirve:** Las escrituras concurrentes a estado compartido crean race conditions intermitentes, difíciles de reproducir y caras de depurar. Las instrucciones y convenciones no son control de concurrencia.
* **Cuándo se usa:** Cuando actores concurrentes podrían escribir al mismo archivo, rama, clave u objeto de estado.

---

### 2. El Patrón

1. **Identificar el estado mutable compartido** (archivos que ambos leen y escriben, ramas a las que ambos hacen push, APIs que ambos definen y consumen).
2. **Por defecto, eliminar el target de escritura compartido.** Preguntar: ¿estos actores necesitan un objeto canónico, o están publicando hechos independientes? Darle a cada actor su propio archivo, clave, rama o directorio de estado, y hacer merge solo en la frontera de lectura o de reporte. Dos workers escribiendo su propio campo `lastX` en un `state.json` sigue siendo mutación compartida. `indexer-state.json` + `metrics-state.json` no lo es.
3. **Solo cuando un target de escritura compartido es un invariante real, estructurar el acceso:** lockfiles, fases secuenciales, actor único escritor, o compare-and-swap atómico. Tratar "necesitamos un lock" como un smell que hay que verificar, no como la respuesta por defecto.

---

### 3. Relación con otros archivos

* **[Make Operations Idempotent](./principle-make-operations-idempotent/)**: la otra cara de la misma moneda. La idempotencia se apoya en que cada worker escriba su propio archivo y la re-ejecución converja; la serialización estructural (lockfiles, locks con PID viejo) aparece en ambos cuando la compartición es real.
* **[Model the Domain](./principle-model-the-domain/)**: decidir si los actores publican hechos independientes o necesitan un objeto canónico es una decisión de modelado del dominio. Ese define las estructuras; este define quién escribe dónde.
* **[Boundary Discipline](./principle-boundary-discipline/)**: el merge en la frontera de lectura o de reporte es un borde del sistema; ese principio manda concentrar ahí la validación, no repetirla en cada worker.

---

### 4. Ejemplo breve

Dos workers escriben su último estado de ejecución.

* **Sin el principio:** ambos vuelcan su campo `lastRun` en un mismo `state.json`. A veces el archivo sale corrupto o un estado pisa al otro, dos veces por mes, imposible de reproducir.
* **Con el principio:** cada worker escribe su propio `indexer-state.json` y `metrics-state.json`, y el reporte lee los dos al final. Ya no hay carrera: cada hecho independiente vive en su propio archivo, y el merge ocurre una sola vez, en la frontera.

---

### 5. Redirección Rápida en Chat
Si la IA responde a una carrera potencial con "agreguemos un lock" sin más:
> `/poteto-mode aplica 'principle-separate-before-serializing-shared-state'. Primero eliminá la compartición; estructurá el acceso solo si un escritor compartido es un invariante real.`
