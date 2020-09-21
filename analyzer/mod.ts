import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { parseFlags, OptionType, Select, blue } from "./deps.ts";
import { setupPackageState } from "./setup.ts";
import { state } from "./state.ts";
import { parsePartialEntry } from "./parsePartial.ts";

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

  const partialEntry = await parsePartialEntry(flags.flags.partial);
  await setupPackageState(partialEntry);

  if (!flags.flags.partial) await askGeneratePartialEntry();

  console.log(state.getState());
} catch {
  await askGeneratePartialEntry({ didSomethingHappen: true });
}
