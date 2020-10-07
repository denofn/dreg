import { encodeDepValue } from "../utils/encodeDepValue.ts";
import { esmSyntaxType } from "../utils/esmSyntaxNodes.ts";
import { checkForCjsSyntax } from "./checkForCjsSyntax.ts";
import { determineFullModuleName } from "./determineFullModuleName.ts";
import { resolveLocalImport } from "./resolveLocalImport.ts";

export async function scanTokens(
  entryPath: string,
  tokens: Record<string, any>[],
  deps: Record<string, string>,
) {
  let rewrites: Record<string, string> = {};
  const usedDeps: string[] = [];
  let hasDefaultExport = undefined;

  for (const node of tokens) {
    const syntaxType = esmSyntaxType(node.type);
    if (!syntaxType) checkForCjsSyntax(node);

    // import require
    if (syntaxType === "importEquals") {
      const { value: sourceValue, raw } = node.moduleReference.expression;
      const rewrite = await resolveLocalImport({
        sourceValue,
        q: raw[0],
        entryPath,
        source: `dregImportEquals:${raw}`,
      });

      rewrites = { ...rewrites, ...rewrite };

      continue;
    }

    // export default
    if (node.type === "ExportDefaultDeclaration") hasDefaultExport = true;

    // export assignment
    if (esmSyntaxType(node.type) === "exportAssignment") {
      rewrites[`dregExportAssignment:${node.expression.name}`] = "";
      hasDefaultExport = true;
      continue;
    }

    // esm
    if (node?.exportKind !== "value" && node?.importKind !== "value") continue;
    if (
      node?.specifiers?.[0]?.exported?.type === "Identifier" &&
      node?.specifiers?.[0]?.exported?.name === "default"
    ) {
      hasDefaultExport = true;
    }

    const source: string | undefined = node.source?.raw;
    const sourceValue: string | undefined = node.source?.value;

    if (!sourceValue) continue;

    const q = source![0];

    if (!sourceValue[0].startsWith(".")) {
      const resolvedSource = determineFullModuleName(deps, sourceValue);
      rewrites[source!] = encodeDepValue(q, resolvedSource);
      continue;
    }

    const rewrite = await resolveLocalImport({
      entryPath,
      q,
      source,
      sourceValue,
    });

    rewrites = { ...rewrites, ...rewrite };
  }

  return {
    rewrites,
    usedDeps,
    hasDefaultExport,
  };
}
