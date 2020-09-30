import { hash } from "./deps.ts";

const encoder = new TextEncoder();

type Params = {
  package: string;
  org?: string;
  0?: string;
};

const availablePolyfills = [
  "path.ts",
  "process.ts",
  "supports-color.ts",
  "chalk.ts",
  "fs.ts",
];

export default async (context: any) => {
  const params: Params = context.params;
  const pckge = params.package;
  if (!availablePolyfills.includes(pckge)) context.throw(404);

  const source = await Deno.readTextFile(`./polyfill/${pckge}`);

  context.response.body = source;
  context.response.headers.set(
    "content-type",
    "application/typescript; charset=utf-8",
  );
  context.response.headers.set("vary", "Accept-Encoding");
  context.response.headers.set("cross-origin-resource-policy", "cross-origin");
  context.response.headers.set("access-control-allow-origin", "*");
  context.response.headers.set("access-control-expose-headers", "*");
  context.response.headers.set(
    "etag",
    `W/"${encoder.encode(context.response.body).byteLength}-${
      hash
        .createHash("sha1")
        .update(context.response.body)
        .toString()
        .substring(0, 27)
    }"`,
  );
};
