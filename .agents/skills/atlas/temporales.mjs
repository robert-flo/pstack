#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { esTemporal, slugTemporal } from "../../../atlas/src/contrato.mjs";
import { capitulos, docsRoot, portada, url } from "./capitulos.mjs";

const uso = `Uso:
  temporales.mjs slug <ruta>        slug de la página temporal de un archivo de apoyo
  temporales.mjs listar             páginas temporales: <grupo>/<slug>, fuente y dueño
  temporales.mjs absorber <dueño>   borra las temporales del dueño y redirige sus enlaces`;

function escapar(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function redirigirHablaCon(source, viejo, nuevo, propio) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  const lines = match[1].split("\n");
  const start = lines.findIndex((l) => l.startsWith("habla-con:"));
  if (start === -1) return source;
  const inline = lines[start].slice("habla-con:".length).trim();
  let items;
  let end = start + 1;
  if (inline.startsWith("[")) {
    items = inline.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
  } else {
    items = [];
    while (end < lines.length && /^\s+-\s+/.test(lines[end])) {
      items.push(lines[end].replace(/^\s+-\s+/, "").trim());
      end++;
    }
  }
  if (!items.includes(viejo)) return source;
  const nuevos = [];
  for (const item of items.map((i) => (i === viejo ? nuevo : i))) {
    if (item !== propio && !nuevos.includes(item)) nuevos.push(item);
  }
  const bloque = inline.startsWith("[")
    ? [`habla-con: [${nuevos.join(", ")}]`]
    : nuevos.length === 0
      ? ["habla-con: []"]
      : ["habla-con:", ...nuevos.map((i) => `  - ${i}`)];
  lines.splice(start, end - start, ...bloque);
  return source.replace(match[1], () => lines.join("\n"));
}

async function absorber(slugDueño) {
  const todos = await capitulos();
  const dueño = todos.find((c) => c.slug === slugDueño && !esTemporal(c));
  if (!dueño) throw new Error(`${slugDueño} no tiene capítulo: escribe la página del dueño antes de absorber`);
  const temporales = todos.filter((c) => esTemporal(c) && c.hablaCon[0] === slugDueño);
  if (temporales.length === 0) {
    console.log(`${slugDueño} no tiene páginas temporales`);
    return;
  }
  for (const t of temporales) await fs.rm(t.file);
  const restantes = todos.filter((c) => !temporales.includes(c));
  const archivos = [...restantes.map((c) => c.file), portada];
  for (const file of archivos) {
    const original = await fs.readFile(file, "utf8");
    let source = original;
    for (const t of temporales) {
      source = source.replace(
        new RegExp(`${escapar(url(t))}(?:#[^)"\\s]*)?`, "g"),
        url(dueño),
      );
      if (file !== portada) {
        source = redirigirHablaCon(source, t.slug, dueño.slug, path.basename(file, ".md"));
      }
    }
    if (source !== original) {
      await fs.writeFile(file, source);
      console.log(`redirigido: ${path.relative(docsRoot, file)}`);
    }
  }
  for (const t of temporales) console.log(`borrada: ${t.grupo}/${t.slug} (${t.fuente})`);
}

const [orden, arg] = process.argv.slice(2);
if (orden === "slug" && arg) {
  console.log(slugTemporal(arg));
} else if (orden === "listar") {
  for (const c of (await capitulos()).filter(esTemporal)) {
    console.log(`${c.grupo}/${c.slug}\tfuente=${c.fuente}\tdueño=${c.hablaCon[0] ?? "?"}`);
  }
} else if (orden === "absorber" && arg) {
  await absorber(arg);
} else {
  console.error(uso);
  process.exit(2);
}
