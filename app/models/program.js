'use strict';
// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  timestamps = require('mongoose-timestamp');

var ProgramSchema = new Schema({
  info: {
    name: {type: String},
    resume: {type: String},
    category: {type: String, enum: [
        'Sistema Operativo', 'Crack', 'Ide', 'Seguridad', 'Diseño', 'Utilidad', 'Documento', 'Otros'
      ], default: 'Otros'},
  },
  file: {
    path: {type: String},
    mime: {type: String},
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

