module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ".",
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.tsx",
            ".android.tsx",
            ".js",
            ".ts",
            ".tsx",
            ".json",
          ],
          alias: {
            "~/": "./src",
            src: "./src",
          },
        },
      ],
    ],
  };
};
