import { spinner } from "./spinner.ts";
import { state, updateRewrites } from "./state.ts";

export async function dive(
  stateKey: string,
  entryPath: string,
  _usedDeps: string[] = [],
): Promise<string[]> {
  const packageState = state.getState()[stateKey];
  console.log(packageState);
  if (!!packageState.rewrites?.[entryPath]) return _usedDeps; // bail if already exists

  spinner.text = `Diving file ${entryPath}`;
  spinner.start();

  const rewrites = {};
  let usedDeps: string[] = _usedDeps;
  updateRewrites({ key: stateKey, value: { [entryPath]: rewrites } });

  spinner.succeed(`Finished analyzing ${entryPath}`);
  return usedDeps;
}
