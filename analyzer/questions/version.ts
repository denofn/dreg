import { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { jsdelivr } from "../../utils/constants.ts";
import { fetchPj } from "../../utils/fetchPj.ts";
import { ask } from "../ask.ts";
import { path, blue } from "../deps.ts";

export async function askVersion({
  name,
  importType,
}: Pick<RegistryEntryV2, "name" | "importType">): Promise<RegistryEntryV2["version"]> {
  const cdnUrl = jsdelivr(importType);

  if (importType === "gh") {
    // fetch latest tag?
  } else if (importType === "npm") {
    const [, { version: latestNpmVersion }] = await fetchPj(path.join(cdnUrl, name));
    const useLatestNpmVersion =
      (await ask(
        blue(`The latest npm version of ${name} is ${latestNpmVersion}, do you want to use this version? [Y/n]`)
      )) ?? "y";
    if (useLatestNpmVersion.toLowerCase().startsWith("y")) return latestNpmVersion!;
  }

  const askVersion = await ask(
    blue(`What ${importType === "gh" ? "Github tag" : "NPM version"} of ${name} do you want to analyze?`)
  );

  return askVersion;
}
