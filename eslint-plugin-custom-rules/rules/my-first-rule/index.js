"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rule = {
    meta: {
        docs: {
            description: 'This rule is run on typescript!',
        },
    },
    create: function (context) {
        return {
            VariableDeclarator: function (node) {
                if (node.id.type === 'Identifier' && node.id.name !== 'bla') {
                    context.report({
                        node: node,
                        message: 'All variabled should be named "bla"!',
                    });
                }
            },
        };
    },
};
exports.default = rule;
