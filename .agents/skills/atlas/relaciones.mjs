#!/usr/bin/env node
import fs from "node:fs/promises";
import { capitulos, portada, url } from "./capitulos.mjs";

const inicio = "<!-- relaciones:inicio -->";
const fin = "<!-- relaciones:fin -->";

function lista(items) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} y ${items.at(-1)}`;
}

const todos = await capitulos();
const porSlug = new Map(todos.map((c) => [c.slug, c]));
const enlace = (c) => `[${c.title}](${url(c)})`;
const nombre = (slug) => (porSlug.has(slug) ? enlace(porSlug.get(slug)) : `\`${slug}\``);

const bullets = todos
  .filter((c) => c.hablaCon.length > 0)
  .map((c) => `- ${enlace(c)} habla con ${lista(c.hablaCon.map(nombre))}.`);
const bloque = [
  inicio,
  "",
  "Cada capítulo y las unidades con las que habla. Los nombres sin enlace todavía no tienen página.",
  "",
  ...bullets,
  "",
  fin,
].join("\n");

const source = await fs.readFile(portada, "utf8");
const a = source.indexOf(inicio);
const b = source.indexOf(fin);
if (a === -1 || b === -1 || b < a) throw new Error("La portada no marca el bloque Relaciones");
await fs.writeFile(portada, source.slice(0, a) + bloque + source.slice(b + fin.length));
console.log(`Relaciones: ${bullets.length} capítulos`);
