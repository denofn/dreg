function makeRegex(raw: string): RegExp {
  return new RegExp(`\( \)*=\( \)*require\( \)*\\(\( \)*${raw}\( \)*\\)`, "g");
}

export function replaceImportEqualsDecl(
  target: string,
  raw: string,
  value: string,
): string {
  return target.replaceAll(makeRegex(raw), ` from ${value}`);
}
