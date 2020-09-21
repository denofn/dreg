import type { RegistryEntryV2 } from "../runtime/types/registry.ts";
import { effector, hash } from "./deps.ts"; // TODO: use hash?

type StateEntry = {
  entry: Partial<RegistryEntryV2>;
  depMap: Record<string, string>;
};

export function getStateKey(entry: Partial<RegistryEntryV2>): string {
  if (!entry.name || !entry.version) {
    throw new Error("No name or version found");
  }
  return `${entry.name}@${entry.version}`;
}

export const bootstrapPackage = effector.createEvent<StateEntry>();
export const updateDepMap = effector.createEvent();
export const updateEntryMap = effector.createEvent();
export const updateEntryValue = effector.createEvent();

export const state = effector
  .createStore({} as Record<string, StateEntry>)
  .on(
    bootstrapPackage,
    (state: Record<string, StateEntry>, payload: StateEntry) => {
      return {
        ...state,
        [getStateKey(payload.entry)]: payload,
      };
    },
  );
