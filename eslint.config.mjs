import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import configPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      pluginPrettier
    ],
    plugins: { import: importPlugin, 'simple-import-sort': simpleImportSort },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      ...configPrettier.rules,
      'prettier/prettier': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error']
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      'react-refresh/only-export-components': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react/next` related packages come first.
            ['^react', '^@?\\w'],
            ['^next', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],

            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Side effect imports.
            ['^\\u0000'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css|scss)$']
          ]
        }
      ]
    }
  }
]);
