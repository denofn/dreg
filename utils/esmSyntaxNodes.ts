export const exportTypes = ["ExportAllDeclaration", "ExportNamedDeclaration"];
export const importTypes = ["ImportDeclaration"];
export const importEqualsTypes = ["TSImportEqualsDeclaration"];
export const exportAssignment = ["TSExportAssignment"];
export function esmSyntaxType(
  type: string,
): "export" | "import" | "importEquals" | "exportAssignment" | false {
  if (exportTypes.includes(type)) return "export";
  if (importTypes.includes(type)) return "import";
  if (importEqualsTypes.includes(type)) return "importEquals";
  if (exportAssignment.includes(type)) return "exportAssignment";
  return false;
}
