await Deno.writeTextFile(
  "registry.ts",
  `import type { Registry } from "./runtime/types/registry.ts";
const registry: Registry = ${await Deno.readTextFile("registry.json")};
export default registry;\n`,
);
