import { keys } from "../runtime/runtimeRegistry.ts";

const jspmBase = "/npm:@jspm/core@2/nodelibs/";
const withJspmBase = (pack: string) => `${jspmBase}${pack}`;
const internals = ["path", "process"];

export function determineFullModuleName(depMap: Record<string, string>, sourceValue: string) {
  if (internals.map(withJspmBase).includes(sourceValue)) {
    return `/polyfill/node/${sourceValue.substr(jspmBase.length)}.ts`;
  }

  let fullName;

  if (!!depMap[sourceValue]) fullName = sourceValue;
  else if (!!depMap[`@types/${sourceValue}`]) fullName = `@types/${sourceValue}`;
  else throw new Error();

  const depName = `${fullName}@${depMap[fullName!]}`;

  if (!keys.includes(depName)) throw new Error();

  return `/package/${depName}`;
}
