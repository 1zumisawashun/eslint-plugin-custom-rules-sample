import { ESLintUtils } from '@typescript-eslint/utils'
import * as ts from 'typescript'
import { createRule } from '../utilities/createRule'

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#typed-rules
 */
export const rule = createRule({
  name: 'no-loop-over-enum',
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Avoid looping over enums.',
    },
    messages: {
      loopOverEnum: 'Do not loop over enums.',
    },
    type: 'suggestion',
    schema: [],
  },
  create(context) {
    return {
      ForOfStatement(node) {
        // 1. Grab the parser services for the rule
        const services = ESLintUtils.getParserServices(context)

        // 2. Find the TS type for the ES node
        const type = services.getTypeAtLocation(node.right)

        // 3. Check the TS type's backing symbol for being an enum
        if (type.symbol.flags & ts.SymbolFlags.Enum) {
          context.report({
            messageId: 'loopOverEnum',
            node: node.right,
          })
        }
      },
    }
  },
})
