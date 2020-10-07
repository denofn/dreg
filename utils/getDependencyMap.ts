import type { PackageJson } from "./deps.ts";

export function getDeps(
  pj: PackageJson,
  deps: Record<string, string> = {},
): Record<string, string> {
  const pjDevDeps = pj.devDependencies ?? {};
  const pjDeps = pj.dependencies ?? {};

  return {
    ...pjDevDeps,
    ...pjDeps,
    ...deps,
  };
}

export function _getDependencyMap(pj: PackageJson): Record<string, string> {
  const depMap: Record<string, string> = {};
  const deps = pj.dependencies ?? {};
  const devDeps = pj.devDependencies ?? {};

  for (const dep in deps) {
    const v = deps[dep];
    depMap[dep] = v;
  }

  for (const dep in devDeps) {
    if (!depMap[dep]) {
      const v = devDeps[dep];
      depMap[dep] = v;
    }
  }

  return depMap;
}
