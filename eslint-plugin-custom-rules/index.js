module.exports = {
  rules: {
    "disallow-identifiers": require("./rules/disallow-identifiers").default[
      "disallow-identifiers"
    ],
    "my-first-rule": require("./rules/my-first-rule").default,
    "no-bad-literal": require("./rules/no-bad-literal").default,
    "no-loop-over-enum": require("./rules/no-loop-over-enum").rule,
    "no-omit-utility-type": require("./rules/no-omit-utility-type").rule,
    "require-satisfies-for-refetch-variables":
      require("./rules/require-satisfies-for-refetch-variables").rule,
    "require-should-dirty": require("./rules/require-should-dirty").rule,
    "use-server-must-return-promise":
      require("./rules/use-server-must-return-promise").default[
        "use-server-must-return-promise"
      ],
  },
};
