'use strict';

module.exports = {
  sourcecodeDir: 'sourcecode',
  entryFile: 'sourcecode/index.js',
  outputDir: 'production',
  outputFile: 'js.ah.js',
  outputDevFile: 'bundle.js',
  confFile: 'config.ah.js', // file to use for config variables in app
  compressionRegExp: /js\.ah\.js$/,
  themeDir: 'ah-theme', // directory to use for theme.less

  // Variables to use in app
  dev: {
    sitename: 'Affärshögskolan',
    hostname: 'http://ah.demositestore.com',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: 'F71C22F2-48DD-4138-8E86-4E299C61F145',
    formChannel: '47',
    menuLogo: 'logos/affarshogskolan_new.svg',
    headerLogo: 'logos/affarshogskolan_new_white.svg',
    footerLogo: 'logos/affarshogskolan_new_white.svg',
    eventBg: 'images/har-finns-vi-ah.jpg',
  },
  prod: {
    sitename: 'Affärshögskolan',
    hostname: 'http://ah.demositestore.com',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: 'F71C22F2-48DD-4138-8E86-4E299C61F145',
    formChannel: '47',
    menuLogo: 'logos/affarshogskolan_new.svg',
    headerLogo: 'logos/affarshogskolan_new_white.svg',
    footerLogo: 'logos/affarshogskolan_new_white.svg',
    eventBg: 'images/har-finns-vi-ah.jpg',
  },
};
