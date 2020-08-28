const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // Inline files smaller than 10 kB
              limit: 10000,
              name: "/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
};
