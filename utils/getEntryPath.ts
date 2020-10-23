import { path } from "./deps.ts";
import { jsdelivr, jspm } from "./constants.ts";

import type { RegistryEntryV2 } from "../runtime/types/registry.ts";
import type { PackageJson } from "./deps.ts";

export function getEntryPath(
  entry: Partial<RegistryEntryV2>,
  pj?: PackageJson,
): URL {
  if (!entry.importType) throw new Error("Couldn't find entry importType");
  if (!entry.name) throw new Error("Couldn't find entry name");
  if (!entry.version) throw new Error("Couldn't find entry version");

  let base;

  if (entry.importType === "npm" && entry.importStrategy === "jspm") {
    return new URL(path.join(jspm, `${entry.name}@${entry.version}!cjs`));
  } else if (entry.importType === "npm") {
    base = path.join(jsdelivr("npm"), `${entry.name}@${entry.version}`);
  } else if (entry.importStrategy === "jspm") {
    throw new Error("Unable to fetch Github source code from JSPM!");
  } else {
    if (!entry.ghInfo?.user || !entry.ghInfo?.repo) {
      throw new Error("Not enough info in entry ghInfo!");
    }

    base = path.join(
      jsdelivr("gh"),
      entry.ghInfo.user,
      `${entry.ghInfo.repo}@${entry.version}`,
    );
  }

  let entryLocation = entry.entry;
  if (!entryLocation && !!pj) entryLocation = getEntryFromPj(pj, entry);
  else if (!entryLocation) entryLocation = "index.js";

  return new URL(path.join(base, entryLocation!));
}

function getEntryFromPj(
  pj: PackageJson,
  { isAtTypes }: Pick<Partial<RegistryEntryV2>, "isAtTypes">,
): string | undefined {
  if (!!isAtTypes) return pj.types!;
  if (!pj.main && !pj.module && typeof pj.types === "string") return pj.types;
  if (typeof pj.module === "string") return pj.module;
  else return pj.main;
}
