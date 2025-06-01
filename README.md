# eslint-plugin-custom-rules-sample

## Overview

ESLint カスタムルールの素振りをするためのリポジトリです。

## Installation

- clone

```bash
$ gh repo clone 1zumisawashun/eslint-plugin-custom-rules-sample
$ cd eslint-plugin-custom-rules-sample
$ code .
```

- install

```bash
$ npm install
```

- 静的解析を実行する

```bash
$ npm run lint:js
```

- 上記の手順で失敗する場合 [Troubleshoot](#Troubleshoot)を確認してください

## トランスパイルありで TypeScript で作ったカスタムルールを導入する

TypeScript で作成したカスタムルールをトランスパイルしながら作業する

```bash
$ npm run lint:js:watch
```

File Protocol 経由でローカルのパッケージをインストールする

```bash
$ npm i -D ./eslint-plugin-custom-rules
```

## トランスパイルなしで TypeScript で作ったカスタムルールを導入する

eslint.config.mjs -> eslint.config.ts に変更する必要があります。詳細は以下の記事をご覧ください。

- https://zenn.dev/castingone_dev/articles/eslint-prefer-destructuring-shorthand
- https://roboin.io/article/2024/08/13/eslint-now-supports-typescript-based-config-files/

以下のリポジトリで実装してみました。

https://github.com/1zumisawashun/project-bd-client

## AST Explorer

カスタムルールを作成する際に AST Explorer を使用します。以下の中から使用感の良いものをご利用ください。

- http://explorer.eslint.org/
- https://astexplorer.net/
- https://ts-ast-viewer.com/
- https://typescript-eslint.io/play/

## Troubleshoot

- なし

## その他ドキュメント

See [Configuration Reference](https://github.com/1zumisawashun).
