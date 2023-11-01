module.exports = {
  extends: [
    // TODO: Enable prettier
    // 'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  customSyntax: 'postcss-html',
  rules: {
    'selector-class-pattern': null,
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-import-no-partial-leading-underscore': null, // deprecated
  },
}
