"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * use-server を使用しているファイルでは、強制的に promise を返すため、
 * export されている関数が非同期であることをチェックする
 * @see https://github.com/vercel/next.js/pull/62821
 * 以下の記事から引用した
 * @see https://developers.cyberagent.co.jp/blog/archives/49429/
 */
exports.default = {
    'use-server-must-return-promise': {
        meta: {
            type: 'problem',
            docs: {
                description: "Ensure exported functions in files with 'use server' directive return a Promise or are async",
                category: 'Possible Errors',
                recommended: true,
            },
            schema: [],
        },
        create: function (context) {
            var hasUseServerDirective = false;
            return {
                Program: function (node) {
                    // ファイル内に use server が含まれているかどうかをチェック
                    hasUseServerDirective = node.body.some(function (n) {
                        return n.type === 'ExpressionStatement' &&
                            n.expression.type === 'Literal' &&
                            n.expression.value === 'use server';
                    });
                },
                ExportNamedDeclaration: function (node) {
                    if (!hasUseServerDirective) {
                        return;
                    }
                    if (!node.declaration ||
                        node.declaration.type !== 'VariableDeclaration') {
                        return;
                    }
                    for (var _i = 0, _a = node.declaration.declarations; _i < _a.length; _i++) {
                        var declaration = _a[_i];
                        // 関数宣言以外は無視
                        if (!declaration.init ||
                            !(declaration.init.type === 'ArrowFunctionExpression' ||
                                declaration.init.type === 'FunctionExpression') ||
                            declaration.init.body.type !== 'BlockStatement' ||
                            declaration.id.type !== 'Identifier') {
                            continue;
                        }
                        var isAsync = declaration.init.async;
                        // Promise を返しているかどうかをチェック
                        var isPromiseReturned = declaration.init.body.body.some(function (statement) {
                            return statement.type === 'ReturnStatement' &&
                                statement.argument &&
                                statement.argument.type === 'CallExpression' &&
                                statement.argument.callee.type === 'Identifier' &&
                                statement.argument.callee.name === 'Promise';
                        });
                        if (!isPromiseReturned && !isAsync) {
                            context.report({
                                node: node,
                                message: "Exported function '{{name}}' must return a Promise or be async.",
                                data: {
                                    name: declaration.id.name,
                                },
                            });
                        }
                    }
                },
            };
        },
    },
};
