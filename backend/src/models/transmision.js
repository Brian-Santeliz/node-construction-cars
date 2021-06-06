const { Schema, model } = require('mongoose');

const transimisionSchema = new Schema({
  tipo: {
    type: String,
    trim: true,
    required: [true, 'Ingrese el tipo de transmisión'],
    unique : true
  },
});

module.exports = model('Transmision', transimisionSchema);
