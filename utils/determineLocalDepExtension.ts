import { path } from "./deps.ts";

const jsExtensions = [".js", ".es6", ".mjs"];
const jsxExtensions = [".jsx", ".tsx"];

async function doesFileExist(url: string) {
  const { status } = await fetch(url);
  return status === 200;
}

/**
 * 1. Try importers extension first
 *   1.1. Importer is a .d.ts file
 *   1.2. Importer is any other type of js/ts file
 * 2. Try in this order: .ts, .d.ts, jsExtensions, jsxExtensions
 */
export async function determineLocalDepExtension(base: string, importPath: string): Promise<string> {
  const parsedBaseUrl = new URL(base);
  const resolvedBaseUrl = parsedBaseUrl;
  const parsedBasePath = path.parse(parsedBaseUrl.pathname);
  resolvedBaseUrl.pathname = path.join(parsedBasePath.dir, importPath);

  if (!!path.parse(importPath).ext) return importPath;
  if (await doesFileExist(resolvedBaseUrl.href)) return importPath;

  if (
    parsedBasePath.ext === ".ts" &&
    (parsedBasePath.base as string).endsWith(".d.ts") &&
    (await doesFileExist(`${resolvedBaseUrl}.d.ts`))
  )
    return `${importPath}.d.ts`;
  if (jsExtensions.includes(parsedBasePath.ext) && (await doesFileExist(`${resolvedBaseUrl}${parsedBasePath.ext}`)))
    return `${importPath}${parsedBasePath.ext}`;

  if (await doesFileExist(`${resolvedBaseUrl}.js`)) return `${importPath}.js`;

  throw new Error("Could not resolve extension, quitting");
}
// if ((parsedBasePath.base as string).endsWith(".d.ts")) {

// }
// } esle if (jsxExtensions.includes(parsedBasePath.ext)) {
// } else if (jsExtensions.includes(parsedBasePath.ext)) {
// }
