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
            >Editar auto <i class="fas fa-car"></i>
          </mdb-card-title>
          <mdb-card-body>
            <mdb-card-text class="pr-5 pl-5" mr-4 ml-4>
              Ingresa las partes del auto a editar
            </mdb-card-text>
            <form @submit.prevent="editarAuto">
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
                    </mdb-col>
                  </mdb-row>
                </mdb-col>
              </mdb-row>
              <mdb-btn
                type="submit"
                color="success"
                class="text-center mx-auto d-flex justify-content-start"
                icon="pencil-alt"
                >Editar</mdb-btn
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
  name: "Editar",
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
    this.obtenerAutoId();
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
    async obtenerAutoId() {
      try {
        this.cargando = true;
        const response = await axios.get(
          `${url}/auto-id/${this.$route.params.id}`
        );
        if (!response.data) {
          this.cargando = false;
          Swal.fire("Error", "Este auto no existe", "error");
          setTimeout(() => {
            this.$router.push("/");
          }, 2500);
          return;
        }
        this.auto = response.data;
        this.auto.carroceria = response.data.carroceria.tipo;
        this.auto.transmision = response.data.transmision.tipo;
        this.cargando = false;
      } catch (error) {
        Swal.fire(
          "Ocurrió un error obteniendo el auto",
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
    async editarAuto() {
      try {
        const esValido = this.verificarDatos();
        if (esValido) {
          const response = await axios.put(
            `${url}/editar-auto/${this.auto._id}`,
            this.auto
          );
          if (!response.data.msg) {
            return Swal.fire("Error actualizando", response.data, "error");
          }
          const alerta = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2300,
            timerProgressBar: true,
          });
          alerta.fire({
            icon: "success",
            title: `${response.data.msg} en ${response.data.tiempo} segundos!`,
          });
          setTimeout(() => {
            (this.auto = {
              motor: "",
              rueda: "",
              ventana: "",
              puerta: "",
              tanque: "",
              asiento: "",
              transmision: "",
              carroceria: "",
            }),
              this.$router.push("/");
          }, 2600);
        }
      } catch (error) {
        Swal.fire("Ocurrió un error editando el auto", error.message, "error");
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