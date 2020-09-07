import { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { blue, Select } from "../deps.ts";

export async function askImportType(): Promise<RegistryEntryV2["importType"]> {
  return Select.prompt({
    message: blue("Where do you want to import from?"),
    options: [
      { name: "NPM", value: "npm" },
      { name: "Github", value: "gh" },
    ],
  }) as Promise<RegistryEntryV2["importType"]>;
}
