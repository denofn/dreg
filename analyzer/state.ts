import { defaultOption, parseAskFlags } from "./parseAskFlags.ts";
import { effector, hash } from "./deps.ts"; // TODO: use hash?

import type { RegistryEntryV2 } from "../runtime/types/registry.ts";

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
export const loadPartial = effector.createEvent();
export const loadDepMap = effector.createEvent();
export const updateDepMap = effector.createEvent();
export const updateEntryMap = effector.createEvent();
export const updateEntryValue = effector.createEvent();

export const state = effector
  .createStore({} as Record<string, StateEntry>)
  .on(
    bootstrapPackage,
    (state, payload) => {
      return {
        ...state,
        [getStateKey(payload.entry)]: payload,
      };
    },
  );

export const setOptions = effector.createEvent<
  { askPartial?: string; askRetry?: string }
>();
export const options = effector.createStore({
  askPartial: defaultOption,
  askRetry: defaultOption,
}).on(setOptions, (state, { askPartial, askRetry }) => ({
  ...state,
  askPartial: parseAskFlags(askPartial),
  askRetry: parseAskFlags(askRetry),
}));
