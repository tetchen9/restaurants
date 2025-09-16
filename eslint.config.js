import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import tsParser from '@typescript-eslint/parser'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ),

  {
    ignores: ['dist', 'eslint.config.js'],
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      // 'indent': ['error', 2],
      'eol-last': ['error', 'always'],
    },
    languageOptions: {
      parser: tsParser,  // pass the imported parser object
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    }
  }
]
