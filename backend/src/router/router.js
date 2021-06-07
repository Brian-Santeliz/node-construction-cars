const express = require('express');

const router = express.Router();
const {
  crearAuto,
  crearCarroceria,
  crearTransmision,
  listarAuto,
  eliminarAuto,
  actualizarAuto,
  obtenerTransmision,
  obtenerCarroceria,
  obtenerAutoId
} = require('../controller/controller');
router.get('/', listarAuto);
router.get('/auto-id/:id', obtenerAutoId);
router.post('/', crearAuto);
router.delete('/:id', eliminarAuto);
router.put('/editar-auto/:id', actualizarAuto);

router.post('/crear-transmision', crearTransmision);
router.post('/crear-carroceria', crearCarroceria);
router.get('/obtener-transmision', obtenerTransmision);
router.get('/obtener-carroceria', obtenerCarroceria);
module.exports = router;
