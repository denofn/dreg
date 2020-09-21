import type { RegistryEntryV2 } from "../runtime/types/registry.ts";
import { askGhInfo } from "./questions/ghInfo.ts";
import { askImportType } from "./questions/importType.ts";
import { askPackageName } from "./questions/packageName.ts";
import { askVersion } from "./questions/version.ts";
import { bootstrapPackage } from "./state.ts";

export async function setupPackageState({
  name: _name,
  importType: _importType,
  ghInfo: _ghInfo,
  version: _version,
}: Partial<RegistryEntryV2> = {}) {
  const name = _name ?? (await askPackageName());
  const importType = _importType ?? (await askImportType());

  let ghInfo;
  if (importType === "gh") {
    ghInfo = await askGhInfo({ name, ghInfo: _ghInfo });
  }

  const version = _version ?? (await askVersion({ name, importType }));

  bootstrapPackage(
    { entry: { name, importType, ghInfo, version }, depMap: {} },
  );
}
