import type { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { blue, Input } from "../deps.ts";

export function askPackageName(): Promise<RegistryEntryV2["name"]> {
  return Input.prompt(blue("What package do you want to analyze?"));
}
