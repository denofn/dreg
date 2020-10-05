import type { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { jsdelivr } from "../../utils/constants.ts";
import { fetchPj } from "../../utils/fetchPj.ts";
import { blue, Confirm, Input, path, wait } from "../deps.ts";

export async function askVersion({
  name,
  importType,
}: Pick<RegistryEntryV2, "name" | "importType">): Promise<
  RegistryEntryV2["version"]
> {
  const cdnUrl = jsdelivr(importType);

  if (importType === "gh") {
    // fetch latest tag?
  } else if (importType === "npm") {
    const spinner = wait(`Fetching latest version of ${name}`).start();
    const [, { version: latestNpmVersion }] = await fetchPj(
      path.join(cdnUrl, name),
    );
    spinner.stop();
    const useLatestNpmVersion = await Confirm.prompt({
      message: blue(
        `The latest npm version of ${name} is ${latestNpmVersion}, do you want to use this version?`,
      ),
      default: true,
    });
    if (useLatestNpmVersion) return latestNpmVersion!;
  }

  const askVersion = await Input.prompt(
    blue(
      `What ${
        importType === "gh" ? "Github tag" : "NPM version"
      } of ${name} do you want to analyze?`,
    ),
  );

  return askVersion;
}
