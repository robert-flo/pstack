import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    starlight({
      title: "pstack, archivo por archivo",
      locales: {
        root: { label: "Español", lang: "es" },
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
