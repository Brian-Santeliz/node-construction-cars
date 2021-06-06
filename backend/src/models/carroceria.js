const { Schema, model } = require('mongoose');

const carroceriaSchema = new Schema({
  tipo: {
    type: String,
    required: [true, 'Ingrese el tipo de carroceria'],
    trim: true,
    unique : true
  },
});

module.exports = model('Carroceria', carroceriaSchema);
