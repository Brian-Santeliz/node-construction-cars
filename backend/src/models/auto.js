const { Schema, model, Types } = require('mongoose');

const autoSchema = new Schema({
  motor: {
    type: String,
    trim: true,
  },
  tanque: {
    type: String,
    trim: true,
  },
  rueda: {
    type: String,
    trim: true,
  },
  puerta: {
    type: String,
    trim: true,
  },
  ventana: {
    type: String,
    trim: true,
  },
  asiento: {
    type: String,
    trim: true,
  },
  carroceria: {
    type: Types.ObjectId,
    ref: 'Carroceria',
  },
  transmision: {
    type: Types.ObjectId,
    ref: 'Transmision',
  },
});

module.exports = model('Auto', autoSchema);
