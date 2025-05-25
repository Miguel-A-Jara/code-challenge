// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// NOTE: Config source: https://www.nativewind.dev/docs/getting-started/installation#4-modify-your-metroconfigjs
module.exports = withNativeWind(config, { input: './styles.css' })
