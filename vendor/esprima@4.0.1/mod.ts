import type { TokenizeOptions, Token } from "./esprima.d.ts";
import { tokenize as tokenizeFn } from "https://jspm.dev/npm:esprima@4.0.1!cjs";

export const tokenize = tokenizeFn as (input: string, config?: TokenizeOptions) => Token[];
