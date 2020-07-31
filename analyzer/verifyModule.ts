import { tokenize } from "../deps.ts";
import { Format } from "./strategies.ts";

function assumeFormatFromExtension(path: string): Format | undefined {
  if (path.endsWith(".ts") || path.endsWith(".tsx")) return "module";
  return;
}

export async function verifyModule(path: string): Promise<boolean> {
  const _f = assumeFormatFromExtension(path);

  if (_f) return _f === "module";

  const codeReq = await fetch(path);
  const code = await codeReq.text();
  const tokens = tokenize(code);

  if (tokens.includes({ type: "Keyword", value: "import" }) || tokens.includes({ type: "Keyword", value: "export" }))
    return true;

  return false;
}
