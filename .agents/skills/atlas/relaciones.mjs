#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const docsRoot = path.join(repoRoot, "atlas/src/content/docs");
const portada = path.join(docsRoot, "index.md");
const grupos = ["raiz", "skills", "playbooks", "agents", "automations", "guia"];
const inicio = "<!-- relaciones:inicio -->";
const fin = "<!-- relaciones:fin -->";

function frontmatter(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`${file} no tiene frontmatter`);
  const lines = match[1].split("\n");
  const value = (key) => {
    const line = lines.find((l) => l.startsWith(`${key}:`));
    return line?.slice(key.length + 1).trim().replace(/^(["'])(.*)\1$/, "$2");
  };
  const start = lines.findIndex((l) => l.startsWith("habla-con:"));
  let hablaCon = [];
  if (start !== -1) {
    const inline = value("habla-con");
    if (inline.startsWith("[")) {
      hablaCon = inline.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      for (const line of lines.slice(start + 1)) {
        const item = line.match(/^\s+-\s+(.+)$/);
        if (!item) break;
        hablaCon.push(item[1].trim());
      }
    }
  }
  return { title: value("title"), orden: Number(value("orden")), hablaCon };
}

async function capitulos() {
  const found = [];
  for (const grupo of grupos) {
    let files;
    try {
      files = await fs.readdir(path.join(docsRoot, grupo));
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    for (const file of files.filter((f) => f.endsWith(".md"))) {
      const full = path.join(docsRoot, grupo, file);
      const data = frontmatter(await fs.readFile(full, "utf8"), full);
      found.push({ grupo, slug: file.slice(0, -3), ...data });
    }
  }
  return found.sort(
    (a, b) => grupos.indexOf(a.grupo) - grupos.indexOf(b.grupo) || a.orden - b.orden,
  );
}

function lista(items) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} y ${items.at(-1)}`;
}

const todos = await capitulos();
const porSlug = new Map(todos.map((c) => [c.slug, c]));
const enlace = (c) => `[${c.title}](/pstack/${c.grupo}/${c.slug}/)`;
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
