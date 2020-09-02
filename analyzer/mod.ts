import { setupPackageState } from "./setup.ts";
import { spinner } from "./spinner.ts";
import { blue } from "./deps.ts";

const state = await setupPackageState();

spinner.stopAndPersist({
  text: blue("The package name is " + state.entry.name),
});

console.log(state.entry);
