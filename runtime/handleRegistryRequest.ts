import { hash } from "./deps.ts";
import { getSource } from "./getSource.ts";
import { keys, registry } from "./runtimeRegistry.ts";

const encoder = new TextEncoder();

type Params = {
  package: string;
  filePath?: string;
};

export default async (context: any) => {
  const params: Params = context.params;
  if (!keys.includes(params.package)) context.throw(404);
  if (keys.includes(params.package)) {
    const source = await getSource(registry[params.package as keyof typeof registry], params.package, params.filePath);

    context.response.body = source;

    context.response.headers = new Headers({
      "content-type": "application/typescript; charset=utf-8",
      vary: "Accept-Encoding",
      "cross-origin-resource-policy": "cross-origin",
      "access-control-allow-origin": "*",
      "access-control-expose-headers": "*",
      etag: `W/"${encoder.encode(context.response.body).byteLength}-${hash
        .createHash("sha1")
        .update(context.response.body)
        .toString()
        .substring(0, 27)}"`,
    });
  } else {
    context.throw(404);
  }
};
