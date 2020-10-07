import { defaultOption, parseAskFlags } from "./parseAskFlags.ts";
import { effector } from "./deps.ts";

import type { RegistryEntryV2, Rewrites } from "../runtime/types/registry.ts";

export function getStateKey(entry: Partial<RegistryEntryV2>): string {
  if (!entry.name || !entry.version) {
    throw new Error("No name or version found");
  }
  return `${entry.name}@${entry.version}`;
}

export const bootstrapState = effector.createEvent<
  Record<string, Partial<RegistryEntryV2>>
>();
export const bootstrapPackage = effector.createEvent<
  Partial<RegistryEntryV2>
>();
export const updateEntry = effector.createEvent<{
  // key = stateKey
  key: string;
  value: Partial<RegistryEntryV2>;
}>();
export const updateDeps = effector.createEvent<{
  // key = stateKey
  key: string;
  value: Record<string, string>;
}>();
export const updateRewrites = effector.createEvent<{
  key: string;
  value: Rewrites;
}>();
export const cleanDeps = effector.createEvent();

export const state = effector
  .createStore({} as Record<string, Partial<RegistryEntryV2>>)
  .on(bootstrapState, (_, payload) => payload)
  .on(
    bootstrapPackage,
    (state, payload) => {
      ({
        ...state,
        [getStateKey(payload)]: payload,
      });
    },
  )
  .on(updateEntry, (state, { key, value }) => ({
    ...state,
    [key]: {
      ...(state[key]),
      ...value,
    },
  }))
  .on(updateDeps, (state, { key, value }) => ({
    ...state,
    [key]: {
      ...(state[key]),
      deps: {
        ...(state[key].deps ?? {}),
        ...value,
      },
    },
  }))
  .on(updateRewrites, (state, { key, value }) => ({
    ...state,
    [key]: {
      ...(state[key]),
      rewrites: {
        ...(state[key].rewrites ?? {}),
        ...value,
      },
    },
  }));

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
