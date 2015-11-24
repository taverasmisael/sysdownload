'use strict';
//var config = require('../../config/config.js');
module.exports = function (app) {
  app.use('*', function (req, res) {
    //res.sendFile('index.html', { root: path.join(config.static)});
    res.render('index', {
      title: 'Spartan'
    });
  });
};
