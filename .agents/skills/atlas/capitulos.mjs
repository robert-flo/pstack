import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { grupos } from "../../../atlas/src/contrato.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
export const docsRoot = process.env.ATLAS_DOCS
  ? path.resolve(process.env.ATLAS_DOCS)
  : path.join(repoRoot, "atlas/src/content/docs");
export const portada = path.join(docsRoot, "index.md");

export function frontmatter(source, file) {
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
  return { title: value("title"), orden: Number(value("orden")), fuente: value("fuente"), hablaCon };
}

export async function capitulos() {
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
      const source = await fs.readFile(full, "utf8");
      found.push({ grupo, slug: file.slice(0, -3), file: full, source, ...frontmatter(source, full) });
    }
  }
  return found.sort(
    (a, b) => grupos.indexOf(a.grupo) - grupos.indexOf(b.grupo) || a.orden - b.orden,
  );
}

export const url = (c) => `/pstack/${c.grupo}/${c.slug}/`;
