import { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { jsdelivr } from "../../utils/constants.ts";
import { fetchPj } from "../../utils/fetchPj.ts";
import { path, blue, Input, Confirm } from "../deps.ts";

export async function askVersion({
  name,
  importType,
}: Pick<RegistryEntryV2, "name" | "importType">): Promise<RegistryEntryV2["version"]> {
  const cdnUrl = jsdelivr(importType);

  if (importType === "gh") {
    // fetch latest tag?
  } else if (importType === "npm") {
    const [, { version: latestNpmVersion }] = await fetchPj(path.join(cdnUrl, name));
    const useLatestNpmVersion = await Confirm.prompt(
      blue(`The latest npm version of ${name} is ${latestNpmVersion}, do you want to use this version?`)
    );
    if (useLatestNpmVersion) return latestNpmVersion!;
  }

  const askVersion = await Input.prompt(
    blue(`What ${importType === "gh" ? "Github tag" : "NPM version"} of ${name} do you want to analyze?`)
  );

  return askVersion;
}
