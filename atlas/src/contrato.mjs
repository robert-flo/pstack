export const grupos = ["raiz", "skills", "playbooks", "agents", "automations", "guia"];
export const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugTemporal(ruta) {
  return ruta
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function esTemporal({ slug: s, fuente }) {
  return typeof fuente === "string" && s === slugTemporal(fuente);
}
