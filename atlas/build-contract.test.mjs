import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { atlasRoot, buildAtlas } from "./build-atlas.mjs";

async function withChapter(relativePath, contents, run) {
  const file = path.join(atlasRoot, "src/content/docs", relativePath);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, contents);
  try {
    await run();
  } finally {
    await fs.rm(file, { force: true });
  }
}

test("un capítulo válido se construye en su grupo", async () => {
  const result = await buildAtlas();
  assert.equal(result.status, 0, result.stderr);
  const page = await fs.readFile(
    path.join(atlasRoot, "dist/skills/principle-laziness-protocol/index.html"),
    "utf8",
  );
  assert.match(page, /Laziness Protocol/);
});

test("la portada muestra la introducción", async () => {
  const result = await buildAtlas();
  assert.equal(result.status, 0, result.stderr);
  const page = await fs.readFile(path.join(atlasRoot, "dist/index.html"), "utf8");
  assert.match(page, /Este atlas explica cómo está armado pstack, archivo por archivo/);
});

test("el sidebar muestra los seis grupos", async () => {
  const result = await buildAtlas();
  assert.equal(result.status, 0, result.stderr);
  const page = await fs.readFile(path.join(atlasRoot, "dist/index.html"), "utf8");
  for (const group of ["Raíz", "Skills", "Playbooks", "Agents", "Automations", "Guía"]) {
    assert.match(page, new RegExp(group));
  }
});

test("el build falla si falta el frontmatter obligatorio", async () => {
  await withChapter(
    "skills/sin-contrato.md",
    `---
title: Sin contrato
---

Cuerpo.
`,
    async () => {
      const result = await buildAtlas();
      assert.notEqual(result.status, 0);
    },
  );
});

test("el build falla si grupo no coincide con la carpeta", async () => {
  await withChapter(
    "skills/grupo-ajeno.md",
    `---
title: Grupo ajeno
grupo: agents
orden: 10
fuente: agents/alguien.md
habla-con: []
---

Cuerpo.
`,
    async () => {
      const result = await buildAtlas();
      assert.notEqual(result.status, 0);
    },
  );
});

test("el build falla si orden no es un número", async () => {
  await withChapter(
    "skills/orden-texto.md",
    `---
title: Orden texto
grupo: skills
orden: primero
fuente: skills/orden-texto.md
habla-con: []
---

Cuerpo.
`,
    async () => {
      const result = await buildAtlas();
      assert.notEqual(result.status, 0);
    },
  );
});

test("el build falla si habla-con no es una lista de slugs", async () => {
  await withChapter(
    "skills/habla-texto.md",
    `---
title: Habla texto
grupo: skills
orden: 10
fuente: skills/habla-texto.md
habla-con: principle-laziness-protocol
---

Cuerpo.
`,
    async () => {
      const result = await buildAtlas();
      assert.notEqual(result.status, 0);
    },
  );
});
