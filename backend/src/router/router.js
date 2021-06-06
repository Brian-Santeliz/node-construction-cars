const express = require('express');

const router = express.Router();
const {
  crearAuto,
  crearCarroceria,
  crearTransmision,
  listarAuto,
  eliminarAuto,
  actualizarAuto,
} = require('../controller/controller');
router.get('/', listarAuto);
router.post('/', crearAuto);
router.post('/crear-carroceria', crearCarroceria);
router.post('/crear-transmision', crearTransmision);
router.delete('/:id', eliminarAuto);
router.put('/:id', actualizarAuto);

module.exports = router;
