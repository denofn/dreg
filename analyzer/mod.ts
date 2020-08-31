import { wait, blue } from "./deps.ts";

const spinner = wait("Generating terrain").start();

setTimeout(() => {
  spinner.text = blue("Loading dinosaurs");
}, 1500);
