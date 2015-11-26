'use strict';
// Example model
var config = require('../../config/config');

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

var ProgramSchema = new Schema({
  info: {
    name: {type: String},
    resume: {type: String},
    category: config.categories.cat4Model,
  },
  file: {
    path: {type: String},
    mime: {type: String},
    size: {type: Number}
  },
  meta: {
    // It should have a user field where we can put the uploader info
    ratting: {type: Number, default: 0},
    lastDownload: {type: Date, default: Date.now()}
  }
});

ProgramSchema.plugin(timestamps);

ProgramSchema.methods.uprate = function () {
  return this.meta.ratting += 1;
};

mongoose.model('Program', ProgramSchema);

