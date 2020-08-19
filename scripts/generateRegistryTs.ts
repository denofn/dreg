await Deno.writeTextFile("registry.ts", `export default ${await Deno.readTextFile("registry.json")}`);
