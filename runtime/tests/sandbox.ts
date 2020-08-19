const testStringExports = `
import x = require("./moduleExports");
var x = require("./moduleExports");
var x = require("./exports").foo;
exports = "foo";
exports.foo = "foo";
`;
