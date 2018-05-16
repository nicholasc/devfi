module.exports = {
  mode: "development",
  entry: "./src/index.js",
  target: "electron-renderer",
  output: {
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
