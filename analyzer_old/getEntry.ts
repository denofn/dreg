import type { PackageJson } from "./deps.ts";
import { RegistryEntryGenerator } from "../utils/generateRegistryEntry.ts";

/**
 * 1. type only repos
 * 2. repos with entry and potential types
 */
export function getEntry(pj: PackageJson, _e: RegistryEntryGenerator): { entry: string; typesEntry?: string } {
  if (!!_e.isAtTypes) return { entry: pj.types! };
  if (!pj.main && !pj.module && typeof pj.types === "string") return { entry: pj.types };

  let result: { entry: string; typesEntry?: string };
  if (typeof pj.module === "string") result = { entry: pj.module };
  else if (!pj.main) throw new Error("Could not find entry file, quitting");
  else result = { entry: pj.main };

  if (typeof pj.types === "string") result.typesEntry = pj.types!;
  if (typeof pj.typings === "string")
    result.typesEntry = pj.typings!.endsWith(".d.ts") ? pj.typings : `${pj.typings}.d.ts`;

  return result;
}
