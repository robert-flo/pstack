import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const atlasRoot = path.dirname(fileURLToPath(import.meta.url));

export function buildAtlas() {
  return new Promise((resolve) => {
    const child = spawn("npm", ["run", "build"], {
      cwd: atlasRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("close", (status) => {
      resolve({ status: status ?? 1, stdout, stderr });
    });
  });
}
