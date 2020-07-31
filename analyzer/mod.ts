import { verifyModule } from "./verifyModule.ts";

console.log(await verifyModule(Deno.args[0]));
