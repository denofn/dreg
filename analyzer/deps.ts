// @deno-types="https://cdn.jsdelivr.net/npm/effector@21.3.0/effector.mjs.d.ts"
export * as effector from "https://cdn.jsdelivr.net/npm/effector@21.3.0/effector.mjs";
export { parse } from "https://jspm.dev/npm:@typescript-eslint/parser@3.10.1";

export type { PackageJson } from "https://cdn.dreg.dev/package/type-fest@0.16.0/source/package-json.d.ts";

export * as log from "https://deno.land/std@0.73.0/log/mod.ts";
export {
  blue,
  bold,
  green,
  red,
  yellow,
} from "https://deno.land/std@0.73.0/fmt/colors.ts";
export * as flags from "https://deno.land/std@0.73.0/flags/mod.ts";
export * as path from "https://deno.land/std@0.73.0/path/mod.ts";
const hash = await import("https://deno.land/std@0.73.0/hash/mod.ts");
export { hash };

export { wait } from "https://deno.land/x/wait@0.1.8/mod.ts";
export {
  Confirm,
  Input,
  Select,
} from "https://deno.land/x/cliffy@v0.14.2/prompt/mod.ts";
export {
  OptionType,
  parseFlags,
} from "https://deno.land/x/cliffy@v0.14.2/flags/mod.ts";
export * as semver from "https://deno.land/x/semver@v1.0.0/mod.ts";
