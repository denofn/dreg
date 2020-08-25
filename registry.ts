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
  },
  "@rollup/pluginutils@4.0.0": {
    "name": "@rollup/pluginutils",
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": false,
    "version": "4.0.0",
    "description": "A set of utility functions commonly used by Rollup plugins",
    "entry": "./dist/es/index.js",
    "typesEntry": "types/index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@rollup/pluginutils@4.0.0/dist/es/index.js": {
        "'path'": "'/polyfill/node/path.ts'",
        "'picomatch'": "'/package/picomatch@2.2.2'"
      },
      "https://cdn.jsdelivr.net/npm/@rollup/pluginutils@4.0.0/types/index.d.ts": {
        "'estree'": "'/package/@types/estree@0.0.45'"
      }
    },
    "hasDefaultExport": true
  },
  "source-map@0.6.1": {
    "name": "source-map",
    "importStrategy": "jspm",
    "importType": "npm",
    "isAtTypes": false,
    "version": "0.6.1",
    "description": "Generates and consumes source maps",
    "entry": "https://jspm.dev/npm:source-map@0.6.1!cjs",
    "typesEntry": "/package/source-map@0.6.1/source-map.d.ts",
    "rewrites": {
      "https://jspm.dev/npm:source-map@0.6.1!cjs": {
        "'./npm:source-map@0.6.1/_/b1dbe139.js'": "'/package/source-map@0.6.1/_/b1dbe139.js'",
        "'./npm:source-map@0.6.1/lib/util!cjs'": "'/package/source-map@0.6.1/lib/util!cjs'",
        "'./npm:source-map@0.6.1/lib/source-map-generator!cjs'": "'/package/source-map@0.6.1/lib/source-map-generator!cjs'",
        "'./npm:source-map@0.6.1/lib/source-map-consumer!cjs'": "'/package/source-map@0.6.1/lib/source-map-consumer!cjs'"
      },
      "https://jspm.dev/npm:source-map@0.6.1/_/b1dbe139.js": {
        "'../lib/util!cjs'": "'../lib/util!cjs'"
      },
      "https://jspm.dev/npm:source-map@0.6.1/lib/util!cjs": {},
      "https://jspm.dev/npm:source-map@0.6.1/lib/source-map-generator!cjs": {
        "'../_/b1dbe139.js'": "'../_/b1dbe139.js'",
        "'./util!cjs'": "'./util!cjs'"
      },
      "https://jspm.dev/npm:source-map@0.6.1/lib/source-map-consumer!cjs": {
        "'../_/b1dbe139.js'": "'../_/b1dbe139.js'",
        "'./util!cjs'": "'./util!cjs'"
      },
      "https://cdn.jsdelivr.net/npm/source-map@0.6.1/source-map.d.ts": {}
    },
    "hasDefaultExport": true
  },
  "postcss@7.0.32": {
    "name": "postcss",
    "importStrategy": "jsdelivr",
    "importType": "gh",
    "ghUser": "postcss",
    "isAtTypes": false,
    "version": "7.0.32",
    "description": "Tool for transforming styles with JS plugins",
    "entry": "lib/postcss.es6",
    "typesEntry": "lib/postcss.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/postcss.es6": {
        "'./declaration'": "'./declaration.es6'",
        "'./processor'": "'./processor.es6'",
        "'./stringify'": "'./stringify.es6'",
        "'./comment'": "'./comment.es6'",
        "'./at-rule'": "'./at-rule.es6'",
        "'./vendor'": "'./vendor.es6'",
        "'./parse'": "'./parse.es6'",
        "'./list'": "'./list.es6'",
        "'./rule'": "'./rule.es6'",
        "'./root'": "'./root.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/declaration.es6": {
        "'./node'": "'./node.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/node.es6": {
        "'./css-syntax-error'": "'./css-syntax-error.es6'",
        "'./stringifier'": "'./stringifier.es6'",
        "'./stringify'": "'./stringify.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/css-syntax-error.es6": {
        "'supports-color'": "'/polyfill/node/supports-color.ts'",
        "'chalk'": "'/polyfill/node/chalk.ts'",
        "'./terminal-highlight'": "'./terminal-highlight.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/terminal-highlight.es6": {
        "'chalk'": "'/polyfill/node/chalk.ts'",
        "'./tokenize'": "'./tokenize.es6'",
        "'./input'": "'./input.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/tokenize.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/input.es6": {
        "'path'": "'/polyfill/node/path.ts'",
        "'./css-syntax-error'": "'./css-syntax-error.es6'",
        "'./previous-map'": "'./previous-map.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/previous-map.es6": {
        "'source-map'": "'/package/source-map@0.6.1'",
        "'path'": "'/polyfill/node/path.ts'",
        "'fs'": "'/polyfill/node/fs.ts'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/stringifier.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/stringify.es6": {
        "'./stringifier'": "'./stringifier.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/processor.es6": {
        "'./lazy-result'": "'./lazy-result.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/lazy-result.es6": {
        "'./map-generator'": "'./map-generator.es6'",
        "'./stringify'": "'./stringify.es6'",
        "'./warn-once'": "'./warn-once.es6'",
        "'./result'": "'./result.es6'",
        "'./parse'": "'./parse.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/map-generator.es6": {
        "'source-map'": "'/package/source-map@0.6.1'",
        "'path'": "'/polyfill/node/path.ts'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/warn-once.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/result.es6": {
        "'./warning'": "'./warning.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/warning.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/parse.es6": {
        "'./parser'": "'./parser.es6'",
        "'./input'": "'./input.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/parser.es6": {
        "'./declaration'": "'./declaration.es6'",
        "'./tokenize'": "'./tokenize.es6'",
        "'./comment'": "'./comment.es6'",
        "'./at-rule'": "'./at-rule.es6'",
        "'./root'": "'./root.es6'",
        "'./rule'": "'./rule.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/comment.es6": {
        "'./node'": "'./node.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/at-rule.es6": {
        "'./container'": "'./container.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/container.es6": {
        "'./declaration'": "'./declaration.es6'",
        "'./comment'": "'./comment.es6'",
        "'./node'": "'./node.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/root.es6": {
        "'./container'": "'./container.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/rule.es6": {
        "'./container'": "'./container.es6'",
        "'./list'": "'./list.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/list.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/vendor.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/postcss.d.ts": {
        "'source-map'": "'/package/source-map@0.6.1'",
        "dregExportAssignment:postcss": ""
      }
    },
    "additions": {
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.32/lib/postcss.d.ts": [
        "export type Plugin<T> = postcss.Plugin<T>;"
      ]
    },
    "hasDefaultExport": true,
    "addProcess": true
  },
  "postcss-value-parser@4.1.0": {
    "name": "postcss-value-parser",
    "importStrategy": "jspm",
    "importType": "npm",
    "isAtTypes": false,
    "version": "4.1.0",
    "typesEntry": "/package/postcss-value-parser@4.1.0/lib/index.d.ts",
    "description": "Transforms css values and at-rule params into the tree",
    "entry": "https://jspm.dev/npm:postcss-value-parser@4.1.0!cjs",
    "rewrites": {
      "https://jspm.dev/npm:postcss-value-parser@4.1.0!cjs": {
        "'./npm:postcss-value-parser@4.1.0/lib/unit!cjs'": "'/package/postcss-value-parser@4.1.0/lib/unit!cjs'"
      },
      "https://jspm.dev/npm:postcss-value-parser@4.1.0/lib/unit!cjs": {},
      "https://cdn.jsdelivr.net/npm/postcss-value-parser@4.1.0/lib/index.d.ts": {
        "dregExportAssignment:postcssValueParser": ""
      }
    },
    "hasDefaultExport": true
  },
  "postcss@7.0.16": {
    "name": "postcss",
    "importStrategy": "jsdelivr",
    "importType": "gh",
    "ghUser": "postcss",
    "isAtTypes": false,
    "version": "7.0.16",
    "description": "Tool for transforming styles with JS plugins",
    "entry": "lib/postcss.es6",
    "typesEntry": "lib/postcss.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/postcss.es6": {
        "'./declaration'": "'./declaration.es6'",
        "'./processor'": "'./processor.es6'",
        "'./stringify'": "'./stringify.es6'",
        "'./comment'": "'./comment.es6'",
        "'./at-rule'": "'./at-rule.es6'",
        "'./vendor'": "'./vendor.es6'",
        "'./parse'": "'./parse.es6'",
        "'./list'": "'./list.es6'",
        "'./rule'": "'./rule.es6'",
        "'./root'": "'./root.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/declaration.es6": {
        "'./node'": "'./node.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/node.es6": {
        "'./css-syntax-error'": "'./css-syntax-error.es6'",
        "'./stringifier'": "'./stringifier.es6'",
        "'./stringify'": "'./stringify.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/css-syntax-error.es6": {
        "'supports-color'": "'/polyfill/node/supports-color.ts'",
        "'chalk'": "'/polyfill/node/chalk.ts'",
        "'./terminal-highlight'": "'./terminal-highlight.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/terminal-highlight.es6": {
        "'chalk'": "'/polyfill/node/chalk.ts'",
        "'./tokenize'": "'./tokenize.es6'",
        "'./input'": "'./input.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/tokenize.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/input.es6": {
        "'path'": "'/polyfill/node/path.ts'",
        "'./css-syntax-error'": "'./css-syntax-error.es6'",
        "'./previous-map'": "'./previous-map.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/previous-map.es6": {
        "'source-map'": "'/package/source-map@0.6.1'",
        "'path'": "'/polyfill/node/path.ts'",
        "'fs'": "'/polyfill/node/fs.ts'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/stringifier.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/stringify.es6": {
        "'./stringifier'": "'./stringifier.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/processor.es6": {
        "'./lazy-result'": "'./lazy-result.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/lazy-result.es6": {
        "'./map-generator'": "'./map-generator.es6'",
        "'./stringify'": "'./stringify.es6'",
        "'./warn-once'": "'./warn-once.es6'",
        "'./result'": "'./result.es6'",
        "'./parse'": "'./parse.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/map-generator.es6": {
        "'source-map'": "'/package/source-map@0.6.1'",
        "'path'": "'/polyfill/node/path.ts'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/warn-once.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/result.es6": {
        "'./warning'": "'./warning.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/warning.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/parse.es6": {
        "'./parser'": "'./parser.es6'",
        "'./input'": "'./input.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/parser.es6": {
        "'./declaration'": "'./declaration.es6'",
        "'./tokenize'": "'./tokenize.es6'",
        "'./comment'": "'./comment.es6'",
        "'./at-rule'": "'./at-rule.es6'",
        "'./root'": "'./root.es6'",
        "'./rule'": "'./rule.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/comment.es6": {
        "'./node'": "'./node.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/at-rule.es6": {
        "'./container'": "'./container.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/container.es6": {
        "'./declaration'": "'./declaration.es6'",
        "'./comment'": "'./comment.es6'",
        "'./node'": "'./node.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/root.es6": {
        "'./container'": "'./container.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/rule.es6": {
        "'./container'": "'./container.es6'",
        "'./list'": "'./list.es6'"
      },
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/list.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/vendor.es6": {},
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/postcss.d.ts": {
        "'source-map'": "'/package/source-map@0.6.1'",
        "dregExportAssignment:postcss": ""
      }
    },
    "additions": {
      "https://cdn.jsdelivr.net/gh/postcss/postcss@7.0.16/lib/postcss.d.ts": [
        "export type Plugin<T> = postcss.Plugin<T>;"
      ]
    },
    "hasDefaultExport": true
  },
  "@types/browserslist@4.8.0": {
    "name": "@types/browserslist",
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": true,
    "version": "4.8.0",
    "description": "TypeScript definitions for browserslist",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@types/browserslist@4.8.0/index.d.ts": {
        "dregExportAssignment:browserslist": ""
      }
    },
    "additions": {
      "https://cdn.jsdelivr.net/npm/@types/browserslist@4.8.0/index.d.ts": ["export type Stats = browserslist.Stats;"]
    },
    "hasDefaultExport": true
  },
  "@types/autoprefixer@9.7.2": {
    "name": "@types/autoprefixer",
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": true,
    "version": "9.7.2",
    "description": "TypeScript definitions for autoprefixer",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@types/autoprefixer@9.7.2/index.d.ts": {
        "'postcss'": "'/package/postcss@7.0.32/lib/postcss.d.ts'",
        "'browserslist'": "'/package/@types/browserslist@4.8.0/index.d.ts'",
        "dregExportAssignment:autoprefixer": ""
      }
    },
    "hasDefaultExport": true
  },
  "@types/cssnano@4.0.0": {
    "name": "@types/cssnano",
    "importStrategy": "jsdelivr",
    "importType": "npm",
    "isAtTypes": true,
    "version": "4.0.0",
    "description": "TypeScript definitions for cssnano",
    "entry": "index.d.ts",
    "rewrites": {
      "https://cdn.jsdelivr.net/npm/@types/cssnano@4.0.0/index.d.ts": {
        "'postcss'": "'/package/postcss@7.0.32'",
        "dregExportAssignment:cssnano": ""
      }
    },
    "hasDefaultExport": true
  },
  "vue@2.6.12": {
    "name": "vue",
    "importStrategy": "jspm",
    "importType": "npm",
    "isAtTypes": false,
    "version": "2.6.12",
    "description": "Reactive, component-oriented view layer for modern web interfaces.",
    "entry": "https://jspm.dev/npm:vue@2.6.12!cjs",
    "typesEntry": "/package/vue@2.6.12/types/index.d.ts",
    "rewrites": {
      "https://jspm.dev/npm:vue@2.6.12!cjs": {
        "'/npm:@jspm/core@2/nodelibs/process'": "'/polyfill/node/process.ts'"
      },
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/types/index.d.ts": {
        "\"./vue\"": "\"./vue.d.ts\"",
        "\"./umd\"": "\"./umd.d.ts\"",
        "\"./options\"": "\"./options.d.ts\"",
        "\"./plugin\"": "\"./plugin.d.ts\"",
        "\"./vnode\"": "\"./vnode.d.ts\""
      },
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/types/vue.d.ts": {
        "\"./options\"": "\"./options.d.ts\"",
        "\"./vnode\"": "\"./vnode.d.ts\"",
        "\"./plugin\"": "\"./plugin.d.ts\""
      },
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/types/options.d.ts": {
        "\"./vue\"": "\"./vue.d.ts\"",
        "\"./vnode\"": "\"./vnode.d.ts\""
      },
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/types/vnode.d.ts": {
        "\"./vue\"": "\"./vue.d.ts\""
      },
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/types/plugin.d.ts": {
        "\"./vue\"": "\"./vue.d.ts\""
      },
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/types/umd.d.ts": {
        "\"./index\"": "\"./index.d.ts\"",
        "\"./options\"": "\"./options.d.ts\"",
        "dregExportAssignment:Vue": ""
      }
    },
    "hasDefaultExport": true
  }
};
export default registry;
