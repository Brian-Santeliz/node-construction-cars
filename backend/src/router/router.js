const express = require('express');

const router = express.Router();
const { crearAuto, crearCarroceria,crearTransmision,listarAuto, eliminarAuto } = require('../controller/controller');
router.get('/', listarAuto);
router.post('/', crearAuto);
router.post('/crear-carroceria', crearCarroceria);
router.post('/crear-transmision', crearTransmision);
router.delete('/:id', eliminarAuto);
router.put('/');

module.exports = router;
