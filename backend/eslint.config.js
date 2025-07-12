import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
import pluginPrettier from "eslint-plugin-prettier"
import configPrettier from "eslint-config-prettier/flat"

export default defineConfig([
  js.configs.recommended,
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // "prettier/prettier": "warn",
      "no-console": "warn",
      "no-process-exit": "off",
    },
  },
  configPrettier,
])
