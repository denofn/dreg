import type { RegistryEntryV2 } from "../../runtime/types/registry.ts";
import { Input, Confirm, blue, red, path } from "../deps.ts";
import { state } from "../state.ts";

type Props = {
  didSomethingHappen?: boolean;
};

function mapState() {
  const rawState = state.getState();
  const mappedState = {} as Record<string, Partial<RegistryEntryV2>>;
  for (const k of Object.keys(rawState)) {
    mappedState[k] = rawState[k].entry;
  }

  return mappedState;
}

export async function askGeneratePartialEntry(
  { didSomethingHappen }: Props = {},
): Promise<void> {
  const shouldGenerate = await Confirm.prompt(
    blue(
      `${
        didSomethingHappen ? "Oops! An error occured! " : ""
      }Do you want to create a partial registry entry? `,
    ) +
      red("This will quit the analyzer!"),
  );

  if (!shouldGenerate) return;

  const fileName = path.parse(
    await Input.prompt({
      message: blue("What filename do you want to use?"),
      default: "entry.json",
    }),
  ).name;

  await Deno.writeTextFile(`${fileName}.json`, JSON.stringify(mapState()));

  Deno.exit(0);
}
