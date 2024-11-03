/** @type {import('stylelint').Config} */
const config = {
  extends: [
    // TODO: Enable prettier
    // 'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    'color-named': ['never'],
    'selector-class-pattern': null,
    'rule-empty-line-before': null,
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-import-no-partial-leading-underscore': null, // deprecated
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-pattern': null,
  },
  overrides: [
    {
      files: ['**/*.astro'],
      extends: ['stylelint-config-html/astro'],
    },
  ],
}

export default config
