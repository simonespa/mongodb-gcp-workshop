const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development';

  const webpackConfig = {
    target: 'node',
    entry: './src/server',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    devtool: false,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true
      })
    ]
  };

  if (isDevMode) {
    webpackConfig.plugins.push(
      new NodemonPlugin({
        watch: path.resolve(__dirname, 'dist'),
        script: './dist/server.js'
      })
    );
  }

  return webpackConfig;
};
