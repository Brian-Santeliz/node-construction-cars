const { JSDOM } = require('jsdom');
const { window } = new JSDOM();

const ensamblarMotor = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.motor = valor;
  const modeloMotor = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoMotor = `El tiempo tomado para ensamblar el motor tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloMotor, tiempoMotor };
};
const ensamblarRueda = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.rueda = valor;
  const modeloRueda = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoRueda = `El tiempo tomado para ensamblar la rueda tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloRueda, tiempoRueda };
};
const ensamblarTanque = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.tanque = valor;
  const modeloTanque = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoTanque = `El tiempo tomado para ensamblar el tanque tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloTanque, tiempoTanque };
};
const ensamblarPuerta = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.puerta = valor;
  const modeloPuerta = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoPuerta = `El tiempo tomado para ensamblar la puerta tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloPuerta, tiempoPuerta };
};
const ensamblarAsiento = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.asiento = valor;
  const modeloAsiento = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoAsiento = `El tiempo tomado para ensamblar el asiento tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloAsiento, tiempoAsiento };
};
const ensamblarVentana = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.ventana = valor;
  const modeloVentana = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoVentana = `El tiempo tomado para ensamblar la ventana tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloVentana, tiempoVentana };
};
const ensamblarCarroceria = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.carroceria = valor;
  const modeloCarroceria = await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoCarroceria = `El tiempo tomado para ensamblar la carroceria tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
  return { modeloCarroceria, tiempoCarroceria };
};
const ensamblarTransmision = async (modelo, valor) => {
  const inicio = window.performance.now();
  modelo.transmision = valor;
  await modelo.save();
  const final = window.performance.now();
  const tiempoTotal = inicio - final / 1000;
  const tiempoTransmision = `El tiempo tomado para ensamblar la transmisión tomó: ${tiempoTotal.toFixed(
    2
  )} segundos`;
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
