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
        'Os', 'Crack', 'Ide', 'Seguridad', 'Diseño', 'Utilidades', 'Documento', 'Otros'
      ], default: 'Otros'},
  },
  file: {
    path: {type: String},
    mime: {type: String},
  },
  meta: {
    // It should have a user field where we can put the uploader info
    ratting: {type: Number},
    lastDownload: {type: Date}
  }
});

ProgramSchema.plugin(timestamps);

mongoose.model('Program', ProgramSchema);

