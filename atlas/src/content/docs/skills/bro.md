---
title: Bro
description: "Restate the last message in plain human language, with no jargon."
grupo: skills
orden: 240
familia: Utilitarias independientes (fase 2)
fuente: skills/bro/SKILL.md
habla-con:
  - unslop
  - technical-writing
---

> **Regla de oro:** *Restate the last message. Stop using jargon and speak coherently.*

---

### 1. Ficha Técnica y Clasificación

* **Jerarquía:** `Skills` › `Utilitarias independientes` (fase 2).
* **Qué es:** La skill más corta de todo el stack: una sola instrucción que pide reexplicar la última respuesta en lenguaje humano, sin jerga, más simple y más concisa, como una persona hablando con otra.
* **Para qué sirve:** Funcionar como botón de pánico contra la ambigüedad. Cuando una explicación se enredó en terminología, `bro` la traduce de vuelta a lenguaje llano sin agregar ni quitar contenido.
* **Cuándo se usa:** Se pide explícitamente con el comando `bro` (lleva `disable-model-invocation: true`, así que el modelo no la invoca solo). Útil tras una explicación densa, un volcado técnico o una respuesta que el usuario no entendió.

---

### 2. Qué pide exactamente

* Recontar la última respuesta del asistente.
* Eliminar la jerga y hablar de forma coherente.
* Decirla más simple y más concisa, en tono de humano a humano.

Es la contraparte mínima de las skills de escritura clara: no corrige el texto fuente ni lo reescribe en un archivo, solo produce la versión digerible en la conversación.

---

### 3. Relación con otros archivos

* **[Technical Writing](/pstack/skills/technical-writing/)**: el estándar formal para que los documentos ya nazcan claros; `bro` es el remedio en caliente cuando la respuesta conversacional ya salió enredada.
* **[Unslop](/pstack/skills/unslop/)**: otra utilidad de edición de lenguaje; unslop limpia los patrones de escritura de IA, `bro` baja el nivel técnico de una respuesta puntual.

---

### 4. Ejemplo breve

Tras una respuesta que dice "el pipeline memoiza las invalidaciones del grafo de dependencias en un caché LRU", `bro` produce algo como: "Cuando cambias un archivo, la reconstrucción solo recompila lo afectado porque guardo la lista de dependencias ya calculada".
