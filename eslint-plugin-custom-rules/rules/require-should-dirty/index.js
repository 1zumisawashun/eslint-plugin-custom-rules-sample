"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var createRule_1 = require("../utilities/createRule");
var typeGuard_1 = require("../utilities/typeGuard");
var isShouldDirty = function (property) {
    return ((0, typeGuard_1.isProperty)(property) &&
        (0, typeGuard_1.isIdentifier)(property.key) &&
        property.key.name === 'shouldDirty');
};
var isSetValue = function (property) {
    return ((0, typeGuard_1.isProperty)(property) &&
        (0, typeGuard_1.isIdentifier)(property.key) &&
        property.key.name === 'setValue');
};
var isUseForm = function (node) {
    var _a, _b;
    return ((0, typeGuard_1.isVariableDeclarator)(node) &&
        (0, typeGuard_1.isCallExpression)(node.init) &&
        (0, typeGuard_1.isIdentifier)((_a = node.init) === null || _a === void 0 ? void 0 : _a.callee) &&
        ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.name) === 'useForm');
};
var isUseFormContext = function (node) {
    var _a, _b;
    return ((0, typeGuard_1.isVariableDeclarator)(node) &&
        (0, typeGuard_1.isCallExpression)(node.init) &&
        (0, typeGuard_1.isIdentifier)((_a = node.init) === null || _a === void 0 ? void 0 : _a.callee) &&
        ((_b = node.init) === null || _b === void 0 ? void 0 : _b.callee.name) === 'useFormContext');
};
var formatObjectToString = function (obj) {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
};
var fixShouldDirty = function (objectExpression) {
    return function (fixer) {
        var defaultOptions = objectExpression.properties.reduce(function (acc, cur) {
            if ((0, typeGuard_1.isProperty)(cur) && (0, typeGuard_1.isIdentifier)(cur.key) && (0, typeGuard_1.isLiteral)(cur.value)) {
                acc[cur.key.name] = cur.value.value;
            }
            return acc;
        }, {});
        var optionsWithShouldDirty = formatObjectToString(__assign(__assign({}, defaultOptions), { shouldDirty: true }));
        return fixer.replaceText(objectExpression, optionsWithShouldDirty);
    };
};
var reportShouldDirty = function (context, objectExpression) {
    context.report({
        node: objectExpression,
        messageId: 'requireShouldDirty',
        fix: fixShouldDirty(objectExpression),
    });
};
var reportThirdArgument = function (context, node) {
    context.report({ node: node, messageId: 'requireThirdArgument' });
};
var checkSetValue = function (context, callExpression) {
    var secondArgument = callExpression.arguments.at(1);
    var thirdArgument = callExpression.arguments.at(2);
    if (secondArgument && !thirdArgument) {
        reportThirdArgument(context, callExpression);
    }
    if ((0, typeGuard_1.isObjectExpression)(thirdArgument)) {
        var hasShouldDirty = thirdArgument.properties.some(isShouldDirty);
        if (hasShouldDirty)
            return;
        reportShouldDirty(context, thirdArgument);
    }
};
var checkDestructuredVariableDeclarator = function (context, node) {
    var property = (0, typeGuard_1.isObjectPattern)(node.id)
        ? node.id.properties.find(isSetValue)
        : null;
    if ((0, typeGuard_1.isIdentifier)(property === null || property === void 0 ? void 0 : property.value)) {
        var setValueScope = context.sourceCode.getScope(node);
        var setValue = setValueScope.set.get(property.value.name);
        // `setValue`の参照を見つけた場合、次に進む
        setValue === null || setValue === void 0 ? void 0 : setValue.references.forEach(function (r) {
            if ((0, typeGuard_1.isCallExpression)(r.identifier.parent)) {
                checkSetValue(context, r.identifier.parent);
            }
        });
    }
};
exports.rule = (0, createRule_1.createRule)({
    name: 'require-should-dirty',
    defaultOptions: [],
    meta: {
        type: 'problem',
        docs: {
            description: 'This custom ESLint rule enforces setting shouldDirty as the third argument of the setValue function when using the react-hook-form library.',
        },
        messages: {
            requireShouldDirty: 'You must set the shouldDirty option when calling the setValue function in react-hook-form to ensure that the form state (isDirty) is properly managed.',
            requireThirdArgument: 'You must set third argument when calling setValue function in react-hook-form.',
        },
        /**
         * If your rule doesn’t have options, do not set schema: false, but simply omit the schema property or use schema: []
         * @see https://eslint.org/docs/latest/extend/custom-rules#options-schemas
         */
        schema: [],
        fixable: 'code',
    },
    create: function (context) {
        return {
            VariableDeclarator: function (node) {
                // `useForm`または`useFormContext`で初期化されていた場合、次に進む
                if (isUseForm(node) || isUseFormContext(node)) {
                    // ex) const methods = useForm() etc.
                    if ((0, typeGuard_1.isIdentifier)(node.id)) {
                        var methodsScope = context.sourceCode.getScope(node);
                        var methods = methodsScope.set.get(node.id.name);
                        // `methods`の参照を見つけた場合、次に進む
                        methods === null || methods === void 0 ? void 0 : methods.references.forEach(function (r) {
                            var node = r.identifier.parent;
                            // ex) methods.setValue
                            if ((0, typeGuard_1.isMemberExpression)(node) && (0, typeGuard_1.isCallExpression)(node.parent)) {
                                checkSetValue(context, node.parent);
                            }
                            // ex) const { setValue } = methods
                            if ((0, typeGuard_1.isVariableDeclarator)(node)) {
                                checkDestructuredVariableDeclarator(context, node);
                            }
                        });
                    }
                    // ex) const { setValue } = useForm() etc.
                    checkDestructuredVariableDeclarator(context, node);
                }
            },
        };
    },
});
