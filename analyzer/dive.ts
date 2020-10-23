import { mergeUnique } from "../utils/mergeUnique.ts";
import { parse, path } from "./deps.ts";
import { getReferences } from "./getReferences.ts";
import { scanTokens } from "./scanTokens.ts";
import { spinner } from "./spinner.ts";
import { state, updateEntry, updateRewrites } from "./state.ts";

export async function dive(
  stateKey: string,
  entryPath: URL,
  _usedDeps: string[] = [],
): Promise<string[]> {
  const packageState = state.getState()[stateKey];

  async function callDive(
    d: string[],
    r: Record<string, string>,
  ): Promise<string[]> {
    // TODO: dive imports (not deps)
    for (const [rewriteKey, rewriteValue] of Object.entries(r)) {
      if (rewriteValue.includes("dregPackageJSONReference")) continue;

      const newPath: URL = new URL("", entryPath);
      newPath.pathname = path.join(
        path.parse(newPath.pathname).dir,
        rewriteValue.substring(1, rewriteValue.length - 1),
      );

      const importeeDeps = await dive(
        stateKey,
        newPath,
        d,
      );
      d = mergeUnique(d, importeeDeps);
    }

    return d;
  }

  if (!!packageState.rewrites?.[entryPath.href]) {
    return callDive(_usedDeps, packageState.rewrites[entryPath.href]);
  } else {
    let deps: string[] = _usedDeps;

    spinner.text = `Diving file ${entryPath}`;
    spinner.start();

    const file = await (await fetch(entryPath)).text();
    const { body: parsedFileBody, comments: parsedFileComments } = parse(file, {
      sourceType: "module",
      range: true,
      comment: true,
    });

    const { rewrites, usedDeps, hasDefaultExport } = await scanTokens(
      entryPath.href,
      [...getReferences(parsedFileComments), ...parsedFileBody],
      packageState.deps ?? {},
    );

    deps = mergeUnique(deps, usedDeps);

    updateRewrites({ key: stateKey, value: { [entryPath.href]: rewrites } });
    if (!packageState.hasDefaultExport && !!hasDefaultExport) {
      updateEntry({ key: stateKey, value: { hasDefaultExport } });
    }

    spinner.succeed(`Finished analyzing ${entryPath.href}`);

    return callDive(deps, rewrites);
  }
}
