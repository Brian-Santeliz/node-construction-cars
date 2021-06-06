const mongoose = require('mongoose');

const connect = async function () {
  try {
    const objConfig = {
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      };
      await mongoose.connect('mongodb://localhost/actividad2', objConfig);
      console.log('Base de datos conectada correctamente');
  } catch (error) {
    console.error(error.message)
  }
};
module.exports = { connect };
