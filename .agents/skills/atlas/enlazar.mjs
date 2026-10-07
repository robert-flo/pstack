#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { esTemporal } from "../../../atlas/src/contrato.mjs";
import { capitulos, docsRoot, url } from "./capitulos.mjs";

function escapar(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function enlazarProsa(source, slug, destino) {
  const s = escapar(slug);
  const codigo = new RegExp(`(?<!\\[)\`(/?${s})\`(?!\\]\\()`, "g");
  const negrita = new RegExp(`\\*\\*${s}\\*\\*`, "g");
  const cierre = source.match(/^---\n[\s\S]*?\n---\n/)[0].length;
  let enCodigo = false;
  let menciones = 0;
  const cuerpo = source
    .slice(cierre)
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) enCodigo = !enCodigo;
      if (enCodigo || /^\s*>/.test(line)) return line;
      return line
        .replace(codigo, (_, texto) => {
          menciones++;
          return `[\`${texto}\`](${destino})`;
        })
        .replace(negrita, () => {
          menciones++;
          return `**[${slug}](${destino})**`;
        });
    })
    .join("\n");
  return { source: source.slice(0, cierre) + cuerpo, menciones };
}

const slug = process.argv[2];
if (!slug) {
  console.error("Uso: enlazar.mjs <slug>   enlaza las menciones de un capítulo nuevo en quien lo lista en habla-con");
  process.exit(2);
}
const todos = await capitulos();
const nuevo = todos.find((c) => c.slug === slug && !esTemporal(c));
if (!nuevo) throw new Error(`${slug} no tiene capítulo`);
for (const c of todos.filter((c) => c !== nuevo && c.hablaCon.includes(slug))) {
  const { source, menciones } = enlazarProsa(c.source, slug, url(nuevo));
  const rel = path.relative(docsRoot, c.file);
  if (menciones > 0) {
    await fs.writeFile(c.file, source);
    console.log(`enlazado: ${rel} (${menciones})`);
  } else {
    console.log(`sin mención: ${rel} (prosa intacta)`);
  }
}
