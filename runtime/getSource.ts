import { jsdelivr } from "../utils/constants.ts";
import { path } from "./deps.ts";
import { RegistryEntryV1 } from "./types/registry.ts";

export async function getSource(
  registryEntry: RegistryEntryV1,
  packageName: string,
  filePath?: string
): Promise<string> {
  if (!filePath) return "";

  const fileURL = new URL(path.join(jsdelivr(registryEntry.importType), packageName, filePath)).href;
  const localRewrites = registryEntry.localDeps[fileURL];
  if (!localRewrites) return "";

  const result = await fetch(fileURL);
  let resultText = await result.text();

  const rewriteKeys = Object.keys(localRewrites).sort().reverse();

  for (const k of rewriteKeys) {
    resultText = resultText.replaceAll(k, localRewrites[k]);
  }

  return resultText;
}
