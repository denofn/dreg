function makeRegex(raw: string): RegExp {
  return new RegExp(`export\( \)*=\( \)*${raw}`, "g");
}

export function replaceExportAssignment(target: string, raw: string): string {
  return target.replaceAll(makeRegex(raw), `export default ${raw}`);
}
