'use strict';

module.exports = {
  sourcecodeDir: 'sourcecode',
  entryFile: 'sourcecode/index.js',
  outputDir: 'production',
  outputFile: 'js.ph.js',
  outputDevFile: 'bundle.js',
  confFile: 'config.ph.js', // file to use for config variables in app
  compressionRegExp: /js\.ph\.js$/,
  themeDir: 'ph-theme', // directory to use for theme.less

  // Variables to use in app
  dev: {
    sitename: 'Plushögskolan',
    hostname: 'http://plushogskolan.se',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: 'C6313054-6F41-4B68-89C4-9C342FE20177',
    formChannel: '47',
    menuLogo: 'logos/plushogskolan.png',
    headerLogo: 'logos/plushogskolan.png',
    footerLogo: 'logos/plushogskolan.png',
    eventBg: 'images/har-finns-vi-ph.jpg',
  },
  prod: {
    sitename: 'Plushögskolan',
    hostname: 'http://plushogskolan.se',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: 'C6313054-6F41-4B68-89C4-9C342FE20177',
    formChannel: '47',
    menuLogo: 'logos/plushogskolan.png',
    headerLogo: 'logos/plushogskolan.png',
    footerLogo: 'logos/plushogskolan.png',
    eventBg: 'images/har-finns-vi-ph.jpg',
  },
};
