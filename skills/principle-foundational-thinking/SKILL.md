---
name: principle-foundational-thinking
description: "Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious."
disable-model-invocation: true
---

# Foundational Thinking

> **Regla de oro:** Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious.

### Las 3 Reglas de Cimiento

1. **Model Core Types First:** Define la forma del estado y los tipos primarios antes de escribir funciones que los manipulen.
2. **Sequence Scaffold vs. Feature:** Asegura que las bases de infraestructura y modelos existan antes de la lógica de negocio.
3. **Clarify Shared State:** Identifique tempranamente qué recursos o estados son compartidos entre procesos o actores concurrentes.

### Redirección Rápida en Chat
Si la IA empieza a escribir lógica apresuradamente:
> `/poteto-mode aplica 'principle-foundational-thinking'. Pausa la lógica de negocio y define primero las estructuras de datos y tipos principales.`
