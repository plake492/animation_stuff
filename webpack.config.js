const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: false
  },
  mode: 'development',
  devServer: {
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          // {
          //   loader: 'postcss-loader'
          // },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [{ loader: 'html-loader' }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new ImageminPlugin({
      pngquant: { quality: [0.5, 0.5] }
      // plugins: [imageminMozjpeg({ quality: 50 })]
    })
  ]
}
