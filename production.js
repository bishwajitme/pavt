'use strict';

var theme = process.env.theme;
var webpack_config_prod = require('./production.config.js');
var config = require('./config.' + theme + '.js');

module.exports = webpack_config_prod(config);