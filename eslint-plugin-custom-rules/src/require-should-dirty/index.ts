import { TSESTree } from '@typescript-eslint/utils'
import { createRule } from '../utilities/createRule'
import {
  isCallExpression,
  isIdentifier,
  isLiteral,
  isMemberExpression,
  isObjectExpression,
  isObjectPattern,
  isProperty,
  isVariableDeclarator,
} from '../utilities/typeGuard'

type Create = ReturnType<typeof createRule>['create']
type Context = Parameters<Create>[number]
type Fix = NonNullable<Parameters<Context['report']>[number]['fix']>
type RuleFix = ReturnType<Fix>
type Fixer = Parameters<Fix>[number]

const isShouldDirty = (property: TSESTree.ObjectLiteralElement): boolean => {
  return (
    isProperty(property) &&
    isIdentifier(property.key) &&
    property.key.name === 'shouldDirty'
  )
}

const isSetValue = (
  property: TSESTree.Property | TSESTree.RestElement,
): boolean => {
  return (
    isProperty(property) &&
    isIdentifier(property.key) &&
    property.key.name === 'setValue'
  )
}

const isUseForm = (node: TSESTree.VariableDeclarator): boolean => {
  return (
    isVariableDeclarator(node) &&
    isCallExpression(node.init) &&
    isIdentifier(node.init?.callee) &&
    node.init?.callee.name === 'useForm'
  )
}

const isUseFormContext = (node: TSESTree.VariableDeclarator): boolean => {
  return (
    isVariableDeclarator(node) &&
    isCallExpression(node.init) &&
    isIdentifier(node.init?.callee) &&
    node.init?.callee.name === 'useFormContext'
  )
}

const formatObjectToString = (obj: unknown): string => {
  return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:')
}

const fixShouldDirty =
  (objectExpression: TSESTree.ObjectExpression) =>
  (fixer: Fixer): RuleFix => {
    const defaultOptions = objectExpression.properties.reduce<
      Record<string, unknown>
    >((acc, cur) => {
      if (isProperty(cur) && isIdentifier(cur.key) && isLiteral(cur.value)) {
        acc[cur.key.name] = cur.value.value
      }
      return acc
    }, {})

    const optionsWithShouldDirty = formatObjectToString({
      ...defaultOptions,
      shouldDirty: true,
    })

    return fixer.replaceText(objectExpression, optionsWithShouldDirty)
  }

const reportShouldDirty = (
  context: Context,
  objectExpression: TSESTree.ObjectExpression,
): void => {
  context.report({
    node: objectExpression,
    messageId: 'requireShouldDirty',
    fix: fixShouldDirty(objectExpression),
  })
}

const reportThirdArgument = (context: Context, node: TSESTree.Node): void => {
  context.report({ node, messageId: 'requireThirdArgument' })
}

const checkSetValue = (
  context: Context,
  callExpression: TSESTree.CallExpression,
): void => {
  const secondArgument = callExpression.arguments.at(1)
  const thirdArgument = callExpression.arguments.at(2)

  if (secondArgument && !thirdArgument) {
    reportThirdArgument(context, callExpression)
  }

  if (isObjectExpression(thirdArgument)) {
    const hasShouldDirty = thirdArgument.properties.some(isShouldDirty)
    if (hasShouldDirty) return
    reportShouldDirty(context, thirdArgument)
  }
}

const checkDestructuredVariableDeclarator = (
  context: Context,
  node: TSESTree.VariableDeclarator,
): void => {
  const property = isObjectPattern(node.id)
    ? node.id.properties.find(isSetValue)
    : null

  if (isIdentifier(property?.value)) {
    const setValueScope = context.sourceCode.getScope(node)
    const setValue = setValueScope.set.get(property.value.name)

    // `setValue`の参照を見つけた場合、次に進む
    setValue?.references.forEach((r) => {
      if (isCallExpression(r.identifier.parent)) {
        checkSetValue(context, r.identifier.parent)
      }
    })
  }
}

export const rule = createRule({
  name: 'require-should-dirty',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'This custom ESLint rule enforces setting shouldDirty as the third argument of the setValue function when using the react-hook-form library.',
    },
    messages: {
      requireShouldDirty:
        'You must set the shouldDirty option when calling the setValue function in react-hook-form to ensure that the form state (isDirty) is properly managed.',
      requireThirdArgument:
        'You must set third argument when calling setValue function in react-hook-form.',
    },
    /**
     * If your rule doesn’t have options, do not set schema: false, but simply omit the schema property or use schema: []
     * @see https://eslint.org/docs/latest/extend/custom-rules#options-schemas
     */
    schema: [],
    fixable: 'code',
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        // `useForm`または`useFormContext`で初期化されていた場合、次に進む
        if (isUseForm(node) || isUseFormContext(node)) {
          // ex) const methods = useForm() etc.
          if (isIdentifier(node.id)) {
            const methodsScope = context.sourceCode.getScope(node)
            const methods = methodsScope.set.get(node.id.name)

            // `methods`の参照を見つけた場合、次に進む
            methods?.references.forEach((r) => {
              const node = r.identifier.parent
              // ex) methods.setValue
              if (isMemberExpression(node) && isCallExpression(node.parent)) {
                checkSetValue(context, node.parent)
              }
              // ex) const { setValue } = methods
              if (isVariableDeclarator(node)) {
                checkDestructuredVariableDeclarator(context, node)
              }
            })
          }
          // ex) const { setValue } = useForm() etc.
          checkDestructuredVariableDeclarator(context, node)
        }
      },
    }
  },
})
