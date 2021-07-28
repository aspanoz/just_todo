import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CspHtmlWebpackPlugin from 'csp-html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const BASEDIR = path.join(__dirname)
const ASSETS = path.join(BASEDIR, 'static')
const SRC = path.join(BASEDIR, 'src')

const IP = '127.0.0.1'

const HTTPS = false
const PORT = 3000
const API_PORT = 7001
const API_IP = '192.168.20.12'

const configure = {
  mode: "development",
  context: BASEDIR,
  resolve: {
    extensions: ['.js'],
    alias: {
      api: path.resolve(path.join(SRC, 'api')),
      jpos: path.resolve(path.join(SRC, 'jpos'))
    }
  },

  output: {
    path: path.join(BASEDIR, 'build'),
    publicPath: '/',
    filename: 'jeebee_test.js',
  },

  stats: {
    colors: true,
    env: true,
    modules: false,
    moduleTrace: false,
    timings: true,
    usedExports: true
  },

  devtool: 'source-map',
  devServer: {
    useLocalIp: false,
    host: IP,
    port: PORT,
    disableHostCheck: true,
    compress: true,
    contentBase: SRC,

    quiet: false,
    noInfo: false,
    overlay: true, // ошибки компиляции в браузер
    stats: {
      colors: true,
      timings: true,

      errors: true, // отключаю ошибки в консоли
      warnings: true,
      usedExports: false,
      errorDetails: false,
      excludeAssets : [/.*node_modules\/.*/],
      excludeModules : [/.*node_modules\/.*/],
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      hash: false,
      modules: false,
      version: false
    },

    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 600,
      ignored: /node_modules/
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),

    new HtmlWebpackPlugin({
        cspPlugin: {
            enabled: true,
            policy:
            {
            "base-uri": "'self'",
            "object-src": "*",
            "default-src": "*",
            "img-src": [ "'self'", "data:", "yandex.ru *.yandex.ru", "*.yandex.net", "yandex.st" ],
            "script-src": [ "*", "'self'", "'unsafe-inline'" ],
            "worker-src": [ "blob:", ],
            "style-src": [ "*", "'self'", "'unsafe-inline'" ],
            },
            hashEnabled: {
                "script-src": false,
                "style-src": false,
            },
            nonceEnabled: {
                "script-src": false,
                "style-src": false,
            },
        },
      title: 'bee jee test',
      template:  path.join(BASEDIR, 'index.ejs'),
      inject: true,
      appMountId: 'root',
      lang: 'ru-RU'
    }),
   ],

  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'file-loader',
          options: {
            useRelativePath: true,
            publicPath: './',
            name: `assets/[sha512:hash:base64:7].[ext]`
          }
        }]
      }

    ]
  },
}

export default configure
