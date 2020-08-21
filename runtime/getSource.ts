import { jsdelivr, jspm } from "../utils/constants.ts";
import { replaceExportAssignment } from "../utils/replaceExportAssignment.ts";
import { replaceImportEqualsDecl } from "../utils/replaceImportEqualsDecl.ts";
import { path } from "./deps.ts";
import { RegistryEntryV1 } from "./types/registry.ts";

const importEquals = "dregImportEquals:";
const exportAssignment = "dregExportAssignment:";

export async function getSource(
  reqUrl: string,
  registryEntry: RegistryEntryV1,
  packageName: string,
  filePath?: string
): Promise<[string, string]> {
  switch (registryEntry.importStrategy) {
    case "jsdelivr":
      return getJsdelivrSource(reqUrl, registryEntry, packageName, filePath);
    case "jspm":
      return getJspmSource(registryEntry, packageName, filePath);
  }
}

export async function getJspmSource(
  registryEntry: RegistryEntryV1,
  packageName: string,
  filePath?: string
): Promise<[string, string]> {
  let fileURL = "";

  if (typeof filePath === "undefined") {
    fileURL = registryEntry.entry;
  } else {
    fileURL = new URL(path.join(`${jspm}${packageName}`, filePath)).href;
  }

  const localRewrites = registryEntry.rewrites[fileURL];
  if (!localRewrites) return ["", ""];

  const result = await fetch(fileURL);
  let resultText = await result.text();

  const rewriteKeys = Object.keys(localRewrites).sort().reverse();

  for (const k of rewriteKeys) {
    if (k.startsWith(importEquals)) {
      resultText = replaceImportEqualsDecl(resultText, k.substr(importEquals.length), localRewrites[k]);
    } else if (k.startsWith(exportAssignment)) {
      resultText = replaceExportAssignment(resultText, k.substr(exportAssignment.length));
    } else resultText = resultText.replaceAll(k, localRewrites[k]);
  }

  return [resultText, fileURL];
}

export async function getJsdelivrSource(
  reqUrl: string,
  registryEntry: RegistryEntryV1,
  packageName: string,
  filePath?: string
): Promise<[string, string]> {
  if (typeof filePath === "undefined") {
    return [
      `export * from "${path.join(reqUrl, registryEntry.entry)}";\n${
        registryEntry.hasDefaultExport ? `export { default } from "${path.join(reqUrl, registryEntry.entry)}";` : ""
      }`,
      registryEntry.entry,
    ];
  }

  const fileURL = new URL(path.join(jsdelivr(registryEntry.importType), packageName, filePath)).href;
  const localRewrites = registryEntry.rewrites[fileURL];
  if (!localRewrites) return ["", ""];

  const result = await fetch(fileURL);
  let resultText = await result.text();

  const rewriteKeys = Object.keys(localRewrites).sort().reverse();

  for (const k of rewriteKeys) {
    if (k.startsWith(importEquals)) {
      resultText = replaceImportEqualsDecl(resultText, k.substr(importEquals.length), localRewrites[k]);
    } else if (k.startsWith(exportAssignment)) {
      resultText = replaceExportAssignment(resultText, k.substr(exportAssignment.length));
    } else resultText = resultText.replaceAll(k, localRewrites[k]);
  }

  return [resultText, fileURL];
}
