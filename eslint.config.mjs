import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-disable-next-line prefer-const
/* eslint-disable  @typescript-eslint/no-explicit-any */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    "rules": {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
