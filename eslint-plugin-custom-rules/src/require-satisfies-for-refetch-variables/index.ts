import { TSESTree } from '@typescript-eslint/utils'
import * as ts from 'typescript'
import { createRule } from '../utilities/createRule'
import {
  isArrayExpression,
  isIdentifier,
  isObjectExpression,
  isProperty,
  isVariableDeclarator,
} from '../utilities/typeGuard'

type Create = ReturnType<typeof createRule>['create']
type Context = Parameters<Create>[number]

const isRefetchQueries = (node: TSESTree.Property) => {
  return isIdentifier(node.key) && node.key.name === 'refetchQueries'
}
const isHook = (node: TSESTree.CallExpression): boolean => {
  return isIdentifier(node.callee) && /^use[A-Z]\w*/.test(node.callee.name)
}
const isVariables = (node: TSESTree.Property) => {
  return isIdentifier(node.key) && node.key.name === 'variables'
}

// 実質的な型チェックはこの関数でのみ実施、他のロジックは通常のASTノードでの検出になる
const checkSatisfies = (context: Context, node: TSESTree.Node) => {
  const parserServices = context.sourceCode.parserServices

  if (!parserServices?.esTreeNodeToTSNodeMap) {
    throw new Error('This rule requires `parserOptions.project`.')
  }

  const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node) // TypeScriptのASTノードを取得

  if (tsNode.kind !== ts.SyntaxKind.SatisfiesExpression) {
    context.report({ node, messageId: 'requireSatisfiesForRefetchVariables' })
  }
}

const checkRefetchQuery = (
  context: Context,
  node: TSESTree.ObjectExpression,
) => {
  node.properties.forEach((p) => {
    if (!isProperty(p)) return

    // 通常のパターン
    if (!isIdentifier(p.value) && isVariables(p)) {
      checkSatisfies(context, p.value)
    }

    // variablesが変数に切り出されているパターン
    if (isIdentifier(p.value)) {
      const variablesScope = context.sourceCode.getScope(p)
      const variables = variablesScope.set.get(p.value.name)

      variables?.references.forEach((r) => {
        const parent = r.identifier.parent
        if (isVariableDeclarator(parent) && isObjectExpression(parent.init)) {
          checkSatisfies(context, parent.init)
        }
      })
    }
  })
}

const checkRefetchQueries = (
  context: Context,
  node: TSESTree.ArrayExpression,
) => {
  node.elements.forEach((e) => {
    // 通常のパターン
    if (isObjectExpression(e)) {
      checkRefetchQuery(context, e)
    }
    // refetchQueriesのオブジェクトが外に切り出しているパターン
    if (isIdentifier(e)) {
      const refetchQueryScope = context.sourceCode.getScope(e)
      const refetchQuery = refetchQueryScope.set.get(e.name)

      refetchQuery?.references.forEach((r) => {
        const parent = r.identifier.parent
        if (isVariableDeclarator(parent) && isObjectExpression(parent.init)) {
          checkRefetchQuery(context, parent.init)
        }
      })
    }
  })
}

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#typed-rules
 * @see https://www.apollographql.com/docs/react/data/mutations#refetching-queries
 */
export const rule = createRule({
  name: 'require-satisfies-for-refetch-variables',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'The refetchQueries property should use the satisfies operator to ensure type safety and prevent unexpected runtime errors.',
    },
    messages: {
      requireSatisfiesForRefetchVariables:
        'The refetchQueries property should use the satisfies operator to ensure type safety and prevent unexpected runtime errors.',
    },
    /**
     * If your rule doesn’t have options, do not set schema: false, but simply omit the schema property or use schema: []
     * @see https://eslint.org/docs/latest/extend/custom-rules#options-schemas
     */
    schema: [],
  },
  create(context) {
    return {
      // MEMO: もし解析時間がかかりそうなら〇〇.generated.tsからフィルタリングするのアリかも
      CallExpression(node) {
        if (isHook(node)) {
          const objectExpression = node.arguments.find(isObjectExpression)
          if (!objectExpression) return

          const property = objectExpression.properties.find(isProperty)
          if (!property) return

          if (!isRefetchQueries(property)) return

          // 通常のパターン
          if (isArrayExpression(property.value)) {
            checkRefetchQueries(context, property.value)
          }

          // refetchQueriesの配列が外に切り出しているパターン
          if (isIdentifier(property.key)) {
            const refetchQueriesScope = context.sourceCode.getScope(node)
            const refetchQueries = refetchQueriesScope.set.get(
              property.key.name,
            )

            refetchQueries?.references.forEach((r) => {
              const parent = r.identifier.parent
              if (
                isVariableDeclarator(parent) &&
                isArrayExpression(parent.init)
              ) {
                checkRefetchQueries(context, parent.init)
              }
            })
          }
        }
      },
    }
  },
})
