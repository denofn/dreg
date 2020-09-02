import { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { ask } from "../ask.ts";
import { blue } from "../deps.ts";

export async function askGhInfo({
  name,
  ghInfo: _ghInfo,
}: Pick<RegistryEntryV2, "name" | "ghInfo">): Promise<RegistryEntryV2["ghInfo"]> {
  const user = _ghInfo?.user ?? (await ask(blue(`What is the Github user/organization hosting ${name}?`)));

  let repo = _ghInfo?.repo ?? (await ask(blue(`What is the repo name of ${name}? [leave blank for ${name}]`)));
  if (repo === "") repo = name;

  let entryFile = _ghInfo?.entryFile ?? (await ask(blue(`At what path is the entry file located?`)));

  let packageJsonLocation: string | undefined =
    _ghInfo?.packageJsonLocation ??
    (await ask(blue(`At what path is the package.json located? [leave blank for root]`)));
  if (packageJsonLocation === "") packageJsonLocation = undefined;

  return { user, repo, packageJsonLocation, entryFile };
}
