import { path, blue } from "./deps.ts";
import { jsdelivr, jspm } from "../utils/constants.ts";
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

  const { entry, typesEntry } = getEntry(pj, R);
  R.update({ entry, typesEntry });

  const packName = `${R.name!}@${R.version!}`;
  const entryFileUrl = new URL(path.join(jsdelivr("npm"), path.join(packName, R.entryFile!))).href;
  R.update(await handleDive(entryFileUrl, depMap, packName));

  if (!!R.typesEntry) {
    const typesEntryFileUrl = new URL(path.join(jsdelivr("npm"), path.join(packName, R.typesEntry))).href;
    const [typeDeps] = await diveFile(typesEntryFileUrl, depMap);
    R.updateTypeRewrites = typeDeps;
  }

  if (!R.entry) throw new Error("Info incomplete, quitting");
  return R.entry;
}

async function handleDive(
  entryFileUrl: string,
  depMap: Record<string, string>,
  packName: string
): Promise<Partial<RegistryEntryV1>> {
  try {
    const [rewrites, hasDefaultExport] = await diveFile(entryFileUrl, depMap);
    return { rewrites, hasDefaultExport };
  } catch (e) {
    if (e?.message !== "CJS syntax detected, quitting") throw new Error(e);
    const jspmEntryFile = new URL(`${jspm}${packName}!cjs`).href;
    const [rewrites, hasDefaultExport] = await diveFile(jspmEntryFile, {});
    return {
      entry: jspmEntryFile,
      importStrategy: "jspm",
      rewrites,
      hasDefaultExport,
    };
  }
}
