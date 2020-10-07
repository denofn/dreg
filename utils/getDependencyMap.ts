import { semver } from "./deps.ts";
import type { PackageJson } from "./deps.ts";

export function getDeps(
  pj: PackageJson,
  deps: Record<string, string> = {},
): Record<string, string> {
  const pjDevDeps = pj.devDependencies ?? {};
  const pjDeps = pj.dependencies ?? {};

  for (const dep in pjDevDeps) {
    if (!semver.validRange(pjDevDeps[dep])) {
      throw new Error(
        `${dep}@${
          pjDevDeps[dep]
        } is not a valid dependency [from ${pj.name} devDependencies]`,
      );
    }
  }

  for (const dep in pjDeps) {
    if (!semver.validRange(pjDeps[dep])) {
      throw new Error(
        `${dep}@${
          pjDeps[dep]
        } is not a valid dependency [from ${pj.name} dependencies]`,
      );
    }
  }

  for (const dep in deps) {
    if (!semver.validRange(deps[dep])) {
      throw new Error(
        `${dep}@${
          deps[dep]
        } is not a valid dependency [from partial entry deps]`,
      );
    }
  }

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
