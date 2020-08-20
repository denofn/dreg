await Deno.writeTextFile(
  "registry.ts",
  `import type { Registry } from "./runtime/types/registry.ts";
export default ${await Deno.readTextFile("registry.json")} as Registry;\n`
);
