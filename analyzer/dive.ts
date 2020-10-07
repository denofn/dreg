import { spinner } from "./spinner.ts";

export async function dive(stateKey: string, entryPath: string): Promise<void> {
  spinner.text = `Diving file ${entryPath}`;
  spinner.start();
  spinner.succeed(`Finished analyzing ${entryPath}`);
}
