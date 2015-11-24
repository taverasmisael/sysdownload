'use strict';
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'your-app-name'
    },
    port: 3030,
    db: 'mongodb://localhost/your-app-name-development',
    uploadDir: rootPath + '/public/files'
  },

  test: {
    root: rootPath,
    app: {
      name: 'your-app-name'
    },
    port: 3030,
    db: 'mongodb://localhost/your-app-name-test',
    uploadDir: rootPath + '/public/files'
  },

  production: {
    root: rootPath,
    app: {
      name: 'your-app-name'
    },
    port: 3030,
    db: 'mongodb://localhost/your-app-name-production',
    uploadDir: rootPath + '/public/files'
  }
};

module.exports = config[env];
