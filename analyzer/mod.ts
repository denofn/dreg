import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { setupPackageState } from "./setup.ts";

try {
  await setupPackageState();
  await askGeneratePartialEntry();
} catch {
  await askGeneratePartialEntry({ didSomethingHappen: true });
}
