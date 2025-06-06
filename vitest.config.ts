import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    include: ["eslint-plugin-custom-rules/**/*.spec.ts"],
  },
});
