'use strict';

var util = require('../helpers/utilities');

module.exports = function (req, res) {
    var info = {
      disk: '',
      memory: '',
      db: 0
    };
    util.disk().then(function (diskInfo) {
      diskInfo.forEach(function (drive) {
        var percentage = 0;
        percentage = ((parseInt(drive.free) * 100) / parseInt(drive.total)).toFixed(2);
        drive.freePercentage = percentage;
      });
      info.disk = diskInfo;
      util.db().then(function (dbInfo) {
          info.db = dbInfo;
          res.json(info);
      });
    });
};
