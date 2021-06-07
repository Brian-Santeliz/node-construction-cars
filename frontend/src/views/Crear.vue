<template>
  <section class="container">
    <div v-if="cargando">
      <section class="d-flex justify-content-center mt-custom">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </section>
    </div>
    <div v-else>
      <mdb-container class="mt-5">
        <mdb-card>
          <mdb-card-title class="mt-4 h2"
            >Agregar auto <i class="fa fa-truck-monster"></i>
          </mdb-card-title>
          <mdb-card-body>
            <mdb-card-text class="pr-5 pl-5" mr-4 ml-4>
              Ingresa las partes a ensamblar
            </mdb-card-text>
            <form @submit.prevent="crearAuto">
              <mdb-row>
                <mdb-col md="12">
                  <mdb-row>
                    <mdb-col>
                      <mdb-input label="Motor" v-model.trim="auto.motor" />
                    </mdb-col>
                    <mdb-col>
                      <mdb-input
                        type="text"
                        label="Ruedas del auto"
                        v-model.trim="auto.rueda"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input label="Tanque" v-model.trim="auto.tanque" />
                    </mdb-col>
                    <mdb-col>
                      <mdb-input
                        type="text"
                        label="Asientos"
                        v-model="auto.asiento"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col>
                      <mdb-input label="Ventanas" v-model.trim="auto.ventana" />
                    </mdb-col>
                    <mdb-col>
                      <mdb-input
                        type="text"
                        label="Puertas"
                        v-model="auto.puerta"
                      />
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mb-3">
                    <mdb-col>
                      <select
                        color="primary"
                        class="custom-select"
                        v-model="auto.transmision"
                      >
                        <option disabled value="">
                          Seleccione el tipo de transmisión
                        </option>
                        <option
                          v-for="value in transmisiones"
                          :key="value._id"
                          :value="value.tipo"
                        >
                          {{ value.tipo }}
                        </option>
                      </select>
                      <small
                        v-if="!(transmisiones && transmisiones.length)"
                        class="form-text text-muted user-select-none"
                      >
                        <i class="fas fa-exclamation-triangle text-warning">
                        </i>
                        Debes registrar al menos 1 transmisión
                      </small>
                    </mdb-col>
                    <mdb-col>
                      <select
                        class="custom-select form-control"
                        v-model="auto.carroceria"
                      >
                        <option disabled value="">
                          Seleccione el tipo de carroceria
                        </option>
                        <option
                          v-for="value in carrocerias"
                          :key="value._id"
                          :value="value.tipo"
                        >
                          {{ value.tipo }}
                        </option>
                      </select>
                      <small
                        v-if="!(carrocerias && carrocerias.length)"
                        class="form-text text-muted user-select-none"
                      >
                        <i class="fas fa-exclamation-triangle text-warning">
                        </i>
                        Debes registrar al menos 1 carroceria
                      </small>
                    </mdb-col>
                  </mdb-row>
                </mdb-col>
              </mdb-row>
              <mdb-btn
                type="submit"
                color="primary"
                class="text-center mx-auto d-flex justify-content-start"
                icon="tools"
                >Ensamblar</mdb-btn
              >
            </form>
          </mdb-card-body>
        </mdb-card>
      </mdb-container>
    </div>
  </section>
</template>

<script>
import { url } from "@/constante.js";
import Swal from "sweetalert2";
import axios from "axios";
import {
  mdbContainer,
  mdbInput,
  mdbCard,
  mdbCardHeader,
  mdbCardTitle,
  mdbCardText,
  mdbCardBody,
  mdbIcon,
  mdbBtn,
  mdbRow,
  mdbCol,
} from "mdbvue";

export default {
  name: "Crear",
  components: {
    mdbContainer,
    mdbInput,
    mdbCard,
    mdbCardHeader,
    mdbCardTitle,
    mdbCardBody,
    mdbCardText,
    mdbIcon,
    mdbBtn,
    mdbRow,
    mdbCol,
  },
  data() {
    return {
      transmisiones: [],
      carrocerias: [],
      cargando: false,
      auto: {
        motor: "",
        rueda: "",
        ventana: "",
        puerta: "",
        tanque: "",
        asiento: "",
        transmision: "",
        carroceria: "",
      },
    };
  },
  created() {
    this.obtenerCarroceria();
    this.obtenerTransmision();
  },
  methods: {
    async obtenerTransmision() {
      try {
        this.cargando = true;
        const response = await axios.get(`${url}/obtener-transmision`);
        this.transmisiones = response.data;
        this.cargando = false;
      } catch (error) {
        Swal.fire(
          "Ocurrió un error obteniendo la transmisión",
          error.message,
          "error"
        );
        this.cargando = false;
      }
    },
    async obtenerCarroceria() {
      try {
        this.cargando = true;
        const response = await axios.get(`${url}/obtener-carroceria`);
        this.carrocerias = response.data;
      } catch (error) {
        Swal.fire(
          "Ocurrió un error obteniendo la carroceria",
          error.message,
          "error"
        );
        this.cargando = false;
      }
    },
    async crearAuto() {
      try {
        const validar = this.verificarDatos();
        if (validar) {
          const response = await axios.post(url, this.auto);
          if (!response.data.tiempoEmsablado) {
            Swal.fire("Error", "Ocurrió un error creando el auto", "error");
            return;
          }
          const alerta = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          });
          alerta.fire({
            icon: "success",
            title: `${response.data.msg} en ${response.data.tiempoEmsablado} segundos!`,
          });
          this.auto = {
            motor: "",
            rueda: "",
            ventana: "",
            puerta: "",
            tanque: "",
            asiento: "",
            transmision: "",
            carroceria: "",
          };
          setTimeout(() => {
            this.$router.push("/");
          }, 4500);
        }
      } catch (error) {
        Swal.fire("Ocurrió un error creando el auto", error.message, "error");
      }
    },
    verificarDatos() {
      if (
        !this.auto.transmision ||
        !this.auto.carroceria ||
        !this.auto.motor ||
        !this.auto.carroceria ||
        !this.auto.rueda ||
        !this.auto.ventana ||
        !this.auto.puerta ||
        !this.auto.asiento
      ) {
        Swal.fire("Error", "Todos los campos son obligatorios", "error");
        return;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.mt-custom {
  margin-top: 17em;
}
.container {
  text-align: center;
}
</style>