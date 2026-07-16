// Babel config — required by NativeWind to compile className props
// into React Native StyleSheet objects at build time.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
