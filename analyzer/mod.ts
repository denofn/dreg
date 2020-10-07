import { OptionType, parseFlags } from "./deps.ts";
import { parsePartialEntry } from "./parsePartial.ts";
import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { runAnalyzer } from "./runAnalyzer.ts";
import { setupPackageState } from "./setup.ts";
import { getStateKey, setOptions } from "./state.ts";

try {
  const { flags } = parseFlags(Deno.args, {
    allowEmpty: true,
    stopEarly: true,
    flags: [
      {
        // Load partialEntry in state
        name: "partial",
        aliases: ["p"],
        type: OptionType.STRING,
      },
      {
        // ask for partialEntry creation
        // TODO: check if askPartial is enough for custom entries per package and overrides, etc...
        name: "askPartial",
        type: OptionType.STRING,
      },
      {
        // ask for retries with different registry
        name: "askRetry",
        type: OptionType.STRING,
      },
    ],
  });

  setOptions({ askRetry: flags.askRetry, askPartial: flags.askPartial });

  const partialEntry = await parsePartialEntry(flags.partial);
  const basePackage = await setupPackageState(partialEntry);

  await askGeneratePartialEntry();

  await runAnalyzer(getStateKey(basePackage));
} catch (e) {
  console.error(e);
  await askGeneratePartialEntry({ didSomethingHappen: true });
}
