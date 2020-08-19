import type { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { isRegistryEntry } from "./isRegistryEntry.ts";

export class RegistryEntryGenerator {
  private _e: Partial<RegistryEntryV1>;
  constructor(e: Partial<RegistryEntryV1>) {
    this._e = e;
  }

  public update = (e: Partial<RegistryEntryV1>): void => {
    this._e = {
      ...this._e,
      ...e,
    };
  };

  get entry(): RegistryEntryV1 | undefined {
    return isRegistryEntry(this._e) ? (this._e as RegistryEntryV1) : undefined;
  }

  get isAtTypes(): boolean | undefined {
    return this._e.isAtTypes;
  }

  get version(): string | undefined {
    return this._e.version ?? undefined;
  }

  get name(): string | undefined {
    return this._e.name;
  }

  get entryFile(): string | undefined {
    return this._e.entry;
  }
}
