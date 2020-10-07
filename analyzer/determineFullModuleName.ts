const jspmBase = "/npm:@jspm/core@2/nodelibs/";
const builtins = ["path", "process", "chalk", "supports-color", "fs"];

const withJspmBase = (pack: string) => `${jspmBase}${pack}`;

export function determineFullModuleName(
  deps: Record<string, string>,
  sourceValue: string,
) {
  if (sourceValue === "package.json") return `dregPackageJSONReference`;

  if (builtins.includes(sourceValue)) {
    return `dregBuiltinAssignment:${sourceValue}`;
  } else if (builtins.map(withJspmBase).includes(sourceValue)) {
    return `dregBuiltinAssignment:${sourceValue.substr(jspmBase.length)}`;
  }

  let fullName;

  if (!!deps[sourceValue]) fullName = sourceValue;
  else if (!!deps[`@types/${sourceValue}`]) {
    fullName = `@types/${sourceValue}`;
  } else throw new Error(`Cannot resolve ${sourceValue}`);

  // TODO: parse version with semver and get best version from npm/gh
  const depName = `${fullName}@${deps[fullName!]}`;

  return `/package/${depName}`;
}
