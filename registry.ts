import type { Registry } from "./runtime/types/registry.ts";
const registry: Registry = {
  "estree-walker@2.0.1": {
    "name": "estree-walker",
    "hasDefaultExport": false,
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": false,
    "version": "2.0.1",
    "description": "Traverse an ESTree-compliant AST",
    "entry": "src/estree-walker.js",
    "typesEntry": "types/index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/estree-walker@2.0.1/src/estree-walker.js": {},
      "https://cdn.jsdelivr.net/npm/estree-walker@2.0.1/types/index.d.ts": {
        "\"estree\"": "\"/package/@types/estree@0.0.42\"",
        "\"./sync\"": "\"./sync.d.ts\"",
        "\"./async\"": "\"./async.d.ts\""
      },
      "https://cdn.jsdelivr.net/npm/estree-walker@2.0.1/types/sync.d.ts": {
        "\"./walker\"": "\"./walker.d.ts\"",
        "\"estree\"": "\"/package/@types/estree@0.0.42\""
      },
      "https://cdn.jsdelivr.net/npm/estree-walker@2.0.1/types/walker.d.ts": {
        "\"estree\"": "\"/package/@types/estree@0.0.42\""
      },
      "https://cdn.jsdelivr.net/npm/estree-walker@2.0.1/types/async.d.ts": {
        "\"./walker\"": "\"./walker.d.ts\"",
        "\"estree\"": "\"/package/@types/estree@0.0.42\""
      }
    }
  },
  "@types/estree@0.0.42": {
    "name": "@types/estree",
    "hasDefaultExport": false,
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": true,
    "version": "0.0.42",
    "description": "TypeScript definitions for ESTree AST specification",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@types/estree@0.0.42/index.d.ts": {}
    }
  },
  "@types/estree@0.0.45": {
    "name": "@types/estree",
    "hasDefaultExport": false,
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": true,
    "version": "0.0.45",
    "description": "TypeScript definitions for ESTree AST specification",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@types/estree@0.0.45/index.d.ts": {}
    }
  },
  "type-fest@0.16.0": {
    "name": "type-fest",
    "hasDefaultExport": false,
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": false,
    "version": "0.16.0",
    "description": "A collection of essential TypeScript types",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/index.d.ts": {
        "'./source/basic'": "'./source/basic.d.ts'",
        "'./source/except'": "'./source/except.d.ts'",
        "'./source/mutable'": "'./source/mutable.d.ts'",
        "'./source/merge'": "'./source/merge.d.ts'",
        "'./source/merge-exclusive'": "'./source/merge-exclusive.d.ts'",
        "'./source/require-at-least-one'": "'./source/require-at-least-one.d.ts'",
        "'./source/require-exactly-one'": "'./source/require-exactly-one.d.ts'",
        "'./source/partial-deep'": "'./source/partial-deep.d.ts'",
        "'./source/readonly-deep'": "'./source/readonly-deep.d.ts'",
        "'./source/literal-union'": "'./source/literal-union.d.ts'",
        "'./source/promisable'": "'./source/promisable.d.ts'",
        "'./source/opaque'": "'./source/opaque.d.ts'",
        "'./source/set-optional'": "'./source/set-optional.d.ts'",
        "'./source/set-required'": "'./source/set-required.d.ts'",
        "'./source/value-of'": "'./source/value-of.d.ts'",
        "'./source/promise-value'": "'./source/promise-value.d.ts'",
        "'./source/async-return-type'": "'./source/async-return-type.d.ts'",
        "'./source/conditional-except'": "'./source/conditional-except.d.ts'",
        "'./source/conditional-keys'": "'./source/conditional-keys.d.ts'",
        "'./source/conditional-pick'": "'./source/conditional-pick.d.ts'",
        "'./source/union-to-intersection'": "'./source/union-to-intersection.d.ts'",
        "'./source/stringified'": "'./source/stringified.d.ts'",
        "'./source/fixed-length-array'": "'./source/fixed-length-array.d.ts'",
        "'./source/package-json'": "'./source/package-json.d.ts'",
        "'./source/tsconfig-json'": "'./source/tsconfig-json.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/basic.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/except.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/mutable.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/merge.d.ts": {
        "'./except'": "'./except.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/merge-exclusive.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/require-at-least-one.d.ts": {
        "'./except'": "'./except.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/require-exactly-one.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/partial-deep.d.ts": {
        "'./basic'": "'./basic.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/readonly-deep.d.ts": {
        "'./basic'": "'./basic.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/literal-union.d.ts": {
        "'./basic'": "'./basic.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/promisable.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/opaque.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/set-optional.d.ts": {
        "'./except'": "'./except.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/set-required.d.ts": {
        "'./except'": "'./except.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/value-of.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/promise-value.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/async-return-type.d.ts": {
        "'./promise-value'": "'./promise-value.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/conditional-except.d.ts": {
        "'./except'": "'./except.d.ts'",
        "'./conditional-keys'": "'./conditional-keys.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/conditional-keys.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/conditional-pick.d.ts": {
        "'./conditional-keys'": "'./conditional-keys.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/union-to-intersection.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/stringified.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/fixed-length-array.d.ts": {},
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/package-json.d.ts": {
        "'./literal-union'": "'./literal-union.d.ts'"
      },
      "https://cdn.jsdelivr.net/npm/type-fest@0.16.0/source/tsconfig-json.d.ts": {}
    }
  },
  "picomatch@2.2.2": {
    "name": "picomatch",
    "importStrategy": "jspm",
    "importType": "npm",
    "isAtTypes": false,
    "version": "2.2.2",
    "description": "Blazing fast and accurate glob matcher written in JavaScript, with no dependencies and full support for standard and extended Bash glob features, including braces, extglobs, POSIX brackets, and regular expressions.",
    "entry": "https://jspm.dev/npm:picomatch@2.2.2!cjs",
    "rewrites": {
      "https://jspm.dev/npm:picomatch@2.2.2!cjs": {
        "'/npm:@jspm/core@2/nodelibs/path'": "'/polyfill/node/path.ts'",
        "'./npm:picomatch@2.2.2/_/9ee23622.js'": "'/package/picomatch@2.2.2/_/9ee23622.js'",
        "'/npm:@jspm/core@2/nodelibs/process'": "'/polyfill/node/process.ts'"
      },
      "https://jspm.dev/npm:picomatch@2.2.2/_/9ee23622.js": {
        "'/npm:@jspm/core@2/nodelibs/path'": "'/polyfill/node/path.ts'",
        "'/npm:@jspm/core@2/nodelibs/process'": "'/polyfill/node/process.ts'"
      }
    },
    "typesEntry": "/package/@types/picomatch@2.2.1",
    "hasDefaultExport": true
  },
  "@types/picomatch@2.2.1": {
    "name": "@types/picomatch",
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": true,
    "version": "2.2.1",
    "description": "TypeScript definitions for picomatch",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@types/picomatch@2.2.1/index.d.ts": {
        "dregImportEquals:'./parse'": "'./parse.d.ts'",
        "dregImportEquals:'./constants'": "'./constants.d.ts'",
        "dregExportAssignment:picomatch": ""
      },
      "https://cdn.jsdelivr.net/npm/@types/picomatch@2.2.1/parse.d.ts": {
        "dregExportAssignment:parse": ""
      },
      "https://cdn.jsdelivr.net/npm/@types/picomatch@2.2.1/constants.d.ts": {
        "dregExportAssignment:constants": ""
      }
    },
    "hasDefaultExport": true
  }
};
export default registry;
