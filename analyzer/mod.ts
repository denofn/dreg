import { setupPackageState } from "./setup.ts";
import { state } from "./state.ts";

await setupPackageState();

console.log(state.getState());
