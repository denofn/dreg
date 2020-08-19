import { typefest } from "../deps.ts";

export function getDependencyMap(pj: typefest.PackageJson): Record<string, string> {
  const depMap: Record<string, string> = {};
  const deps = pj.dependencies ?? {};
  // types can live in devDependencies in some projects
  const devDeps = pj.devDependencies ?? {};

  for (const dep in deps) {
    depMap[dep] = deps[dep];
  }

  for (const dep in devDeps) {
    if (!depMap[dep]) depMap[dep] = devDeps[dep];
  }

  return depMap;
}
