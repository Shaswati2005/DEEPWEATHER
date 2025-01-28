import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js ESLint configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add custom rules
  {
    rules: {
      "@typescript-eslint/no-implicit-any":["off"],
      "no-implicit-any":[
        "off"
      ] // You can also use "error" with allowExplicitAny
    },
  },
];

export default eslintConfig;