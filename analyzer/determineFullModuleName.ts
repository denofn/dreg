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
  } else {
    const depNames = Object.keys(deps);
    for (const name of depNames) {
      if (sourceValue.indexOf(name) === 0) {
        fullName = sourceValue;
        break;
      }
    }
  }

  if (!fullName) throw new Error(`Cannot resolve ${sourceValue}`);

  return `dregPackageReference:${fullName}`;
}
