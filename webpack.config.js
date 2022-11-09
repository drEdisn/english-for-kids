const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const CopyPlugin = require("copy-webpack-plugin");

const isDev = process.env.WEBPACK_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  };

  return configObj;
}

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: { collapseWhitespace: isProd },
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
        { from: "images", to: "images" },
      ],
    }),
  ];

  if (isProd) {
    basePlugins.push(
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: extendDefaultPlugins([
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ]),
                },
              ],
            ],
          },
        },
      })
    )
  }

  return basePlugins;
};


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './ts/index.ts',
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
    compress: true,
    hot: false,
    port: 3000
  },
  optimization: optimization(),
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          }, 
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
    
          },
        ],
      },
    ]
  }
}


