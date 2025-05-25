module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      // NOTE: Config source: https://www.nativewind.dev/docs/getting-started/installation#3-add-the-babel-preset
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  }
}
