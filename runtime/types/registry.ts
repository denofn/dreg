export type Rewrites = Record<string, Record<string, string>>;

export type RegistryEntryV1 = {
  name: string;
  importStrategy: "jsdelivr" | "jspm";
  importType: "npm" | "gh";
  isAtTypes: boolean;
  version: string;
  description: string;
  entry: string;
  typesEntry?: string;
  addProcess?: boolean;
  ghUser?: string;
  rewrites: Rewrites;
  additions?: Record<string, string[]>;
  hasDefaultExport: boolean;
};

export type RegistryEntryV2 = {
  name: string;
  importStrategy: "jsdelivr" | "jspm";
  importType: "npm" | "gh";
  isAtTypes: boolean;
  version: string;
  description: string;
  entry: string;
  typesEntry?: string;
  addProcess?: boolean;
  ghInfo?: {
    user: string;
    repo: string;
    entryFile: string;
    packageJsonLocation?: string;
  };
  rewrites: Rewrites;
  additions?: Record<string, string[]>;
  hasDefaultExport: boolean;
};

export type Registry = Record<string, RegistryEntryV1>;
