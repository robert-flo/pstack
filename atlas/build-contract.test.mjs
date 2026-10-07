import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { atlasRoot, buildAtlas } from "./build-atlas.mjs";
import { slug, slugTemporal } from "./src/contrato.mjs";

const docsRoot = path.join(atlasRoot, "src/content/docs");

async function withChapter(relativePath, contents, run) {
  const file = path.join(docsRoot, relativePath);
  const createdDir = await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, contents);
  try {
    await run();
  } finally {
    await fs.rm(createdDir ?? file, { recursive: true, force: true });
  }
}

function chapter({ grupo = "skills", orden = "10", fuente = "skills/x/SKILL.md", hablaCon = "[]", body = "Cuerpo." } = {}) {
  return `---
title: Capítulo de prueba
grupo: ${grupo}
orden: ${orden}
fuente: ${fuente}
habla-con: ${hablaCon}
---

${body}
`;
}

async function assertBuildFails(relativePath, contents) {
  await withChapter(relativePath, contents, async () => {
    const result = await buildAtlas();
    assert.notEqual(result.status, 0, "el build debía fallar");
  });
}

test("un capítulo válido se construye en /<grupo>/<slug>/", async () => {
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

test("la portada marca el inicio y el fin del bloque Relaciones", async () => {
  const source = await fs.readFile(path.join(docsRoot, "index.md"), "utf8");
  const inicio = source.indexOf("<!-- relaciones:inicio -->");
  const fin = source.indexOf("<!-- relaciones:fin -->");
  assert.ok(inicio > source.indexOf("## Relaciones"), "falta el marcador de inicio tras el encabezado");
  assert.ok(fin > inicio, "falta el marcador de fin después del de inicio");
});

test("el sidebar muestra los seis grupos", async () => {
  const result = await buildAtlas();
  assert.equal(result.status, 0, result.stderr);
  const page = await fs.readFile(path.join(atlasRoot, "dist/index.html"), "utf8");
  for (const group of ["Raíz", "Skills", "Playbooks", "Agents", "Automations", "Guía"]) {
    assert.match(page, new RegExp(group));
  }
});

test("la base pública es la de un project site bajo /pstack/", async () => {
  const result = await buildAtlas();
  assert.equal(result.status, 0, result.stderr);
  const page = await fs.readFile(path.join(atlasRoot, "dist/index.html"), "utf8");
  assert.match(page, /href="https:\/\/robert-flo\.github\.io\/pstack\/"/);
});

test("el build falla si falta el frontmatter obligatorio", async () => {
  await assertBuildFails(
    "skills/sin-contrato.md",
    `---
title: Sin contrato
---

Cuerpo.
`,
  );
});

test("el build falla si grupo no coincide con la carpeta", async () => {
  await assertBuildFails("skills/grupo-ajeno.md", chapter({ grupo: "agents" }));
});

test("el build falla si grupo no es uno de los seis", async () => {
  await assertBuildFails("principios/grupo-inventado.md", chapter({ grupo: "principios" }));
});

test("el build falla si el capítulo no vive en <grupo>/<slug>", async () => {
  await assertBuildFails("skills/anidado/capitulo-anidado.md", chapter());
});

test("el build falla si orden no es un número", async () => {
  await assertBuildFails("skills/orden-texto.md", chapter({ orden: "primero" }));
});

test("el build falla si orden no va de 10 en 10", async () => {
  await assertBuildFails("skills/orden-suelto.md", chapter({ orden: "15" }));
});

test("el build falla si habla-con no es una lista", async () => {
  await assertBuildFails("skills/habla-texto.md", chapter({ hablaCon: "principle-laziness-protocol" }));
});

test("el build falla si habla-con tiene algo que no es un slug", async () => {
  await assertBuildFails("skills/habla-ruta.md", chapter({ hablaCon: "[skills/Laziness Protocol.md]" }));
});

test("el build falla si fuente no es texto", async () => {
  await assertBuildFails("skills/fuente-lista.md", chapter({ fuente: "[a, b]" }));
});

test("el build falla si un enlace interno omite la base /pstack/", async () => {
  await assertBuildFails(
    "skills/enlace-sin-base.md",
    chapter({ body: "Ver [Laziness Protocol](/skills/principle-laziness-protocol/)." }),
  );
});

test("el build falla si un enlace interno apunta a una página que no existe", async () => {
  await assertBuildFails(
    "skills/enlace-roto.md",
    chapter({ body: "Ver [Poteto Mode](/pstack/skills/poteto-mode/)." }),
  );
});

test("el slug temporal sale de la ruta y no choca entre archivos del mismo nombre", () => {
  const a = slugTemporal("skills/show-me-your-work/scripts/log.sh");
  const b = slugTemporal("skills/why/scripts/log.sh");
  assert.equal(a, "skills-show-me-your-work-scripts-log-sh");
  assert.notEqual(a, b);
  for (const ruta of [".gitignore", "skills/create-verification-skill/references/feature-map-example/README.md"]) {
    assert.match(slugTemporal(ruta), slug);
  }
});

test("una página temporal en el grupo del dueño construye", async () => {
  const fuente = "skills/show-me-your-work/scripts/log.sh";
  await withChapter(
    `skills/${slugTemporal(fuente)}.md`,
    chapter({ fuente, hablaCon: "[show-me-your-work]" }),
    async () => {
      const result = await buildAtlas();
      assert.equal(result.status, 0, result.stderr);
    },
  );
});

test("el build falla si una página temporal no nombra a su dueño", async () => {
  const fuente = "skills/show-me-your-work/scripts/log.sh";
  await assertBuildFails(`skills/${slugTemporal(fuente)}.md`, chapter({ fuente, hablaCon: "[]" }));
});

test("el build falla si una página temporal convive con la página de su dueño", async () => {
  const fuente = "skills/principle-laziness-protocol/scripts/x.sh";
  await assertBuildFails(
    `skills/${slugTemporal(fuente)}.md`,
    chapter({ fuente, hablaCon: "[principle-laziness-protocol]" }),
  );
});

test("el build falla si dos capítulos explican la misma fuente", async () => {
  await assertBuildFails(
    "skills/fuente-repetida.md",
    chapter({ fuente: "skills/principle-laziness-protocol/SKILL.md" }),
  );
});

test("un enlace interno con base a una página existente construye", async () => {
  await withChapter(
    "skills/enlace-valido.md",
    chapter({ body: "Ver [Laziness Protocol](/pstack/skills/principle-laziness-protocol/)." }),
    async () => {
      const result = await buildAtlas();
      assert.equal(result.status, 0, result.stderr);
    },
  );
});
