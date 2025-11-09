const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Enable inline requires to improve startup by deferring module loading
config.transformer = config.transformer || {};
config.transformer.inlineRequires = true;

module.exports = withNativeWind(config, { input: "./app/global.css" });