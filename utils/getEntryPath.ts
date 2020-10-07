import { path } from "./deps.ts";
import { jsdelivr, jspm } from "./constants.ts";

import type { RegistryEntryV2 } from "../runtime/types/registry.ts";
import type { PackageJson } from "./deps.ts";

export function getEntryPath(
  entry: Partial<RegistryEntryV2>,
  pj?: PackageJson,
): string {
  if (!entry.importType) throw new Error("Couldn't find entry importType");

  let base;

  if (entry.importType === "npm" && entry.importStrategy === "jspm") {
    // TODO: do jspm npm
    base = jspm;
  } else if (entry.importType === "npm") {
    // TODO: do jsdelivr npm
    base = jsdelivr("npm");
  } else if (entry.importStrategy === "jspm") {
    throw new Error("Unable to fetch Github source code from JSPM!");
  } else {
    if (!entry.ghInfo?.user || !entry.ghInfo?.repo) {
      throw new Error("Not enough info in entry ghInfo!");
    }

    base = path.join(jsdelivr("gh"), entry.ghInfo.user, entry.ghInfo.repo);
  }

  let entryLocation = entry.entry;
  if (!entryLocation && !!pj) entryLocation = getEntryFromPj(pj, entry);
  else if (!entryLocation) entryLocation = "index.js";

  return new URL(path.join(base, entryLocation!)).href;
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
