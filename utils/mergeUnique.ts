export function mergeUnique(a: string[], b: string[]): string[] {
  return a.concat(b.filter((i) => a.indexOf(i) < 0));
}
