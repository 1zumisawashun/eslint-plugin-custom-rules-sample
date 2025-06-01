"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiteral = exports.isObjectExpression = exports.isIdentifier = exports.isMemberExpression = exports.isObjectPattern = exports.isProperty = exports.isVariableDeclarator = exports.isCallExpression = exports.isArrayExpression = void 0;
var utils_1 = require("@typescript-eslint/utils");
var isArrayExpression = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.ArrayExpression;
};
exports.isArrayExpression = isArrayExpression;
var isCallExpression = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.CallExpression;
};
exports.isCallExpression = isCallExpression;
var isVariableDeclarator = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.VariableDeclarator;
};
exports.isVariableDeclarator = isVariableDeclarator;
var isProperty = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.Property;
};
exports.isProperty = isProperty;
var isObjectPattern = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.ObjectPattern;
};
exports.isObjectPattern = isObjectPattern;
var isMemberExpression = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.MemberExpression;
};
exports.isMemberExpression = isMemberExpression;
var isIdentifier = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.Identifier;
};
exports.isIdentifier = isIdentifier;
var isObjectExpression = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.ObjectExpression;
};
exports.isObjectExpression = isObjectExpression;
var isLiteral = function (node) {
    return (node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.Literal;
};
exports.isLiteral = isLiteral;
