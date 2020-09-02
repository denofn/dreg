import { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { ask } from "../ask.ts";
import { blue } from "../deps.ts";

export async function askImportType(): Promise<RegistryEntryV2["importType"]> {
  const importType = (await ask(blue("Where do you want to import from, NPM or Github? [N/g]"))) ?? "npm";
  if (importType.toLowerCase().startsWith("g")) return "gh";
  return "npm";
}
