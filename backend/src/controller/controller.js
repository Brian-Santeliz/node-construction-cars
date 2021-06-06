const autoModel = require('../models/auto');
const carroceriaModel = require('../models/carroceria');
const transmisionModel = require('../models/transmision');
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
    const tiempoDeEspera = {
      tiempoMotor,
      tiempoRueda,
      tiempoTanque,
      tiempoPuerta,
      tiempoAsiento,
      tiempoVentana,
      tiempoCarroceria,
      tiempoTransmision,
    };
    res.status(201).json({ tiempoDeEspera, msg: 'Auto ensamblado totalmente' });
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
    if(!autoEliminado){
      return res.status(400).json('No se pudo eliminar el auto')
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const crearCarroceria = async (req, res) => {
  const { tipo } = req.body;
  try {
    const carroceria = new carroceriaModel({ tipo });
    await carroceria.save();
    res.status(201).json('Carroceria creada correctamente');
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const crearTransmision = async (req, res) => {
  const { tipo } = req.body;
  try {
    const transmision = new transmisionModel({ tipo });
    await transmision.save();
    res.status(201).json('Transmisión creada correctamente');
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
};
