import { buildPjUrl, fetchPj } from "../utils/fetchPj.ts";
import { getDeps } from "../utils/getDependencyMap.ts";
import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { spinner } from "./spinner.ts";
import { state, updateDeps } from "./state.ts";

export async function runAnalyzer(stateKey: string): Promise<void> {
  spinner.text = `Initializing analyzer run for ${stateKey}`;
  spinner.start();

  const packageState = state.getState()[stateKey];

  const pjUrl = buildPjUrl(packageState);

  spinner.text = `Fetching package.json for ${stateKey}`;
  const pj = await fetchPj(pjUrl);

  const deps = getDeps(pj, packageState.deps);

  // TODO: only do this if deps and packageState.deps are different
  spinner.text = `Updating deps for ${stateKey}`;
  updateDeps({ key: stateKey, value: deps });

  spinner.stopAndPersist({
    text: `Updated deps for ${stateKey}`,
  });

  await askGeneratePartialEntry();
}

// TODO: get full entrypath (needs pj for npm if not manually defined)

// TODO: recursively run through files

// TODO: spawn analyzer of depmap
