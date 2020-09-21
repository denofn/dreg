import type { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { blue, Input } from "../deps.ts";

export async function askGhInfo({
  name,
  ghInfo: _ghInfo,
}: Pick<RegistryEntryV2, "name" | "ghInfo">): Promise<
  RegistryEntryV2["ghInfo"]
> {
  const user = _ghInfo?.user ??
    (await Input.prompt(
      blue(`What is the Github user/organization hosting ${name}?`),
    ));

  let repo = _ghInfo?.repo ??
    (await Input.prompt({
      message: blue(`What is the repo name of ${name}?`),
      default: name,
    }));
  if (repo === "") repo = name;

  let entryFile = _ghInfo?.entryFile ??
    (await Input.prompt(blue(`At what path is the entry file located?`)));

  let packageJsonLocation: string | undefined = _ghInfo?.packageJsonLocation ??
    (await Input.prompt({
      message: blue(
        `At what path is the package.json located?`,
      ),
      default: ".",
    }));
  if (packageJsonLocation === "") packageJsonLocation = undefined;

  return { user, repo, packageJsonLocation, entryFile };
}
