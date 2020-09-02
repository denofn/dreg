import { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { ask } from "../ask.ts";
import { blue } from "../deps.ts";

export function askPackageName(): Promise<RegistryEntryV2["name"]> {
  return ask(blue("What package do you want to analyze?"));
}
