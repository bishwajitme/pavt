'use strict';

module.exports = {
  sourcecodeDir: 'sourcecode',
  entryFile: 'sourcecode/index.js',
  outputDir: 'production',
  outputFile: 'js.vh.js',
  outputDevFile: 'bundle.js',
  confFile: 'config.vh.js', // file to use for config variables in app
  compressionRegExp: /js\.vh\.js$/,
  themeDir: 'vh-theme', // directory to use for theme.less

  // Variables to use in app
  dev: {
    sitename: 'Vårdyrkeshögskolan',
    hostname: 'https://vardyrkeshogskolan.se',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: '5ED87713-B5E0-4B09-8630-CD6D550C5468',
    formChannel: '47',
    menuLogo: 'logos/vardyrkeshogskolan_new.svg',
    headerLogo: 'logos/vardyrkeshogskolan_new_white.svg',
    footerLogo: 'logos/vardyrkeshogskolan_new_white.svg',
    eventBg: 'images/har-finns-vi-vh.jpg',
  },
  prod: {
    sitename: 'Vårdyrkeshögskolan',
    hostname: 'https://vardyrkeshogskolan.se',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: '5ED87713-B5E0-4B09-8630-CD6D550C5468',
    formChannel: '47',
    menuLogo: 'logos/vardyrkeshogskolan_new.svg',
    headerLogo: 'logos/vardyrkeshogskolan_new_white.svg',
    footerLogo: 'logos/vardyrkeshogskolan_new_white.svg',
    eventBg: 'images/har-finns-vi-vh.jpg',
  },
};
