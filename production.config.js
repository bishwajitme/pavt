var webpack = require('webpack');
var babelPolyfill =  require('babel-polyfill');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = function (config) {
  return {
    entry: ['babel-polyfill', path.resolve(__dirname, config.entryFile)],
    // Set variableDir as moduleDirectory so that
    // variables will be found using @import '~variables.less';
    resolve: {
      root: path.resolve(__dirname),
      alias: {
        conf: path.resolve(__dirname, config.confFile),
      },
      extensions: ['', '.js', '.less', '.jsx', '.json'],
      modulesDirectories: ["web_modules", "node_modules", config.themeDir, config.sourcecodeDir],
    },
    devtool: 'source-map',
    loader: {
      configEnvironment: 'prod',
    },
    output: {
      path: path.resolve(__dirname, config.outputDir),
      filename: config.outputFile,
      publicPath: '/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `"production"`
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          screw_ie8: true,
          except: ['require', 'export', '$super']
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          // drop_console: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-0']
          }
          //query: {
          //  optional: ['runtime'],
          //  externalHelpers: true,
          //  stage: 0
          //}
        },
        {
          test: /\.less$|\.css$/,
          include: path.resolve('./sourcecode'),
          loader: 'style-loader?singleton!css-loader?modules&localIdentName=[hash:base64:8]!postcss-loader!less-loader',
        },
      ]
    },
    postcss: [
      // Lost is the grid system
      require('lost'),
      autoprefixer({browsers: ['last 2 versions']})
    ],
  };
};