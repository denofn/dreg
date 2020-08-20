import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { analyze } from "./analyzer.ts";
import { flags, blue, green } from "./deps.ts";
import { sanityCheck } from "./sanityCheck.ts";
import { getSpinner } from "./spinner.ts";

const { d, v, doSanityCheck, persist } = flags.parse(Deno.args);
if (!d) throw new Error("Please provide dependency name");

await getSpinner().start(blue(`Analyzing ${d}${v ? `@${v}` : ""}`));
const R: RegistryEntryV1 = await analyze(d, v);

if (doSanityCheck) {
  await getSpinner().setText(`Performing sanity check`);
  await sanityCheck(R);
}

await getSpinner().succeed(green(`Analyzed ${R.name}@${R.version}, prepared the following registry entry:`));

const newDep = {
  [`${R.name}@${R.version}`]: R,
};

console.log("");
console.log(JSON.stringify(newDep, null, 2));

if (persist) {
  const X = JSON.parse(await Deno.readTextFile("registry.json"));
  await Deno.writeTextFile(
    "registry.json",
    JSON.stringify(
      {
        ...X,
        ...newDep,
      },
      null,
      2
    )
  );

  Deno.exit(0);
} else {
  Deno.exit(0);
}
