import { hash, path } from "./deps.ts";
import { getSource } from "./getSource.ts";
import { keys, registry } from "./runtimeRegistry.ts";

const encoder = new TextEncoder();

type Params = {
  package: string;
  org?: string;
  0?: string;
};

export default async (context: any) => {
  const params: Params = context.params;
  const pckge = `${!!params.org ? `@${params.org}/` : ""}${params.package}`;
  const noSource = !params["0"] ?? true;
  const registryEntry = registry[pckge as keyof typeof registry];
  if (!keys.includes(pckge)) context.throw(404);

  const [source, fileURL] = await getSource(context.request.url.pathname, registryEntry, pckge, params["0"]);
  const parsedFileUrl = path.parse(fileURL);
  context.response.body = source;
  context.response.headers.set(
    "content-type",
    `application/${parsedFileUrl.ext.startsWith(".ts") ? "typescript" : "javascript"}; charset=utf-8`
  );

  if (noSource && registryEntry.entry.endsWith(".d.ts")) {
    context.response.headers.set("x-typescript-types", path.join(context.request.url.pathname, registryEntry.entry));
  } else if (noSource && registryEntry.typesEntry!) {
    context.response.headers.set(
      "x-typescript-types",
      path.join(context.request.url.pathname, registryEntry.typesEntry!)
    );
  }

  context.response.headers.set("vary", "Accept-Encoding");
  context.response.headers.set("cross-origin-resource-policy", "cross-origin");
  context.response.headers.set("access-control-allow-origin", "*");
  context.response.headers.set("access-control-expose-headers", "*");
  context.response.headers.set(
    "etag",
    `W/"${encoder.encode(context.response.body).byteLength}-${hash
      .createHash("sha1")
      .update(context.response.body)
      .toString()
      .substring(0, 27)}"`
  );
};
