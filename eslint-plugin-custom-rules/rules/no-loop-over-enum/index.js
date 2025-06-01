"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
var utils_1 = require("@typescript-eslint/utils");
var ts = __importStar(require("typescript"));
var createRule_1 = require("../utilities/createRule");
/**
 * @see https://typescript-eslint.io/developers/custom-rules/#typed-rules
 */
exports.rule = (0, createRule_1.createRule)({
    name: 'no-loop-over-enum',
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Avoid looping over enums.',
        },
        messages: {
            loopOverEnum: 'Do not loop over enums.',
        },
        type: 'suggestion',
        schema: [],
    },
    create: function (context) {
        return {
            ForOfStatement: function (node) {
                // 1. Grab the parser services for the rule
                var services = utils_1.ESLintUtils.getParserServices(context);
                // 2. Find the TS type for the ES node
                var type = services.getTypeAtLocation(node.right);
                // 3. Check the TS type's backing symbol for being an enum
                if (type.symbol.flags & ts.SymbolFlags.Enum) {
                    context.report({
                        messageId: 'loopOverEnum',
                        node: node.right,
                    });
                }
            },
        };
    },
});
