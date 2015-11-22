'use strict';

var util = require('../helpers/utilities');

module.exports = function (req, res) {
    var info = {
      disk: '',
      memory: '',
      db: 0,
      cores: 0
    };
    util.disk().then(function (diskInfo) {
      diskInfo.forEach(function (drive) {
        var fPercentage = 0,
            uPercentage = 0;
        fPercentage = ((parseInt(drive.free) * 100) / parseInt(drive.total)).toFixed(2);
        drive.freePercentage = fPercentage;
        uPercentage = ((parseInt(drive.used) * 100) / parseInt(drive.total)).toFixed(2);
        drive.usedPercentage = uPercentage;
      });
      info.disk = diskInfo;
      util.db().then(function (dbInfo) {
          info.db = dbInfo;
          info.cores = require('os').cpus().length;
          res.json(info);
      });
    });
};
