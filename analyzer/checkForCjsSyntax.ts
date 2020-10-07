export function checkForCjsSyntax(node: Record<string, any>): void {
  const cjsErr = "CJS syntax detected, quitting";

  if (
    node.type !== "ExpressionStatement" ||
    node.expression.type !== "AssignmentExpression"
  ) {
    return;
  }

  const { left, right } = node.expression;

  if (
    left.type === "MemberExpression" && left.object.type === "Identifier" &&
    left.object.name === "module"
  ) {
    throw new Error(cjsErr);
  }
  if (
    right.type === "CallExpression" && right.callee.type === "Identifier" &&
    left.callee.name === "require"
  ) {
    throw new Error(cjsErr);
  }
}
