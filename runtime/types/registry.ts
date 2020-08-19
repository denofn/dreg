export type RegistryEntryV1 = {
  name: string;
  importStrategy: "jsdelivr"; // jspm/skypack in v2
  importType: "npm"; //  | "gh" <- add in v1
  isAtTypes: boolean; // @types/x can serve for name replacement (@types/estree -> estree)
  version: string;
  description: string;
  npmDeps: Record<string, string>; // only npm is versioned
  entry: string;
  typesEntry?: string;
  nativeDeps: string[];
  localDeps: Record<string, Record<string, string>>;
  // hasDefaultExport: boolean; // To be implemented
};

export type Registry = Record<string, RegistryEntryV1>;
