import { ESLintUtils } from '@typescript-eslint/utils'

export const createRule = ESLintUtils.RuleCreator((name) => {
  const projectPath = process.cwd()
  return `${projectPath}/eslint-plugin-custom-rules/src/${name}/README.md`
})
