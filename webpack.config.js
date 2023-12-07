const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.jsx', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // The output directory
    filename: 'bundle.js', // The name of our output file
    publicPath: '/' // Required for devServer to serve static assets
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb, files smaller than 8kb will be inlined as Base64 URIs
          }
        }
      },
      {
        test: /\.(mp3|wav|mpe?g|ogg|mp4)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Automatically resolve these extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html', // Path to our original index.html
      filename: 'index.html' // Output file name (in the dist folder)
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000, // The port dev server will run on
    historyApiFallback: true, // Used for single-page apps
  }
};
