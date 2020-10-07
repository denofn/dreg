import { buildPjUrl, fetchPj } from "../utils/fetchPj.ts";
import { getDeps } from "../utils/getDependencyMap.ts";
import { getEntryPath } from "../utils/getEntryPath.ts";
import { shallowEquals } from "../utils/shallowEquals.ts";
import { dive } from "./dive.ts";
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

  if (!shallowEquals(deps, packageState.deps ?? {})) {
    spinner.text = `Updating deps for ${stateKey}`;

    updateDeps({ key: stateKey, value: deps });

    spinner.stopAndPersist({
      text: `Updated deps for ${stateKey}`,
    });

    await askGeneratePartialEntry();
  }

  const entryPath = getEntryPath(packageState, pj);
  spinner.succeed(`Entry path for ${stateKey} is ${entryPath}`);

  dive(stateKey, entryPath);

  await askGeneratePartialEntry();

  // TODO: diveDeps(stateKey);

  // await askGeneratePartialEntry();
}
