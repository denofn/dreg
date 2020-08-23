import { path, blue } from "./deps.ts";
import { jsdelivr, jspm } from "../utils/constants.ts";
import { fetchPj } from "../utils/fetchPj.ts";
import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { RegistryEntryGenerator } from "../utils/generateRegistryEntry.ts";
import { getDependencyMap } from "../utils/getDependencyMap.ts";
import { diveFile } from "./diveFile.ts";
import { getEntry } from "./getEntry.ts";
import { getSpinner } from "./spinner.ts";

export async function analyze(d: string, v?: string, isJspm?: boolean, ghUser?: string): Promise<RegistryEntryV1> {
  const jsdelivrSrc = !!ghUser ? `${jsdelivr("gh")}/${ghUser}` : jsdelivr("npm");
  const R = new RegistryEntryGenerator({
    name: d,
    importStrategy: "jsdelivr",
    importType: !!ghUser ? "gh" : "npm",
    ghUser: ghUser ?? undefined,
    isAtTypes: (d as string).startsWith("@types/"),
  });

  const fetchUrl = !v ? path.join(jsdelivrSrc, d) : path.join(jsdelivrSrc, `${d}@${v}`);
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
  const entryFileUrl = new URL(path.join(jsdelivrSrc, path.join(packName, R.entryFile!))).href;
  R.update(await handleDive(entryFileUrl, depMap, packName, isJspm));

  if (!!R.typesEntry) {
    const typesEntryFileUrl = new URL(path.join(jsdelivrSrc, path.join(packName, R.typesEntry))).href;
    const [typeDeps] = await diveFile(typesEntryFileUrl, depMap);
    R.updateTypeRewrites = typeDeps;
  }

  if (!R.entry) throw new Error("Info incomplete, quitting");
  return R.entry;
}

async function handleDive(
  entryFileUrl: string,
  depMap: Record<string, string>,
  packName: string,
  isJspm?: boolean
): Promise<Partial<RegistryEntryV1>> {
  try {
    if (isJspm) throw new Error("CJS syntax detected, quitting");

    const [rewrites, hasDefaultExport] = await diveFile(entryFileUrl, depMap);
    return { rewrites, hasDefaultExport };
  } catch (e) {
    if (e?.message !== "CJS syntax detected, quitting") throw new Error(e.message);
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
