import { parse, path, blue } from "./deps.ts";
import { Rewrites } from "../runtime/types/registry.ts";
import { determineLocalDepExtension } from "../utils/determineLocalDepExtension.ts";
import { determineFullModuleName } from "./determineFullModuleName.ts";
import { esmSyntaxType } from "../utils/esmSyntaxNodes.ts";
import { getSpinner } from "./spinner.ts";

function encodeDepValue(q: string, dep: string): string {
  return `${q}${dep}${q}`;
}

export async function diveFile(filePath: string, depMap: Record<string, string>): Promise<[Rewrites, boolean]> {
  let hasDefaultExport = false;

  await getSpinner().setText(blue(`Checking: ${filePath}`));

  let rewrites: Rewrites = {
    [filePath]: {},
  };

  const fetchFileResult = await fetch(filePath);
  const file = await fetchFileResult.text();

  const { body: parsedFileBody } = parse(file, {
    sourceType: "module",
    range: true,
  });

  for (const node of parsedFileBody) {
    if (!esmSyntaxType(node.type)) checkForCjsSyntax(node);

    // import require
    if (esmSyntaxType(node.type) === "importEquals") {
      const { value: sourceValue, raw } = node.moduleReference.expression;
      const resolvedNode = await resolveDive({
        rewrites,
        depMap,
        q: raw[0],
        source: `dregImportEquals:${raw}`,
        filePath,
        sourceValue,
      });

      rewrites = {
        ...rewrites,
        ...resolvedNode,
      };

      continue;
    }

    // export default
    if (node.type === "ExportDefaultDeclaration") hasDefaultExport = true;

    // export assignment
    if (esmSyntaxType(node.type) === "exportAssignment") {
      rewrites[filePath][`dregExportAssignment:${node.expression.name}`] = "";
      hasDefaultExport = true;
      continue;
    }

    // esm
    if (node?.exportKind !== "value" && node?.importKind !== "value") continue;
    if (node?.specifiers?.[0]?.exported?.type === "Identifier" && node?.specifiers?.[0]?.exported?.name === "default")
      hasDefaultExport = true;

    const source: string | undefined = node.source?.raw;
    const sourceValue: string | undefined = node.source?.value;

    if (!sourceValue) continue;

    const q = source![0];
    const resolvedEsmNode = await handleEsmSyntaxDeps({ rewrites, depMap, sourceValue, filePath, source: source!, q });

    rewrites = {
      ...rewrites,
      ...resolvedEsmNode,
    };
  }

  return [rewrites, hasDefaultExport];
}

async function handleEsmSyntaxDeps({
  rewrites,
  depMap,
  sourceValue,
  filePath,
  source,
  q,
}: {
  rewrites: Rewrites;
  depMap: Record<string, string>;
  sourceValue: string;
  filePath: string;
  source: string;
  q: string;
}): Promise<Rewrites> {
  if (!sourceValue[0].startsWith(".")) {
    const resolvedSource = determineFullModuleName(depMap, sourceValue);
    rewrites[filePath][source!] = encodeDepValue(q, resolvedSource);
    return rewrites;
  }

  return resolveDive({ rewrites, depMap, sourceValue, filePath, source, q });
}

async function resolveDive({
  rewrites,
  depMap,
  sourceValue,
  filePath,
  source,
  q,
}: {
  rewrites: Rewrites;
  depMap: Record<string, string>;
  sourceValue: string;
  filePath: string;
  source: string;
  q: string;
}) {
  const _resolvedSource = await determineLocalDepExtension(filePath, sourceValue!);
  const resolvedSource = _resolvedSource.startsWith("./npm:")
    ? _resolvedSource.replace("./npm:", "/package/")
    : _resolvedSource;
  rewrites[filePath][source!] = encodeDepValue(q, resolvedSource);

  const resolvedUrl = new URL(filePath);
  resolvedUrl.pathname = path.join(path.parse(resolvedUrl.pathname).dir, _resolvedSource);

  const [resolvedDive] = await diveFile(resolvedUrl.href, depMap);

  rewrites = {
    ...rewrites,
    ...resolvedDive,
  };

  return rewrites;
}

function checkForCjsSyntax(node: Record<string, any>): void {
  const cjsErr = "CJS syntax detected, quitting";

  if (node.type !== "ExpressionStatement" || node.expression.type !== "AssignmentExpression") return;

  const { left, right } = node.expression;

  if (left.type === "MemberExpression" && left.object.type === "Identifier" && left.object.name === "module")
    throw new Error(cjsErr);
  if (right.type === "CallExpression" && right.callee.type === "Identifier" && left.callee.name === "require")
    throw new Error(cjsErr);
}
