import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginCustomRules from "eslint-plugin-custom-rules";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/eslint-plugin-custom-rules/",
      "!**/eslint-plugin-custom-rules/src/",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    name: "custom-rules",
    files: ["**/*.{ts,tsx}"],
    plugins: { "custom-rules": eslintPluginCustomRules },
    rules: {
      "custom-rules/disallow-identifiers": "error",
      "custom-rules/my-first-rule": "error",
      "custom-rules/no-bad-literal": "error",
      "custom-rules/no-loop-over-enum": "error",
      "custom-rules/no-omit-utility-type": "error",
      "custom-rules/require-should-dirty": "error",
      "custom-rules/require-satisfies-for-refetch-variables": "error",
      "custom-rules/use-server-must-return-promise": "error",
    },
  },
];

export default eslintConfig;
