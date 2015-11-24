'use strict';
// Requiring packages
//var  server = require('server-info');
//Provitional package for getting only diskinfo :(
var disktool = require('freediskspace'),
    mongoose = require('mongoose'),
    Program = mongoose.model('Program');

// Main Module Object
var utilities = {
  disk: getDiskInfo,
  memory: getMemoryInfo,
  db: getDataBaseInfo,
  system: getSystemInfo
};

module.exports = utilities;

function getSystemInfo () {
  // This will handdle OS information
}

function getDiskInfo () {
  // Returned Promise
  var diskInfo;

  // Promise Returned by this function
  function disks (resolve, reject) {
    var result = [];
    disktool.driveList(function (err, drivers) {
        if (err) {
          reject(err);
        }
        // Here's where magics happens
        new Promise(function (resolve, reject) {
          drivers.forEach(function (disk) {
            getDetails(disk).then(function (currentInfo) {
              result.push(currentInfo);
            }).catch(function (reason) {
              console.log(reason);
              reject(reason);
            }).then(function () {
              // Only resolve if all driversInfo is full loaded
              if(result.length === drivers.length) {
                resolve(result);
              }
            });
          });
        }).then(function(info) {
          // When all driversInfo is full loaded, then resolve the main promise
          resolve(info);
        }).catch(function (reason) {
          console.log('Program had stopped due: ', reason);
        });
      });
  }

  diskInfo = new Promise(disks);
  return diskInfo;

  /**
   * Promise Function that returns `DiskName` information
   * @param  {String} diskName The name or path of the disk
   * @return {Promise}          Its resolved with the diskInformation
   */
  function getDetails (diskName) {
    return new Promise(function (resolve, reject) {
      disktool.detail(diskName).then(function (detail) {
        resolve(detail);
      }).catch(function (reason) {
        reject(reason);
      });
    });
  }
}

function getMemoryInfo () {
  // This will Handdle Memory information
}

function getDataBaseInfo () {

  var dbInfo;
  function getDBCount (reject, resolve) {
    Program.count().then(function (err, count) {
      if (err) {
        reject(err);
      }
      resolve(count);
    });
  }

  dbInfo = new Promise(getDBCount);
  return dbInfo;
}
