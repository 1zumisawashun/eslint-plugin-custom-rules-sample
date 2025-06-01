# require-should-dirty

このカスタムESLintルールは、`react-hook-form` ライブラリを使用する際に、`setValue` 関数の第3引数に `shouldDirty` を設定することを強制します。

## ルールの目的

`react-hook-form` を使用する際、`setValue` 関数を呼び出すときに `shouldDirty` オプションを設定することで、フォームの状態（ `isDirty` ）が適切に管理されます。このルールは、`shouldDirty` オプションが設定されていない場合に警告を表示し、コードの修正を提案します。

## ルールの詳細

このルールは、以下の条件を満たす場合に適用されます：

1. `useForm` または `useFormContext` フックが使用されている。
2. `setValue` 関数が呼び出されている。
3. `setValue` 関数の第3引数に `shouldDirty` が設定されていない。

### 例

#### ✅ 正しいコード例

```typescript
const { setValue } = useForm()
setValue('fieldName', value, { shouldDirty: true })
```

#### ❌ 間違ったコード例

```typescript
const { setValue } = useForm()
setValue('fieldName', value)
```

## 実装の詳細

このルールは、以下の手順で実装されています：

1. `useForm` または `useFormContext` フックの呼び出しを検出します。
2. これらのフックから返される `methods` オブジェクトを追跡します。
3. `methods` オブジェクトの `setValue` 関数の呼び出しを検出します。
4. `setValue` 関数の第3引数に `shouldDirty` が設定されているかどうかを確認します。
5. 設定されていない場合、警告メッセージを表示し、修正を提案します。

## 参考リンク

- [react-hook-form ドキュメント](https://react-hook-form.com/)
