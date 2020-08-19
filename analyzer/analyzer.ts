import { path, blue } from "./deps.ts";
import { jsdelivr } from "../utils/constants.ts";
import { fetchPj } from "../utils/fetchPj.ts";
import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { RegistryEntryGenerator } from "../utils/generateRegistryEntry.ts";
import { getDependencyMap } from "../utils/getDependencyMap.ts";
import { diveFile } from "./diveFile.ts";
import { getEntry } from "./getEntry.ts";
import { getSpinner } from "./spinner.ts";

export async function analyze(d: string, v?: string): Promise<RegistryEntryV1> {
  const R = new RegistryEntryGenerator({
    name: d,
    importStrategy: "jsdelivr",
    importType: "npm",
    isAtTypes: (d as string).startsWith("@types/"),
  });

  const fetchUrl = !v ? path.join(jsdelivr("npm"), d) : path.join(jsdelivr("npm"), `${d}@${v}`);
  const [pjUrl, pj] = await fetchPj(fetchUrl);

  if (v) R.update({ version: v, description: pj.description ?? "" });
  else {
    await getSpinner().setText(blue(`Analyzing ${d}@${pj.version!}`));
    R.update({ version: pj.version!, description: pj.description ?? "" });
  }

  const depMap = getDependencyMap(pj);
  if (Object.keys(depMap).length === 0) R.update({ npmDeps: {} });

  const { entry, typesEntry } = getEntry(pj, R);
  R.update({ entry, typesEntry });

  const entryFileUrl = new URL(path.join(jsdelivr("npm"), path.join(`${R.name!}@${R.version!}`, R.entryFile!))).href;
  const { npmDeps, localDeps, nativeDeps } = await diveFile(entryFileUrl, depMap);
  R.update({ npmDeps, localDeps, nativeDeps });

  if (!R.entry) throw new Error("Info incomplete, quitting");
  return R.entry;
}
