const { JSDOM } = require('jsdom');
const { window } = new JSDOM();

const ensamblarMotor = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.motor = valor;
  const modeloMotor = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoMotor = tiempoTotal.toFixed(
    2
  );
  return { modeloMotor, tiempoMotor };
};
const ensamblarRueda = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.rueda = valor;
  const modeloRueda = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoRueda =tiempoTotal.toFixed(
    2
  )
  return { modeloRueda, tiempoRueda };
};
const ensamblarTanque = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.tanque = valor;
  const modeloTanque = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoTanque = tiempoTotal.toFixed(
    2
  )
  return { modeloTanque, tiempoTanque };
};
const ensamblarPuerta = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.puerta = valor;
  const modeloPuerta = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoPuerta = tiempoTotal.toFixed(
    2
  )
  return { modeloPuerta, tiempoPuerta };
};
const ensamblarAsiento = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.asiento = valor;
  const modeloAsiento = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoAsiento = tiempoTotal.toFixed(
    2
  )
  return { modeloAsiento, tiempoAsiento };
};
const ensamblarVentana = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.ventana = valor;
  const modeloVentana = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoVentana = tiempoTotal.toFixed(
    2
  )
  return { modeloVentana, tiempoVentana };
};
const ensamblarCarroceria = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.carroceria = valor;
  const modeloCarroceria = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoCarroceria = tiempoTotal.toFixed(
    2
  )
  return { modeloCarroceria, tiempoCarroceria };
};
const ensamblarTransmision = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.transmision = valor;
  await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoTransmision = tiempoTotal.toFixed(
    2
  )
  return {  tiempoTransmision };
};
module.exports = {
  ensamblarMotor,
  ensamblarRueda,
  ensamblarTanque,
  ensamblarPuerta,
  ensamblarAsiento,
  ensamblarVentana,
  ensamblarCarroceria,
  ensamblarTransmision,
};
