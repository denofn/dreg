import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { setupPackageState } from "./setup.ts";
import { parseFlags, OptionType } from "./deps.ts";
import { state } from "./state.ts";
import type { RegistryEntryV2 } from "../runtime/types/registry.ts";

try {
  const flags = parseFlags(Deno.args, {
    allowEmpty: true,
    stopEarly: true,
    flags: [{
      name: "partial",
      aliases: ["p"],
      type: OptionType.STRING,
    }],
  });

  let partialEntry = {};
  if (flags.flags.partial) {
    try {
      partialEntry = Object.values(
        JSON.parse(await Deno.readTextFile(flags.flags.partial)),
      )[0] as Partial<RegistryEntryV2>;
    } catch {}
  }

  await setupPackageState(partialEntry); // TODO: handle partial entries with more than one package
  if (!flags.flags.partial) await askGeneratePartialEntry();
  console.log(state.getState());
} catch {
  await askGeneratePartialEntry({ didSomethingHappen: true });
}
