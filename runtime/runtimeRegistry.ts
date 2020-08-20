import _registry from "../registry.ts";
import { Registry } from "./types/registry.ts";

export const keys = Object.keys(_registry);
export const registry = _registry as Registry;
