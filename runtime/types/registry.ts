export type Rewrites = Record<string, Record<string, string>>;

export type RegistryEntryV1 = {
  name: string;
  importStrategy: "jsdelivr"; // jspm/skypack in v2
  importType: "npm"; //  | "gh" <- add in v1
  isAtTypes: boolean; // @types/x can serve for name replacement (@types/estree -> estree)
  version: string;
  description: string;
  entry: string;
  typesEntry?: string;
  rewrites: Rewrites;
  // hasDefaultExport: boolean; // To be implemented
};

export type Registry = Record<string, RegistryEntryV1>;
