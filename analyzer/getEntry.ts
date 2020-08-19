import { typefest } from "./deps.ts";
import { RegistryEntryGenerator } from "../utils/generateRegistryEntry.ts";

/**
 * 1. type only repos
 * 2. repos with entry and potential types
 */
export function getEntry(pj: typefest.PackageJson, _e: RegistryEntryGenerator): { entry: string; typesEntry?: string } {
  if (!!_e.isAtTypes) return { entry: pj.types! };
  if (!pj.main && !pj.module && typeof pj.types === "string") return { entry: pj.types };

  let result: { entry: string; typesEntry?: string };
  if (typeof pj.module === "string") result = { entry: pj.module };

  if (!pj.main) throw new Error("Could not find entry file, quitting");

  result = { entry: pj.main };

  if (typeof pj.types === "string") result.typesEntry = pj.types!;

  return result;
}
