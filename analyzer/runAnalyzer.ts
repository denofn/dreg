import { buildPjUrl, fetchPj } from "../utils/fetchPj.ts";
import { state } from "./state.ts";

export async function runAnalyzer(stateKey: string): Promise<void> {
  const packageState = state.getState()[stateKey];

  const pjUrl = buildPjUrl(packageState.entry);
  const pj = await fetchPj(pjUrl);
  // TODO: update depmap

  // TODO: get full entrypath (needs pj for npm if not manually defined)

  // TODO: recursively run through files

  // TODO: spawn analyzer of depmap
}
