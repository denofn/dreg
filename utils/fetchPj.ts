import { path } from "./deps.ts";
import type { PackageJson } from "./deps.ts";
import type { RegistryEntryV2 } from "../runtime/types/registry.ts";
import { jsdelivr, jspm } from "./constants.ts";

export function buildPjUrl(entry: Partial<RegistryEntryV2>): string {
  if (!entry.importType) throw new Error("Couldn't find entry importType");
  if (!entry.version) throw new Error("Couldn't find entry version");
  if (entry.importType === "npm" && entry.importStrategy === "jspm") {
    // TODO: do jspm npm
    return new URL(jspm).href;
  } else if (entry.importType === "npm") {
    // TODO: do jsdelivr npm
    return new URL(jsdelivr("npm")).href;
  }

  if (entry.importStrategy === "jspm") {
    throw new Error("Unable to fetch Github source code from JSPM!");
  }

  if (!entry.ghInfo?.user || !entry.ghInfo?.repo) {
    throw new Error("Not enough info in entry ghInfo!");
  }

  const u = new URL(jsdelivr("gh"));
  u.pathname = path.join(
    u.pathname,
    entry.ghInfo?.user,
    `${entry.ghInfo?.repo}@${entry.version}`,
    entry.ghInfo?.packageJsonLocation ?? "package.json",
  );

  return u.href;
}

export async function fetchPj(url: string): Promise<PackageJson> {
  const result = await fetch(url);
  return result.json();
}
