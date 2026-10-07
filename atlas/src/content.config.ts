import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";
import { esTemporal, grupos, slug } from "./contrato.mjs";

const requiredFields = ["grupo", "orden", "fuente", "habla-con"] as const;

function atlasDocsLoader() {
  const base = docsLoader();
  return {
    name: "atlas-docs-loader",
    load: async (context: Parameters<NonNullable<typeof base.load>>[0]) => {
      await base.load(context);
      const capitulos = [];
      for (const entry of context.store.values()) {
        if (entry.id === "index") continue;
        const missing = requiredFields.filter((field) => entry.data[field] === undefined);
        if (missing.length > 0) {
          throw new Error(`A ${entry.id} le falta ${missing.join(", ")}`);
        }
        const [folder, ...rest] = entry.id.split("/");
        if (rest.length !== 1 || !slug.test(rest[0])) {
          throw new Error(`${entry.id} no sigue la forma <grupo>/<slug>`);
        }
        if (entry.data.grupo !== folder) {
          throw new Error(`El grupo de ${entry.id} no coincide con su carpeta`);
        }
        capitulos.push({
          id: entry.id,
          slug: rest[0],
          fuente: entry.data.fuente as string,
          hablaCon: entry.data["habla-con"] as string[],
        });
      }

      const porFuente = new Map<string, string>();
      for (const c of capitulos) {
        const otro = porFuente.get(c.fuente);
        if (otro) throw new Error(`${c.id} y ${otro} explican la misma fuente ${c.fuente}`);
        porFuente.set(c.fuente, c.id);
      }

      const slugs = new Set(capitulos.map((c) => c.slug));
      for (const c of capitulos.filter(esTemporal)) {
        const dueño = c.hablaCon[0];
        if (!dueño) {
          throw new Error(`La página temporal ${c.id} debe nombrar a su dueño primero en habla-con`);
        }
        if (slugs.has(dueño)) {
          throw new Error(`La página temporal ${c.id} convive con su dueño ${dueño}: absórbela`);
        }
      }
    },
  };
}

export const collections = {
  docs: defineCollection({
    loader: atlasDocsLoader(),
    schema: docsSchema({
      extend: z.object({
        grupo: z.enum(grupos as [string, ...string[]]).optional(),
        orden: z.number().int().positive().multipleOf(10).optional(),
        fuente: z.string().min(1).optional(),
        "habla-con": z.array(z.string().regex(slug)).optional(),
      }),
    }),
  }),
};
