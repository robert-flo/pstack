---
title: Foundational Thinking
description: "Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious."
grupo: skills
orden: 20
familia: The core principles
fuente: skills/principle-foundational-thinking/SKILL.md
habla-con:
  - poteto-mode
  - 08-principles
  - feature
  - architect
  - multi-phase-plan
---

> **Regla de oro:** *Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious.*

---

### 1. Ficha Técnica y Clasificación
* **Jerarquía:** `Skills` › `Principles` › `The core principles` (Bloque 2 de 10).
* **Propósito:** Frenar la improvisación de lógica antes de haber modelado las estructuras de datos base.
* **Activación:** Se activa al inicio de tareas de tipo `feature`, `architect` o `multi-phase-plan` en `/poteto-mode`.

---

### 2. Las 3 Reglas de Cimiento

1. **Model Core Types First:** Define la forma del estado y los tipos primarios antes de escribir funciones que los manipulen.
2. **Sequence Scaffold vs. Feature:** Asegura que las bases de infraestructura y modelos existan antes de la lógica de negocio.
3. **Clarify Shared State:** Identifique tempranamente qué recursos o estados son compartidos entre procesos o actores concurrentes.

---

### 3. Redirección Rápida en Chat
Si la IA empieza a escribir lógica apresuradamente:
> `/poteto-mode aplica 'principle-foundational-thinking'. Pausa la lógica de negocio y define primero las estructuras de datos y tipos principales.`
