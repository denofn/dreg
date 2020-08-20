import type { PackageJson } from "./deps.ts";

export function getDependencyMap(pj: PackageJson): Record<string, string> {
  const depMap: Record<string, string> = {};
  const deps = pj.dependencies ?? {};
  const devDeps = pj.devDependencies ?? {};

  for (const dep in deps) {
    const v = deps[dep];
    depMap[dep] = v.startsWith("~") || v.startsWith("^") ? v.substr(1) : v;
  }

  for (const dep in devDeps) {
    if (!depMap[dep]) {
      const v = devDeps[dep];
      depMap[dep] = v.startsWith("~") || v.startsWith("^") ? v.substr(1) : v;
    }
  }

  return depMap;
}
