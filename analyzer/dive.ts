import { parse } from "./deps.ts";
import { getReferences } from "./getReferences.ts";
import { scanTokens } from "./scanTokens.ts";
import { spinner } from "./spinner.ts";
import { state, updateEntry, updateRewrites } from "./state.ts";

export async function dive(
  stateKey: string,
  entryPath: string,
  _usedDeps: string[] = [],
): Promise<string[]> {
  const packageState = state.getState()[stateKey];
  if (!!packageState.rewrites?.[entryPath]) {
    // TODO: dive imports (not deps)
    console.log(Object.entries(packageState.rewrites[entryPath]));

    return _usedDeps;
  } else {
    spinner.text = `Diving file ${entryPath}`;
    spinner.start();

    const file = await (await fetch(entryPath)).text();
    const { body: parsedFileBody, comments: parsedFileComments } = parse(file);

    const { rewrites, usedDeps, hasDefaultExport } = await scanTokens(
      entryPath,
      [...getReferences(parsedFileComments), ...parsedFileBody],
      packageState.deps ?? {},
    );

    updateRewrites({ key: stateKey, value: { [entryPath]: rewrites } });
    if (!packageState.hasDefaultExport && !!hasDefaultExport) {
      updateEntry({ key: stateKey, value: { hasDefaultExport } });
    }

    spinner.succeed(`Finished analyzing ${entryPath}`);

    // TODO: dive imports (not deps)
    console.log(Object.entries(rewrites));

    return [..._usedDeps, ...usedDeps];
  }
}
