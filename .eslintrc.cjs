const path = require('path')
/** @type {import('eslint').Linter.Config} */

module.exports = {
  env: { browser: true, es2020: true },
  extends: ['standard-with-typescript', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.resolve(__dirname, 'tsconfig.json')
  },
  plugins: ['react-refresh'],
  rules: {
    // 'react-refresh/only-export-components': 'warn',
    indent: 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: true
      }
    ],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    'multiline-ternary': 'off'
  }
}
