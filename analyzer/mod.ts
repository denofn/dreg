import { flags } from "../deps.ts";
import { RegistryEntryV1 } from "../runtime/types/registry.ts";
import { analyze } from "./analyzer.ts";
import { sanityCheck } from "./sanityCheck.ts";

const { d, v, doSanityCheck } = flags.parse(Deno.args);
if (!d) throw new Error("Please provide dependency name");

const R: RegistryEntryV1 = await analyze(d, v);

if (doSanityCheck) {
  await sanityCheck(R);
}

console.log(`Analyzed ${d}, prepared the following registry entry:`);
console.log(
  JSON.stringify(
    {
      [`${R.name}@${R.version}`]: R,
    },
    null,
    2
  )
);
