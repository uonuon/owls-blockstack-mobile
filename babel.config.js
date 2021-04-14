module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["react-native-reanimated/plugin"],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".android.js",
          ".android.tsx",
          ".ios.js",
          ".ios.tsx",
        ],
        alias: {
          assets: "./src/assets",
          components: "./src/components",
          screens: "./src/screens",
          themes: "./src/themes",
          utils: "./src/utils",
          hooks: "./src/hooks",
          contexts: "./src/contexts",
          navigation: "./src/navigation",
          i18n: "./src/i18n",
          shared: "./shared",
        },
      },
    ],
  ],
};
