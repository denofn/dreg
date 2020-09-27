import { path } from "./deps.ts";
import { jsdelivr } from "./constants.ts";
import { fetchPj } from "./fetchPj.ts";

const VERSION_REGEXP = /^\d+.\d+.\d+$/;

export async function resolveDependencyMap(
  raw: Record<string, string>,
): Promise<Record<string, string>> {
  const jsdelivrSrc = jsdelivr("npm");
  const final: Record<string, string> = {};

  for (const name in raw) {
    const version = raw[name];
    if (VERSION_REGEXP.test(version)) {
      final[name] = version;
    }
    const [_, pj] = await fetchPj(
      path.join(jsdelivrSrc, `${name}${version ? `@${version}` : ""}`),
    );
    if (!pj.version) {
      throw new Error(
        `${name} @ ${version} is missing version in resolved package.json`,
      );
    }
    final[name] = pj.version;
  }

  return final;
}
