const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/XPathDynamicValue.js',
  plugins: [new webpack.ProgressPlugin()],
  output: {
    filename: 'XpathDynamicValue.js'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }]
  },
}
