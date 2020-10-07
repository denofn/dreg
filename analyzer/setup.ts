import type { RegistryEntryV2 } from "../runtime/types/registry.ts";
import { askGhInfo } from "./questions/ghInfo.ts";
import { askImportType } from "./questions/importType.ts";
import { askImportStrategy } from "./questions/importStrategy.ts";
import { askPackageName } from "./questions/packageName.ts";
import { askVersion } from "./questions/version.ts";
import { bootstrapPackage } from "./state.ts";

export async function setupPackageState({
  name: _name,
  importType: _importType,
  importStrategy: _importStrategy,
  ghInfo: _ghInfo,
  version: _version,
  isAtTypes: _isAtTypes,
}: Partial<RegistryEntryV2> = {}) {
  const name = _name ?? (await askPackageName());
  const importType = _importType ?? (await askImportType());

  let ghInfo;
  let importStrategy: RegistryEntryV2["importStrategy"];
  if (importType === "gh") {
    ghInfo = await askGhInfo({ name, ghInfo: _ghInfo });
    importStrategy = "jsdelivr";
  } else {
    importStrategy = _importStrategy ?? (await askImportStrategy());
  }

  const version = _version ?? (await askVersion({ name, importType }));
  const isAtTypes = _isAtTypes ?? name.startsWith("@types/");

  bootstrapPackage(
    {
      entry: { name, importType, importStrategy, ghInfo, version, isAtTypes },
      depMap: {},
    },
  );
}
