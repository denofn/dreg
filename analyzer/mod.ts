import { setupPackageState } from "./setup.ts";

const state = await setupPackageState();

console.log(state.entry);
