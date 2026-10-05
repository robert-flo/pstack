---
title: Migrate Callers Then Delete Legacy APIs
description: "Apply when introducing a new internal API while old callers still exist. Migrate callers and delete the old API in the same wave instead of preserving compatibility layers."
grupo: skills
orden: 150
familia: The architecture principles
fuente: skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-outcome-oriented-execution
  - principle-model-the-domain
---

> **Regla de oro:** *Apply when introducing a new internal API while old callers still exist. Migrate callers and delete the old API in the same wave instead of preserving compatibility layers.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The architecture principles` (Bloque 5 de 6).
* **Qué es:** Un principio de arquitectura: cuando se decide que una API interna nueva es el diseño correcto, se migran los callers y se borra la API vieja en la misma ola de refactor, en lugar de conservar capas de compatibilidad.
* **Para qué sirve:** Mantener API vieja y nueva a la vez crea complejidad de doble vía, hace lenta la limpieza y deja la base de código con cara de append-only. Se completa el refactor en vez de dejarlo a medias.
* **Cuándo se aplica:** Cuando no hay usuarios externos que dependan de retrocompatibilidad, el proyecto puede absorber cambios coordinados, y la nueva API forma parte de una iniciativa de simplificación o refactor.

---

### 2. El Patrón

* No conservar rutas legacy solo porque internamente aún hay callers.
* Inventario de callers, migración, y borrado de la API vieja de inmediato.
* Los adaptadores temporales son excepcionales y con plazo (time-boxed), no arquitectura por defecto.
* Actualizar los tests para afirmar el contrato nuevo, y borrar los que solo protegen detalles de implementación previos al refactor.

---

### 3. Relación con otros archivos

* **[Outcome-Oriented Execution](../principles-core/principle-outcome-oriented-execution/)**: ese manda migrar el proyecto entero de una vez en vez de reescrituras por fases; este es su regla complementaria al final del camino: una vez decidida la nueva API, se terminan los callers y se borra la vieja en la misma ola.
* **[Model the Domain](./principle-model-the-domain/)**: una API nueva suele nacer de re-modelar el dominio. Ese define el diseño; este manda terminar el trabajo: migrar a todos los callers y eliminar la API vieja, para no dejar dos rutas vivas.
* **[Subtract Before You Add](../principles-core/principle-subtract-before-you-add/)**: borrar la API vieja es la resta que ese principio manda; conservar rutas legacy por comodidad es exactamente lo que ese prohíbe.

---

### 4. Ejemplo breve

Se renombra `renameFile()` a `moveEntry()` con una firma distinta.

* **Sin el principio:** `moveEntry()` entra y `renameFile()` queda marcada como obsoleta "por ahora". Tres meses después conviven dos rutas, los tests viejos fallan a veces y nadie recuerda cuál llamar.
* **Con el principio:** se listan los callers (todos internos), se migran en el mismo cambio, se borra `renameFile()`, y los tests viejos que solo afirmaban la firma anterior se eliminan. La base de código termina con una sola ruta.

---

### 5. Redirección Rápida en Chat
Si la IA introduce una API nueva y deja la vieja "por si acaso":
> `/poteto-mode aplica 'principle-migrate-callers-then-delete-legacy-apis'. Migrá los callers y borrá la API vieja en la misma ola; sin capas de compatibilidad.`
