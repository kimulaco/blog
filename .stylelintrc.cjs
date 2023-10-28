module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  customSyntax: 'postcss-html',
  rules: {
    'prettier/prettier': true,
    'scss/at-import-no-partial-leading-underscore': null, // deprecated
  },
}
