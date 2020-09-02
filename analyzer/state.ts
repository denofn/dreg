import { RegistryEntryV2 } from "../runtime/types/registry.ts";
import { hash } from "./deps.ts";

export class StateObject {
  #depMap: Record<string, string>;
  #entry: Partial<RegistryEntryV2>;

  constructor(entry: Partial<RegistryEntryV2> = {}, depMap: Record<string, string> = {}) {
    this.#entry = entry;
    this.#depMap = depMap;
  }

  get entry(): Partial<RegistryEntryV2> {
    return this.#entry;
  }

  get depMap(): Record<string, string> {
    return this.#depMap;
  }

  public updateDepMap(newDepMap: Record<string, string>) {
    this.#depMap = { ...this.#depMap, ...newDepMap };
  }

  public updateEntry(newEntry: Partial<RegistryEntryV2>) {
    this.#entry = { ...this.#entry, ...newEntry };
  }
}

function createHash(name: string): string {
  const h = hash.createHash("sha256").update(name).toString();
  return h;
}

const state: Record<string, StateObject> = {};
export function useState(name: string, entry?: Partial<RegistryEntryV2>, depMap?: Record<string, string>) {
  const h = createHash(name);
  state[h] = new StateObject(entry, depMap);
  return state[h];
}

export function getState(name: string) {
  const h = createHash(name);
  return state[h];
}

export function setState(name: string, stateObj: StateObject) {
  const h = createHash(name);
  state[h] = stateObj;
}
