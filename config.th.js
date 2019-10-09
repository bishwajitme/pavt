'use strict';

module.exports = {
  sourcecodeDir: 'sourcecode',
  entryFile: 'sourcecode/index.js',
  outputDir: 'production',
  outputFile: 'js.th.js',
  outputDevFile: 'bundle.js',
  confFile: 'config.th.js', // file to use for config variables in app
  compressionRegExp: /js\.th\.js$/,
  themeDir: 'th-theme', // directory to use for theme.less

  // Variables to use in app
  dev: {
    sitename: 'Teknikhögskolan',
    hostname: 'https://teknikhogskolan.se',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: 'F1D6D6D8-ECC3-4E02-BB46-54111EB52206',
    formChannel: '47',
    menuLogo: 'logos/teknikhogskolan_new.svg',
    headerLogo: 'logos/teknikhogskolan_new_white.svg',
    footerLogo: 'logos/teknikhogskolan_new_white.svg',
    eventBg: 'images/har-finns-vi-th.jpg',
  },
  prod: {
    sitename: 'Teknikhögksolan',
    hostname: 'https://teknikhogskolan.se',
    apiEndpoint: '/wp-json/ph',
    assetsPath: '/wp-content/themes/plushogskolan-web/assets/',
    cacheTime: 0,
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: 'F1D6D6D8-ECC3-4E02-BB46-54111EB52206',
    formChannel: '47',
    menuLogo: 'logos/teknikhogskolan_new.svg',
    headerLogo: 'logos/teknikhogskolan_new_white.svg',
    footerLogo: 'logos/teknikhogskolan_new_white.svg',
    eventBg: 'images/har-finns-vi-th.jpg',
  },
};
