import { path } from "../deps.ts";
import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { jsdelivr } from "../utils/constants.ts";

const dtsImport = (name: string) => `import {} from "${name}";`;
const starImport = (name: string) => `import * as sanityCheck from "${name}";\nconsole.log(sanityCheck);`;
const defaultImport = (name: string) => `import sanityCheck from "${name}";\nconsole.log(sanityCheck);`;

export async function sanityCheck(R: RegistryEntryV1) {
  const thisDir = path.parse(new URL(import.meta.url).pathname).dir;
  const cisPath = path.join(thisDir, "checkIfSane.ts");
  const name = new URL(path.join(jsdelivr("npm"), path.join(`${R.name}@${R.version}`, R.entry))).href;
  const file = name.endsWith(".d.ts") ? dtsImport(name) : starImport(name);

  await Deno.writeTextFile(cisPath, file);

  const p = Deno.run({
    cmd: ["deno", "run", cisPath],
  });

  await Deno.writeTextFile(cisPath, "");

  await p.status();
  p.close();
}
