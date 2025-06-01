"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var createRule_1 = require("../utilities/createRule");
exports.rule = (0, createRule_1.createRule)({
    create: function (context) {
        return {
            TSTypeReference: function (node) {
                if (node.typeName.type === 'Identifier' &&
                    node.typeName.name === 'Omit') {
                    context.report({
                        node: node,
                        messageId: 'no-omit-utility-type',
                    });
                }
            },
        };
    },
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow the use of the `Omit` utility type',
        },
        messages: {
            'no-omit-utility-type': 'The `Omit` utility type is forbidden',
        },
        schema: [],
    },
    name: 'no-omit-utility-type',
    defaultOptions: [],
});
