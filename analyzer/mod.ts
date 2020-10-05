import { OptionType, parseFlags } from "./deps.ts";
import { parsePartialEntry } from "./parsePartial.ts";
import { askGeneratePartialEntry } from "./questions/generatePartialEntry.ts";
import { runAnalyzer } from "./runAnalyzer.ts";
import { setupPackageState } from "./setup.ts";
import { getStateKey, setOptions, state } from "./state.ts";

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
        // Load depMap in state
        // TODO: check what's best for depmap loading: ignore package.json if package is mentioned in loaded depmap or merge depmaps
        name: "depMap",
        aliases: ["d"],
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

  console.log(state.getState());
} catch (e) {
  await askGeneratePartialEntry({ didSomethingHappen: true });
}
