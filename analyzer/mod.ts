import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { analyze } from "./analyzer.ts";
import { flags, blue, green } from "./deps.ts";
import { sanityCheck } from "./sanityCheck.ts";
import { getSpinner } from "./spinner.ts";

const { d, v, doSanityCheck } = flags.parse(Deno.args);
if (!d) throw new Error("Please provide dependency name");

await getSpinner().start(blue(`Analyzing ${d}${v ? `@${v}` : ""}`));
const R: RegistryEntryV1 = await analyze(d, v);

if (doSanityCheck) {
  await getSpinner().setText(`Performing sanity check`);
  await sanityCheck(R);
}

await getSpinner().succeed(green(`Analyzed ${R.name}@${R.version}, prepared the following registry entry:`));

console.log(
  JSON.stringify(
    {
      [`${R.name}@${R.version}`]: R,
    },
    null,
    2
  )
);
