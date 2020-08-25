export * from "https://deno.land/std@0.66.0/node/fs.ts";
import * as fs from "https://deno.land/std@0.66.0/node/fs.ts";

type NodeStats = Omit<Deno.FileInfo, "isDirectory" | "isFile" | "isSymlink"> & {
  isDirectory(): boolean;
  isFile(): boolean;
  isSymbolicLink(): boolean;
};

function createNodeStats(_stats: Deno.FileInfo): NodeStats {
  const { isDirectory, isFile, isSymlink, ...s } = _stats;
  const stats = {
    ...s,
    isDirectory: () => isDirectory,
    isFile: () => isFile,
    isSymbolicLink: () => isSymlink,
  };

  return stats;
}

export function statSync(path: string) {
  return createNodeStats(Deno.statSync(path));
}

export async function stat(path: string, callback: (err?: Error, stats?: NodeStats) => any) {
  try {
    callback(undefined, createNodeStats(await Deno.stat(path)));
  } catch (e) {
    callback(e);
  }
}

export function realPathSync(path: string) {
  return Deno.realPathSync(path);
}

export async function realPath(path: string, callback: (err?: Error, stats?: string) => any) {
  try {
    callback(undefined, await Deno.realPath(path));
  } catch (e) {
    callback(e);
  }
}

export default {
  ...fs,
  statSync: statSync,
  stat: stat,
  realPathSync: realPathSync,
  realPath: realPath,
};
