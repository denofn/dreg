import type { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { blue, Confirm, Input } from "../deps.ts";

export async function askEntry(
  { importType }: Pick<RegistryEntryV2, "importType">,
): Promise<RegistryEntryV2["entry"] | undefined> {
  if (importType === "npm") {
    const shouldSkip = !(await Confirm.prompt(
      blue("Do you want to specify a custom entry file?"),
    ));
    if (shouldSkip) return;
  }

  return Input.prompt(blue("At what path is the entry file located?"));
}
