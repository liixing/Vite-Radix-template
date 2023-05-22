/** @type {import('prettier').Options} */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  printWidth: 100,
  singleQuote: true,
  bracketSpacing: true,
  pluginSearchDirs: ['.'],
  semi: false,
  trailingComma: 'none'
}
