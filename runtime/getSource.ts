import { jsdelivr } from "../utils/constants.ts";
import { path } from "./deps.ts";
import { RegistryEntryV1 } from "./types/registry.ts";

export async function getSource(
  reqUrl: string,
  registryEntry: RegistryEntryV1,
  packageName: string,
  filePath?: string
): Promise<[string, string]> {
  if (typeof filePath === "undefined") {
    return [`export * from "${path.join(reqUrl, registryEntry.entry)}"\n`, registryEntry.entry];
  }

  const fileURL = new URL(path.join(jsdelivr(registryEntry.importType), packageName, filePath)).href;
  const localRewrites = registryEntry.rewrites[fileURL];
  if (!localRewrites) return ["", ""];

  const result = await fetch(fileURL);
  let resultText = await result.text();

  const rewriteKeys = Object.keys(localRewrites).sort().reverse();

  for (const k of rewriteKeys) {
    resultText = resultText.replaceAll(k, localRewrites[k]);
  }

  return [resultText, fileURL];
}
