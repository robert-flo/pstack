import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

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
        const folder = entry.id.split("/")[0];
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
        grupo: z.string().optional(),
        orden: z.number().optional(),
        fuente: z.string().optional(),
        "habla-con": z.array(z.string()).optional(),
        familia: z.string().optional(),
      }),
    }),
  }),
};
