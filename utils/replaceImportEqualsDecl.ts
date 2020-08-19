function makeRegex(raw: string): RegExp {
  return new RegExp(`\( \)*=\( \)*require\( \)*\\(\( \)*${raw}\( \)*\\)`, "g");
}

export function replaceImportEqualsDecl(target: string, raw: string): string {
  return target.replace(makeRegex(raw), ` from ${raw}`);
}
