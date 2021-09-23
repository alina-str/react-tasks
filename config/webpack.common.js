const { join } = require("path");
const webpack = require("webpack");
const path = require('path');

function createConfig({ target }) {
  const root = join(__dirname, "../");
  const src = join(root, "src");
  const name = "[name].js";
  const dist = join(root, "dist", target);
  const IS_SERVER = target === "server";
  const IS_CLIENT = target === "client";

  return {
    name: target,
    entry: join(src, target),

    mode: "development",
    // mode: 'production',

    output: {
      path: dist,
      filename: name,
      chunkFilename: name,
      assetModuleFilename: "assets/[name][ext]",
    },
    resolve: {
      modules: ["node_modules", "src"],
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "react-router-dom": path.resolve(root, "node_modules", "react-router-dom"),
     }
    },

    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        IS_CLIENT: JSON.stringify(IS_CLIENT),
        IS_SERVER: JSON.stringify(IS_SERVER),
        "typeof window": JSON.stringify(IS_CLIENT ? "object" : "undefined"),
      }),
    ],
  };
}

module.exports = {
  createConfig,
};
