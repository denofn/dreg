import Spinner from "../vendor/clispinners/mod.ts";

const spinner = Spinner.getInstance();
spinner.setSpinnerType("triangle");

export function getSpinner(): Spinner {
  return spinner;
}
