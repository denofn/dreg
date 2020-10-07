import { blue, Select } from "./deps.ts";
import { bootstrapState } from "./state.ts";

import type { RegistryEntryV2 } from "../runtime/types/registry.ts";

export async function parsePartialEntry(partial?: string) {
  let partialEntry: Partial<RegistryEntryV2> = {};

  if (partial) {
    try {
      const entryFile = JSON.parse(
        await Deno.readTextFile(partial),
      ) as Record<string, Partial<RegistryEntryV2>>;

      if (Object.keys(entryFile).length === 0) {
        throw new Error("Empty registry");
      }

      if (Object.keys(entryFile).length > 1) {
        const entryKey = await Select.prompt({
          message: blue("What package do you want to analyze?"),
          options: Object.keys(entryFile).map((name) => ({
            name,
            value: name,
          })),
        });
        partialEntry = entryFile[entryKey] as Partial<RegistryEntryV2>;
      } else {
        partialEntry = Object.values(entryFile)[0] as Partial<RegistryEntryV2>;
      }

      bootstrapState(entryFile);
    } catch (e) {
      console.error(e);
      Deno.exit(1);
    }
  }

  return partialEntry;
}
