// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const noRelativeImports = require('eslint-plugin-no-relative-import-paths')
const pluginQuery = require('@tanstack/eslint-plugin-query')

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      'no-relative-import-paths': noRelativeImports,
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { prefix: '@', rootDir: './' },
      ],
    },
  },
  {
    plugins: {
      '@tanstack/query': pluginQuery,
    },
  },
])
