import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'

export const isArrayExpression = (node?: TSESTree.Node | null) => {
  return node?.type === AST_NODE_TYPES.ArrayExpression
}
export const isCallExpression = (node?: TSESTree.Node | null) => {
  return node?.type === AST_NODE_TYPES.CallExpression
}
export const isVariableDeclarator = (node?: TSESTree.Node) => {
  return node?.type === AST_NODE_TYPES.VariableDeclarator
}
export const isProperty = (node?: TSESTree.Node) => {
  return node?.type === AST_NODE_TYPES.Property
}
export const isObjectPattern = (node?: TSESTree.Node) => {
  return node?.type === AST_NODE_TYPES.ObjectPattern
}
export const isMemberExpression = (node?: TSESTree.Node) => {
  return node?.type === AST_NODE_TYPES.MemberExpression
}
export const isIdentifier = (
  node?: TSESTree.Node | TSESTree.SpreadElement | TSESTree.Expression | null,
) => {
  return node?.type === AST_NODE_TYPES.Identifier
}
export const isObjectExpression = (
  node?: TSESTree.SpreadElement | TSESTree.Expression | null,
) => {
  return node?.type === AST_NODE_TYPES.ObjectExpression
}
export const isLiteral = (node?: TSESTree.Node) => {
  return node?.type === AST_NODE_TYPES.Literal
}
