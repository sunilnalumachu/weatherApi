const slsw = require('serverless-webpack');
module.exports = {
  entry: slsw.lib.entries,
  mode: 'production',
  // output: set by the plugin
  // target   : 'node',
  // devtool  : 'source-map',
  externals: [
    /aws-sdk/ // Available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {node: '12.18'},
                useBuiltIns: true, // Prefer built in ES features as much as possible instead of using polyfills
                modules: false, // See https://babeljs.io/docs/plugins/preset-env/#optionsmodules
                loose: true
              }]
            ]
          }
        }
      }
    ]
  }
};
