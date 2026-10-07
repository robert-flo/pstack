import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { atlasRoot } from "./build-atlas.mjs";

const skillRoot = path.resolve(atlasRoot, "../.agents/skills/atlas");
const run = promisify(execFile);

function capitulo({ title, grupo = "skills", orden = 10, fuente, hablaCon = [], body = "Cuerpo." }) {
  const lista = hablaCon.length ? `\n${hablaCon.map((s) => `  - ${s}`).join("\n")}` : " []";
  return `---\ntitle: ${title}\ngrupo: ${grupo}\norden: ${orden}\nfuente: ${fuente}\nhabla-con:${lista}\n---\n\n${body}\n`;
}

async function atlasDePrueba(capitulos) {
  const docs = await fs.mkdtemp(path.join(os.tmpdir(), "atlas-"));
  await fs.writeFile(
    path.join(docs, "index.md"),
    "---\ntitle: Portada\n---\n\nIntro.\n\n## Relaciones\n\n<!-- relaciones:inicio -->\n<!-- relaciones:fin -->\n",
  );
  for (const [rel, contents] of Object.entries(capitulos)) {
    await fs.mkdir(path.join(docs, path.dirname(rel)), { recursive: true });
    await fs.writeFile(path.join(docs, rel), contents);
  }
  const script = (name, ...args) =>
    run("node", [path.join(skillRoot, name), ...args], { env: { ...process.env, ATLAS_DOCS: docs } });
  const leer = (rel) => fs.readFile(path.join(docs, rel), "utf8");
  return { docs, script, leer };
}

const temporal = "skills/skills-show-me-your-work-scripts-log-sh.md";
const fuenteTemporal = "skills/show-me-your-work/scripts/log.sh";

test("absorber borra la temporal y redirige enlaces y habla-con al dueño", async () => {
  const { docs, script, leer } = await atlasDePrueba({
    [temporal]: capitulo({ title: fuenteTemporal, fuente: fuenteTemporal, hablaCon: ["show-me-your-work"] }),
    "skills/show-me-your-work.md": capitulo({
      title: "Show Me Your Work",
      orden: 20,
      fuente: "skills/show-me-your-work/SKILL.md",
      hablaCon: ["skills-show-me-your-work-scripts-log-sh", "principle-prove-it-works"],
    }),
    "skills/vecino.md": capitulo({
      title: "Vecino",
      orden: 30,
      fuente: "skills/vecino/SKILL.md",
      hablaCon: ["skills-show-me-your-work-scripts-log-sh"],
      body: "Ver [log.sh](/pstack/skills/skills-show-me-your-work-scripts-log-sh/#uso).",
    }),
  });
  try {
    const { stdout } = await script("temporales.mjs", "listar");
    assert.match(stdout, /skills\/skills-show-me-your-work-scripts-log-sh\tfuente=skills\/show-me-your-work\/scripts\/log\.sh\tdueño=show-me-your-work/);

    await script("temporales.mjs", "absorber", "show-me-your-work");
    await assert.rejects(leer(temporal));
    const vecino = await leer("skills/vecino.md");
    assert.match(vecino, /\[log\.sh\]\(\/pstack\/skills\/show-me-your-work\/\)/);
    assert.match(vecino, /habla-con:\n  - show-me-your-work\n---/);
    const dueño = await leer("skills/show-me-your-work.md");
    assert.match(dueño, /habla-con:\n  - principle-prove-it-works\n---/);
  } finally {
    await fs.rm(docs, { recursive: true, force: true });
  }
});

test("absorber se niega si el dueño aún no tiene capítulo", async () => {
  const { docs, script, leer } = await atlasDePrueba({
    [temporal]: capitulo({ title: fuenteTemporal, fuente: fuenteTemporal, hablaCon: ["show-me-your-work"] }),
  });
  try {
    await assert.rejects(script("temporales.mjs", "absorber", "show-me-your-work"));
    await leer(temporal);
  } finally {
    await fs.rm(docs, { recursive: true, force: true });
  }
});

test("enlazar enlaza las menciones de quien lista el slug y deja quieta la prosa que no lo nombra", async () => {
  const { docs, script, leer } = await atlasDePrueba({
    "skills/show-me-your-work.md": capitulo({
      title: "Show Me Your Work",
      fuente: "skills/show-me-your-work/SKILL.md",
    }),
    "skills/menciona.md": capitulo({
      title: "Menciona",
      orden: 20,
      fuente: "skills/menciona/SKILL.md",
      hablaCon: ["show-me-your-work"],
      body: "La skill **show-me-your-work** y `show-me-your-work`.\n\n> \"run `show-me-your-work`\"\n\n```\nshow-me-your-work\n```",
    }),
    "skills/calla.md": capitulo({
      title: "Calla",
      orden: 30,
      fuente: "skills/calla/SKILL.md",
      hablaCon: ["show-me-your-work"],
      body: "Esta prosa habla de otra cosa.",
    }),
  });
  try {
    const antes = await leer("skills/calla.md");
    const { stdout } = await script("enlazar.mjs", "show-me-your-work");
    assert.match(stdout, /enlazado: skills\/menciona\.md \(2\)/);
    assert.match(stdout, /sin mención: skills\/calla\.md/);
    const menciona = await leer("skills/menciona.md");
    assert.match(menciona, /\*\*\[show-me-your-work\]\(\/pstack\/skills\/show-me-your-work\/\)\*\*/);
    assert.match(menciona, /\[`show-me-your-work`\]\(\/pstack\/skills\/show-me-your-work\/\)\./);
    assert.match(menciona, /> "run `show-me-your-work`"/);
    assert.match(menciona, /```\nshow-me-your-work\n```/);
    assert.equal(await leer("skills/calla.md"), antes);
  } finally {
    await fs.rm(docs, { recursive: true, force: true });
  }
});

test("el bloque Relaciones enlaza solo capítulos que existen y nombra a los demás sin enlace", async () => {
  const { docs, script, leer } = await atlasDePrueba({
    "skills/a.md": capitulo({ title: "A", fuente: "skills/a/SKILL.md", hablaCon: ["b", "sin-pagina"] }),
    "skills/b.md": capitulo({ title: "B", orden: 20, fuente: "skills/b/SKILL.md" }),
  });
  try {
    await script("relaciones.mjs");
    const portada = await leer("index.md");
    assert.match(portada, /- \[A\]\(\/pstack\/skills\/a\/\) habla con \[B\]\(\/pstack\/skills\/b\/\) y `sin-pagina`\./);
    assert.match(portada, /^Intro\.$/m);
  } finally {
    await fs.rm(docs, { recursive: true, force: true });
  }
});
