'use strict';
module.exports = function (app) {
  app.use('*', function (req, res) {
    res.render('index', {
      title: 'SysDownload',
      subtitle: 'Servidor Práctico de Archivos'
    });
  });
};
