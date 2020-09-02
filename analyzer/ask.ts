import { readLines } from "./deps.ts";
import { spinner } from "./spinner.ts";

export async function ask(question: string): Promise<string> {
  spinner.stopAndPersist({ text: question });
  for await (const answer of readLines(Deno.stdin)) {
    spinner.start();
    return answer;
  }
  return "";
}
