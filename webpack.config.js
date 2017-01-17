var webpack = require('webpack');  
module.exports = {  
  entry: './docs/app.ts',
  output: {
    filename: './docs/app.js'
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  // Add minification
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' }
    ]
  }
}
