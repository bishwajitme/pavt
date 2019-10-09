var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var theme = process.env.theme;
var themeConfig = require('./config.' + theme + '.js');
var webpack_config_dev = require('./development.config.js');
var config = webpack_config_dev(themeConfig);

new WebpackDevServer(webpack(config), {
  contentBase: 'sourcecode',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  stats: {
    colors: true,
  },
}).listen(1986, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:1986');
});
