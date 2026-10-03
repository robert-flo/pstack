---
title: Boundary Discipline
description: "Apply when wiring validation, error handling, or framework adapters. Concentrate guards at system boundaries (CLI, config, network, external APIs); trust internal types and keep business logic in pure functions."
grupo: skills
orden: 120
familia: The architecture principles
fuente: skills/principle-boundary-discipline/SKILL.md
habla-con:
  - 08-principles
  - poteto-mode
  - principle-model-the-domain
---

> **Regla de oro:** *Apply when wiring validation, error handling, or framework adapters. Concentrate guards at system boundaries (CLI, config, network, external APIs); trust internal types and keep business logic in pure functions.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The architecture principles` (Bloque 2 de 6).
* **Qué es:** Un principio de arquitectura: la validación, el estrechamiento de tipos y el manejo de errores se concentran en las fronteras del sistema, y el código interno se confía sin condiciones. La lógica de negocio vive en funciones puras; el caparazón (shell) es delgado y mecánico.
* **Para qué sirve:** La validación dispersa es ruidosa, redundante y da una falsa sensación de seguridad. Mantener la lógica fuera del cableado del framework permite probarla sin el framework.
* **Cuándo se usa:** Al cablear validación, manejo de errores o adaptadores de framework: argumentos de CLI, archivos de configuración, APIs externas, protocolos de red.

---

### 2. El Patrón

* **En las fronteras** (argumentos de CLI, archivos de configuración, APIs externas, protocolos de red): validar, devolver errores, manejar a la defensiva.
* **Dentro del sistema:** datos tipados, propagación de errores, sin revalidación. Se confía en los tipos.
* **A través de la frontera:** exponer conceptos del dominio, no la representación privada de la frontera. El mecanismo de propósito general queda adentro y la política de propósito especial en el borde.

**Aplicaciones:** validar la configuración al momento de parsear (la frontera), no dentro de la lógica de negocio; convertir datos crudos en tipos del dominio en la frontera; no re-exportar tipos de transporte, almacenamiento, framework o cable (wire) por la superficie pública; sin chequeos de nil redundantes en lo profundo de la cadena de llamadas si la frontera ya validó. En la organización del código: lógica de negocio en funciones puras sin dependencias del framework; funciones de parseo como transformaciones puras de bytes crudos a estado tipado; construcción de prompts con estado estructurado de entrada y cadena de salida; puntajes y evaluaciones como transformaciones puras de estado a resultados.

**Las dos pruebas:**
* "¿Este dato está cruzando una frontera del sistema ahora mismo?" Si no, la validación es redundante.
* "¿Puede ser una función pura que el shell solo llama?" Si sí, se extrae.

---

### 3. Relación con otros archivos

* **[Model the Domain](./principle-model-the-domain/)**: se complementan. Ese define las estructuras del dominio; este define dónde se convierten los datos crudos en esas estructuras (en la frontera) y dónde ya se confía en ellas (adentro).
* **[Minimize Reader Load](../principles-core/principle-minimize-reader-load/)**: la validación esparcida por la cadena de llamadas agrega capas y estado oculto en la cabeza del lector. Concentrarla en el borde acorta el camino entre la pregunta y la respuesta.
* **[Outcome-Oriented Execution](../principles-core/principle-outcome-oriented-execution/)**: ese principio manda no arrastrar código de compatibilidad entre fases; este es su complemento en la superficie: no re-exportar representaciones viejas del borde hacia el mundo exterior.

---

### 4. Ejemplo breve

Una herramienta de línea de comandos lee un archivo de configuración.

* **Sin el principio:** cada módulo vuelve a chequear que la configuración exista y tenga los campos, con chequeos de nil repetidos a lo largo de la cadena de llamadas. Nadie sabe ya quién validó qué.
* **Con el principio:** una función de parseo pura lee el archivo crudo, valida todo y devuelve un estado tipado, o un error claro. Adentro, el resto del programa usa ese estado sin volver a preguntar, y se prueba sin tocar la CLI.

---

### 5. Redirección Rápida en Chat
Si la IA está cableando validación o adaptadores y la lógica se mezcla con el framework:
> `/poteto-mode aplica 'principle-boundary-discipline'. Valida en la frontera, confía en los tipos adentro y deja la lógica de negocio en funciones puras que el shell solo llama.`
