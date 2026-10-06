import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

const grupos = ["raiz", "skills", "playbooks", "agents", "automations", "guia"] as const;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const requiredFields = ["grupo", "orden", "fuente", "habla-con"] as const;

function atlasDocsLoader() {
  const base = docsLoader();
  return {
    name: "atlas-docs-loader",
    load: async (context: Parameters<NonNullable<typeof base.load>>[0]) => {
      await base.load(context);
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
      }
    },
  };
}

export const collections = {
  docs: defineCollection({
    loader: atlasDocsLoader(),
    schema: docsSchema({
      extend: z.object({
        grupo: z.enum(grupos).optional(),
        orden: z.number().int().positive().multipleOf(10).optional(),
        fuente: z.string().min(1).optional(),
        "habla-con": z.array(z.string().regex(slug)).optional(),
      }),
    }),
  }),
};
