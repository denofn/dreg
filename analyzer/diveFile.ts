import { parse, path, blue } from "./deps.ts";
import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { determineLocalDepExtension } from "../utils/determineLocalDepExtension.ts";
import { esmSyntaxType } from "../utils/esmSyntaxNodes.ts";
import { getSpinner } from "./spinner.ts";

type DiveResult = Partial<Pick<RegistryEntryV1, "npmDeps" | "nativeDeps" | "localDeps">>;

export async function diveFile(filePath: string, depMap: Record<string, string>): Promise<DiveResult> {
  await getSpinner().setText(blue(`Checking: ${filePath}`));

  const diveResult: DiveResult = {
    npmDeps: {},
    nativeDeps: [],
    localDeps: {
      [filePath]: {},
    },
  };

  const fetchFileResult = await fetch(filePath);
  const file = await fetchFileResult.text();

  const { body: parsedFileBody } = parse(file, {
    sourceType: "module",
  });

  for (const node of parsedFileBody) {
    if (esmSyntaxType(node.type) !== "export" && esmSyntaxType(node.type) !== "import") continue;
    if (node?.exportKind !== "value" && node?.importKind !== "value") continue;

    const source: string | undefined = node.source?.value;

    if (!source) continue;
    if (!source.startsWith(".")) continue;
    else {
      const resolvedSource = await determineLocalDepExtension(filePath, source);
      (diveResult.localDeps as Record<string, Record<string, string>>)[filePath][source] = resolvedSource;

      const resolvedUrl = new URL(filePath);
      resolvedUrl.pathname = path.join(path.parse(resolvedUrl.pathname).dir, resolvedSource);

      const resolvedDive = await diveFile(resolvedUrl.href, depMap);

      diveResult.localDeps = {
        ...diveResult.localDeps,
        ...resolvedDive.localDeps,
      };

      diveResult.npmDeps = {
        ...diveResult.npmDeps,
        ...resolvedDive.npmDeps,
      };

      diveResult.nativeDeps = [...diveResult.nativeDeps!, ...resolvedDive.nativeDeps!];
    }
  }

  return diveResult;
}
