import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import typescriptEslintParser from '@typescript-eslint/parser'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'

export default [
  {
    ignores: ['.astro', 'dist/'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
        ...globals.es6,
        window: true,
      },
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'no-var': 2,
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 1,
    },
  },
]
