export function getReferences(comments: Record<string, any>[]): Record<string, any>[] {
  const refPaths = comments
    .filter(({ type, value }) => type === "Line" && value.startsWith("/ <reference path=") && value.endsWith("/>"))
    .map(({ value, ...comment }) => {
      const raw = value.replace("/ <reference path=", "").replace("/>", "").trim();
      const v = raw.replaceAll(raw[0], "");
      return {
        ...comment,
        value,
        source: {
          value: v,
          raw,
        },
        type: "ImportDeclaration",
        importKind: "value",
      };
    });

  return refPaths;
}
