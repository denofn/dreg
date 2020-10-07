import { buildPjUrl, fetchPj } from "../utils/fetchPj.ts";
import { getDeps } from "../utils/getDependencyMap.ts";
import { getEntryPath } from "../utils/getEntryPath.ts";
import { shallowEquals } from "../utils/shallowEquals.ts";
import { dive } from "./dive.ts";
import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { spinner } from "./spinner.ts";
import { state, /*cleanDeps, */ updateDeps } from "./state.ts";

export async function runAnalyzer(stateKey: string): Promise<void> {
  spinner.text = `Initializing analyzer run for ${stateKey}`;
  spinner.start();

  const packageState = state.getState()[stateKey];

  const pjUrl = buildPjUrl(packageState);

  spinner.text = `Fetching package.json for ${stateKey}`;
  const pj = await fetchPj(pjUrl);

  const deps = getDeps(pj, packageState.deps);

  if (!shallowEquals(deps, packageState.deps ?? {})) {
    spinner.text = `Updating deps for ${stateKey}`;
    updateDeps({ key: stateKey, value: deps });

    spinner.succeed(`Updated deps for ${stateKey}`);
    await askGeneratePartialEntry();
  }

  const entryPath = getEntryPath(packageState, pj);
  spinner.succeed(`Entry path for ${stateKey} is ${entryPath}`);

  const usedDeps = await dive(stateKey, entryPath);

  // TODO: cleanDeps({ key: stateKey, value: usedDeps });
  // await askGeneratePartialEntry();

  // TODO: await diveDeps(stateKey, usedDeps);

  await askGeneratePartialEntry({ finished: true });
}
