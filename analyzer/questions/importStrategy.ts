import type { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { blue, Select } from "../deps.ts";

export async function askImportStrategy(): Promise<
  RegistryEntryV2["importStrategy"]
> {
  return Select.prompt({
    message: blue("What CDN do you want to load code from?"),
    options: [
      { name: "jsdelivr", value: "jsdelivr" },
      { name: "jspm", value: "jspm" },
    ],
  }) as Promise<RegistryEntryV2["importStrategy"]>;
}
