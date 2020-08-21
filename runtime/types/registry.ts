export type Rewrites = Record<string, Record<string, string>>;

export type RegistryEntryV1 = {
  name: string;
  importStrategy: "jsdelivr" | "jspm";
  importType: "npm";
  isAtTypes: boolean;
  version: string;
  description: string;
  entry: string;
  typesEntry?: string;
  rewrites: Rewrites;
  hasDefaultExport: boolean;
};

export type Registry = Record<string, RegistryEntryV1>;
