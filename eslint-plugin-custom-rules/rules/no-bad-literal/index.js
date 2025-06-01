"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    meta: {
        type: 'problem',
        docs: {
            description: "文字列リテラルの'bad'が使われていたら警告を出す",
        },
    },
    create: function (context) {
        return {
            Literal: function (node) {
                if (node.value && typeof node.value === 'string') {
                    if (node.value.includes('bad')) {
                        context.report({
                            node: node,
                            message: "文字列リテラルに'bad'は使えません。",
                        });
                    }
                }
            },
        };
    },
};
