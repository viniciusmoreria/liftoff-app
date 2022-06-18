module.exports = {
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  bracketSpacing: true,
  importOrder: ['^(react|react-native)$', '<THIRD_PARTY_MODULES>', '  "^styles(.*)$",', '^[./]'],
  importOrderSeparation: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('./merged-prettier-plugin')],
};
