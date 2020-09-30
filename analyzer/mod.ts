import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { parseFlags, OptionType, Select, blue } from "./deps.ts";
import { setupPackageState } from "./setup.ts";
import { getStateKey, state } from "./state.ts";
import { parsePartialEntry } from "./parsePartial.ts";
import { runAnalyzer } from "./runAnalyzer.ts";

try {
  // TODO: new flag --askPartial -> ask for creation of partial file: always ask|ask after fail|autogenerate after fail|never generate
  // TODO: check if askPartial is enough for custom entries per package and overrides, etc...
  // TODO: new flag --retry -> retry with other registry (always ask|ask after fail|auto retry after fail|never retry)
  // always ask in both cases is useful if you want to do custom stuff (entries, registries, overwrites ...)
  // TODO: new flag -d -> load depmap state.
  // TODO: check what's best for depmap loading: ignore package.json if package is mentioned in loaded depmap or merge depmaps

  const flags = parseFlags(Deno.args, {
    allowEmpty: true,
    stopEarly: true,
    flags: [{
      name: "partial",
      aliases: ["p"],
      type: OptionType.STRING,
    }],
  });

  const partialEntry = await parsePartialEntry(flags.flags.partial);
  await setupPackageState(partialEntry);

  await askGeneratePartialEntry();

  await runAnalyzer(getStateKey(partialEntry));

  console.log(state.getState());
} catch {
  await askGeneratePartialEntry({ didSomethingHappen: true });
}
