# require-satisfies-for-refetch-variables

このカスタム ESLint ルールは、`refetchQueries` の `variables` プロパティに `satisfies` を使用することを強制します。

## ルールの目的

Apollo Client の `refetchQueries` を使用する際に、型安全性を向上させるために `satisfies` を利用することが推奨されます。このルールは、`refetchQueries` の `variables` プロパティに `satisfies` が適用されていない場合に警告を表示し、修正を促します。

## ルールの詳細

このルールは、以下の条件を満たす場合に適用されます：

1. `useMutation` などの Apollo Client のフック内で `refetchQueries` が指定されている。
2. `refetchQueries` の各要素に `variables` プロパティが存在する。
3. `variables` に `satisfies` が適用されていない。

### 例

#### ✅ 正しいコード例

```typescript
const mutation = useMutation(SOME_MUTATION, {
  refetchQueries: [
    {
      query: GET_DATA,
      variables: { sampleId } satisfies RefetchVariablesType,
    },
  ],
})
```

#### ❌ 間違ったコード例

```typescript
const mutation = useMutation(SOME_MUTATION, {
  refetchQueries: [
    {
      query: GET_DATA,
      variables: { sampleId },
    },
  ],
})
```

## 実装の詳細

このルールは、以下の手順で実装されています：

1. `useMutation` などのフックの呼び出しを検出。
2. `refetchQueries` プロパティの存在をチェック。
3. `refetchQueries` の各要素内に `variables` プロパティがあるかを判定。
4. TypeScript の型情報を取得し、`variables` に `satisfies` が適用されているかを確認。
5. `satisfies` が適用されていない場合、警告メッセージを表示し、修正を提案。

## 参考リンク

- [Apollo Client ドキュメント](https://www.apollographql.com/docs/react/data/mutations/#refetching-queries)
- [TypeScript satisfies 演算子](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)