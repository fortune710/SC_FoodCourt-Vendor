// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');


/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable package exports to avoid import.meta issues
config.resolver.unstable_enablePackageExports = false;
config.resolver.sourceExts.push('cjs');

/*
config.transformer = {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
}

config.resolver = {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
}
*/

module.exports = withNativeWind(config, { input: './global.css' })
//module.exports = config;