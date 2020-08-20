import { path } from "./deps.ts";
import type { PackageJson } from "./deps.ts";

export async function fetchPj(basePath: string): Promise<[string, PackageJson]> {
  const url = new URL(path.join(basePath, "package.json"));
  const result = await fetch(url);
  return [url.href, await result.json()];
}
