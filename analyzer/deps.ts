export type { PackageJson } from "https://cdn.dreg.dev/package/type-fest@0.16.0/source/package-json.d.ts";

export * as log from "https://deno.land/std@0.68.0/log/mod.ts";
export { red, green, bold, yellow, blue } from "https://deno.land/std@0.68.0/fmt/colors.ts";
export * as flags from "https://deno.land/std@0.68.0/flags/mod.ts";
export * as path from "https://deno.land/std@0.68.0/path/mod.ts";
const hash = await import("https://deno.land/std@0.68.0/hash/mod.ts");
export { hash };

export { wait } from "https://deno.land/x/wait@0.1.6/mod.ts";
export { Input, Select, Confirm } from "https://deno.land/x/cliffy@v0.14.0/prompt/mod.ts";

export { parse } from "https://jspm.dev/npm:@typescript-eslint/parser@3.10.1";
