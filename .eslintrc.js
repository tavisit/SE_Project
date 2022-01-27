module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'max-len': ['warn', { code: 170 }],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-types': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'space-in-parens': 'off',
    'computed-property-spacing': 'off',
    semi: [2, 'always'],
  },
};
