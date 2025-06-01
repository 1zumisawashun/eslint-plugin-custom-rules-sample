import type { Rule } from 'eslint'

export default {
  meta: {
    type: 'problem',
    docs: {
      description: "文字列リテラルの'bad'が使われていたら警告を出す",
    },
  },
  create(context: Rule.RuleContext) {
    return {
      Literal(node) {
        if (node.value && typeof node.value === 'string') {
          if (node.value.includes('bad')) {
            context.report({
              node,
              message: "文字列リテラルに'bad'は使えません。",
            })
          }
        }
      },
    }
  },
} satisfies Rule.RuleModule
