import { determineLocalDepExtension } from "../utils/determineLocalDepExtension.ts";
import { encodeDepValue } from "../utils/encodeDepValue.ts";

type ResolveProps = {
  entryPath: string;
  q: string;
  sourceValue?: string;
  source?: string;
};

export async function resolveLocalImport(
  { entryPath, source, sourceValue, q }: ResolveProps,
): Promise<{ [K: string]: string }> {
  let resolvedSource = await determineLocalDepExtension(
    entryPath,
    sourceValue!,
  );

  resolvedSource = resolvedSource.startsWith("./npm:")
    ? resolvedSource.replace("./npm:", "/package/")
    : resolvedSource;

  const encodedDep = encodeDepValue(q, resolvedSource);

  return { [source!]: encodedDep };
}
