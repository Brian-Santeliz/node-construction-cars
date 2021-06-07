const autoModel = require('../models/auto');
const carroceriaModel = require('../models/carroceria');
const transmisionModel = require('../models/transmision');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM();
const {
  ensamblarMotor,
  ensamblarRueda,
  ensamblarTanque,
  ensamblarPuerta,
  ensamblarAsiento,
  ensamblarVentana,
  ensamblarCarroceria,
  ensamblarTransmision,
} = require('../utils/ensamblaje');

const crearAuto = async (req, res) => {
  const {
    motor,
    tanque,
    rueda,
    puerta,
    asiento,
    ventana,
    carroceria,
    transmision,
  } = req.body;
  try {
    const autoAConstruir = new autoModel();
    const { modeloMotor, tiempoMotor } = await ensamblarMotor(
      autoAConstruir,
      motor
    );
    const { modeloRueda, tiempoRueda } = await ensamblarRueda(
      modeloMotor,
      rueda
    );
    const { modeloTanque, tiempoTanque } = await ensamblarTanque(
      modeloRueda,
      tanque
    );
    const { modeloPuerta, tiempoPuerta } = await ensamblarPuerta(
      modeloTanque,
      puerta
    );
    const { modeloAsiento, tiempoAsiento } = await ensamblarAsiento(
      modeloPuerta,
      asiento
    );
    const { modeloVentana, tiempoVentana } = await ensamblarVentana(
      modeloAsiento,
      ventana
    );
    const [carroceriaRespuesta] = await carroceriaModel.find({
      tipo: carroceria,
    });
    const { _id: idCarroceria } = carroceriaRespuesta;
    const { modeloCarroceria, tiempoCarroceria } = await ensamblarCarroceria(
      modeloVentana,
      idCarroceria
    );
    const [transmisionRespuesta] = await transmisionModel.find({
      tipo: transmision,
    });
    const { _id: idTransmision } = transmisionRespuesta;
    const { tiempoTransmision } = await ensamblarTransmision(
      modeloCarroceria,
      idTransmision
    );
    const tiempoDeEspera = [
      tiempoMotor,
      tiempoRueda,
      tiempoTanque,
      tiempoPuerta,
      tiempoAsiento,
      tiempoVentana,
      tiempoCarroceria,
      tiempoTransmision,
    ];
    const valorMaximo = Math.max(...tiempoDeEspera);
    res.status(201).json({
      tiempoEmsablado: valorMaximo,
      msg: 'Auto ensamblado totalmente',
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const listarAuto = async (req, res) => {
  try {
    const autosRegistrados = await autoModel
      .find()
      .populate('transmision', 'tipo')
      .populate('carroceria', 'tipo');
    res.status(200).json(autosRegistrados);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const eliminarAuto = async (req, res) => {
  try {
    const { id } = req.params;
    const autoEliminado = await autoModel.findByIdAndDelete({ _id: id });
    if (!autoEliminado) {
      return res.status(400).json('No se pudo eliminar el auto');
    }
    res.status(200).json('Auto eliminado correctamente');
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const actualizarAuto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      motor,
      tanque,
      rueda,
      puerta,
      asiento,
      ventana,
      carroceria,
      transmision,
    } = req.body;
    const inicio = window.performance.now();
    const [carroceriaRespues] = await carroceriaModel.find({
      tipo: carroceria,
    });
    const [transmisionRespuesta] = await transmisionModel.find({
      tipo: transmision,
    });
    const autoActualizado = await autoModel.findByIdAndUpdate(
      { _id: id },
      {
        motor,
        tanque,
        rueda,
        puerta,
        asiento,
        ventana,
        carroceria: carroceriaRespues._id,
        transmision: transmisionRespuesta._id,
      }
    );
    const final = window.performance.now();
    const total = inicio - final / 1000;
    if (!autoActualizado) {
      return res.status(400).json('No se pudó actualizar el auto');
    }
    res.status(200).json({
      msg: 'Auto actualizado correctamente',
      tiempo: total.toFixed(2),
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const crearCarroceria = async (req, res) => {
  const { tipo } = req.body;
  try {
    const encontrado = await carroceriaModel.findOne({ tipo });
    if (encontrado) {
      return res.json('Esta carrocería se encuentra registrada previamente');
    }
    const carroceria = new carroceriaModel({ tipo });
    await carroceria.save();
    res.status(201).json('Carrocería creada correctamente');
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const obtenerAutoId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await autoModel
      .findById({ _id: id })
      .populate('transmision')
      .populate('carroceria');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const crearTransmision = async (req, res) => {
  const { tipo } = req.body;
  try {
    const encontrado = await transmisionModel.findOne({ tipo });
    if (encontrado) {
      return res.json('Esta transmisión ya encuentra registrada');
    }
    const transmision = new transmisionModel({ tipo });
    await transmision.save();
    res.status(201).json('Transmisión creada correctamente');
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const obtenerTransmision = async (req, res) => {
  try {
    const response = await transmisionModel.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const obtenerCarroceria = async (req, res) => {
  try {
    const response = await carroceriaModel.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  crearAuto,
  crearCarroceria,
  crearTransmision,
  listarAuto,
  eliminarAuto,
  actualizarAuto,
  obtenerTransmision,
  obtenerCarroceria,
  obtenerAutoId,
};
