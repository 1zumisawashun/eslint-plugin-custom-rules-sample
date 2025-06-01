"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
var utils_1 = require("@typescript-eslint/utils");
exports.createRule = utils_1.ESLintUtils.RuleCreator(function (name) {
    var projectPath = process.cwd();
    return "".concat(projectPath, "/eslint-plugin-custom-rules/src/").concat(name, "/README.md");
});
