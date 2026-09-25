import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

const site = process.env.ASTRO_SITE || "https://robert-flo.github.io";
const base = process.env.ASTRO_BASE || "/pstack/";

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: "pstack, archivo por archivo",
      locales: {
        root: { label: "Español", lang: "es" },
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        PageTitle: "./src/components/PageTitle.astro",
      },
      sidebar: [
        { label: "Raíz", items: [{ autogenerate: { directory: "raiz" } }] },
        { label: "Skills", items: [{ autogenerate: { directory: "skills" } }] },
        { label: "Playbooks", items: [{ autogenerate: { directory: "playbooks" } }] },
        { label: "Agents", items: [{ autogenerate: { directory: "agents" } }] },
        { label: "Automations", items: [{ autogenerate: { directory: "automations" } }] },
        { label: "Guía", items: [{ autogenerate: { directory: "guia" } }] },
      ],
    }),
  ],
});
