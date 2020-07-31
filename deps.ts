// @deno-types="https://unpkg.com/rollup@2.23.0/dist/rollup.d.ts"
export { rollup } from "https://unpkg.com/rollup@2.23.0/dist/es/rollup.browser.js";
export type {
  Plugin,
  ResolveIdResult,
  RollupOptions,
  RollupOutput,
  RollupBuild,
  OutputAsset,
  OutputChunk,
  OutputOptions,
} from "https://unpkg.com/rollup@2.23.0/dist/rollup.d.ts";

export * from "https://cdn.jsdelivr.net/gh/denofn/type-fest@0.16.0/mod.ts";
export { tokenize } from "./vendor/esprima@4.0.1/mod.ts";
