module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "warn",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "space-in-parens": "off",
    "computed-property-spacing": "off",
    "max-len": "warn",
    semi: [2, "always"],
  },
};
