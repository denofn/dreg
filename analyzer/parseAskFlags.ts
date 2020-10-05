export type AskOptions = "always" | "afterFail" | "auto" | "never";
// always -> always ask: after completion of a package, after fail, ...
// afterFail -> only ask after failure (thrown errors), ...
// auto -> automatically do action after failure (thrown errors), ...
// never

export const defaultOption: AskOptions = "afterFail";

const options: string[] = ["always", "afterFail", "auto", "never"];

export function parseAskFlags(value?: string): AskOptions {
  if (options.includes(value ?? "")) return value as AskOptions;
  return defaultOption;
}
