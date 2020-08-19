import type { RegistryEntryV1 } from "../runtime/types/registry.ts";

const keys = ([
  "name",
  "description",
  "importStrategy",
  "importType",
  "entry",
  "version",
  "npmDeps",
  "nativeDeps",
  "localDeps",
  "isAtTypes",
] as unknown) as (keyof RegistryEntryV1)[];

export function isRegistryEntry(x: Partial<RegistryEntryV1>): x is RegistryEntryV1 {
  for (const k of keys) {
    if (typeof x[k] === "undefined") return false;
  }

  return true;
}
