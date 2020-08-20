import { parse, path, blue } from "./deps.ts";
import { Rewrites } from "../runtime/types/registry.ts";
import { keys } from "../runtime/runtimeRegistry.ts";
import { determineLocalDepExtension } from "../utils/determineLocalDepExtension.ts";
import { esmSyntaxType } from "../utils/esmSyntaxNodes.ts";
import { getSpinner } from "./spinner.ts";

function encodeDepValue(q: string, dep: string): string {
  return `${q}${dep}${q}`;
}

function calculateFullModuleName(depMap: Record<string, string>, sourceValue: string) {
  let fullName;

  if (!!depMap[sourceValue]) fullName = sourceValue;
  else if (!!depMap[`@types/${sourceValue}`]) fullName = `@types/${sourceValue}`;
  else throw new Error();

  const depName = `${fullName}@${depMap[fullName!]}`;

  if (!keys.includes(depName)) throw new Error();

  return `/package/${depName}`;
}

export async function diveFile(filePath: string, depMap: Record<string, string>): Promise<Rewrites> {
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
    if (esmSyntaxType(node.type) !== "export" && esmSyntaxType(node.type) !== "import") continue;
    if (node?.exportKind !== "value" && node?.importKind !== "value") continue;

    const source: string | undefined = node.source?.raw;
    const sourceValue: string | undefined = node.source?.value;

    if (!sourceValue) continue;

    const q = source![0];

    if (!sourceValue[0].startsWith(".")) {
      const resolvedSource = calculateFullModuleName(depMap, sourceValue);
      (rewrites as Record<string, Record<string, string>>)[filePath][source!] = encodeDepValue(q, resolvedSource);
    } else {
      const resolvedSource = await determineLocalDepExtension(filePath, sourceValue!);
      (rewrites as Record<string, Record<string, string>>)[filePath][source!] = encodeDepValue(q, resolvedSource);

      const resolvedUrl = new URL(filePath);
      resolvedUrl.pathname = path.join(path.parse(resolvedUrl.pathname).dir, resolvedSource);

      const resolvedDive = await diveFile(resolvedUrl.href, depMap);

      rewrites = {
        ...rewrites,
        ...resolvedDive,
      };
    }
  }

  return rewrites;
}
