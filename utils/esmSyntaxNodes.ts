export const exportTypes = ["ExportAllDeclaration", "ExportNamedDeclaration"];
export const importTypes = ["ImportDeclaration"];
export function esmSyntaxType(type: string): "export" | "import" | false {
  if (exportTypes.includes(type)) return "export";
  if (importTypes.includes(type)) return "import";
  return false;
}
