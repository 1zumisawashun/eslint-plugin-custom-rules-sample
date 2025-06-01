import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from './index'

/**
 * @see https://typescript-eslint.io/developers/custom-rules/#testing-typed-rules
 */
const ruleTester = new RuleTester()

ruleTester.run('require-satisfies-for-refetch-variables', rule, {
  valid: [
    {
      // 通常のパターン
      code: `
      export const [mutation] = useMutation({
        refetchQueries: [
          {
            query: null,
            variables: { id: 'id' } satisfies { id: string },
          },
        ],
      })
      `,
    },
    {
      // refetchQueriesの配列を変数に切り出しているパターン
      code: `
      const refetchQueries = [
        {
          query: null,
          variables: { id: 'id' } satisfies { id: string },
        },
      ]
      export const [mutation] = useMutation({
        refetchQueries,
      })
      `,
    },
    {
      // refetchQueriesのオブジェクトを変数に切り出しているパターン
      code: `
      const refetchQuery = {
        query: null,
        variables: { id: 'id' } satisfies { id: string },
      }
      export const [mutation] = useMutation({
        refetchQueries: [refetchQuery],
      })
      `,
    },
    {
      // refetchQueriesのオブジェクトを変数に切り出しているパターン
      code: `
      const variables = { id: 'id' } satisfies { id: string }
      const refetchQuery = {
        query: null,
        variables,
      }
      export const [mutation] = useMutation({
        refetchQueries: [refetchQuery],
      })
      `,
    },
  ],
  invalid: [
    {
      // 通常のパターン
      code: `
      export const [mutation] = useMutation({
        refetchQueries: [
          {
            query: null,
            variables: { id: 'id' },
          },
        ],
      })
      `,
      errors: [{ messageId: 'requireSatisfiesForRefetchVariables' }],
    },
    {
      // refetchQueriesの配列を変数に切り出しているパターン
      code: `
      const refetchQueries = [
        {
          query: null,
          variables: { id: 'id' },
        },
      ]
      export const [mutation] = useMutation({
        refetchQueries,
      })
      `,
      errors: [{ messageId: 'requireSatisfiesForRefetchVariables' }],
    },
    {
      // refetchQueriesのオブジェクトを変数に切り出しているパターン
      code: `
      const refetchQuery = {
        query: null,
        variables: { id: 'id' },
      }
      export const [mutation] = useMutation({
        refetchQueries: [refetchQuery],
      })
      `,
      errors: [{ messageId: 'requireSatisfiesForRefetchVariables' }],
    },
    {
      // refetchQueriesのオブジェクトを変数に切り出しているパターン
      code: `
      const variables = { id: 'id' }
      const refetchQuery = {
        query: null,
        variables,
      }
      export const [mutation] = useMutation({
        refetchQueries: [refetchQuery],
      })
      `,
      errors: [{ messageId: 'requireSatisfiesForRefetchVariables' }],
    },
  ],
})
