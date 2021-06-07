<template>
  <mdb-container class="col-md-8 mt">
    <form @submit.prevent="crearCarroceria">
      <p class="h5 text-center">Crea un nuevo tipo de transmisión</p>
      <div class="grey-text">
        <mdb-input
          label="Ingresa el tipo transmisión"
          v-model="transmision"
          icon="car-battery"
          type="text"
        />
      </div>
      <div class="text-center">
        <mdb-btn outline="success" type="submit"
          >Guardar <mdb-icon far icon="paper-plane" class="ml-1"
        /></mdb-btn>
      </div>
    </form>
  </mdb-container>
</template>

<script>
import { url } from "@/constante.js";
import Swal from "sweetalert2";
import axios from "axios";
import { mdbInput, mdbBtn, mdbContainer, mdbIcon } from "mdbvue";
export default {
  name: "Carroceria",
  components: {
    mdbContainer,
    mdbInput,
    mdbBtn,
    mdbIcon,
  },
  data() {
    return {
      transmision: "",
    };
  },
  methods: {
    async crearCarroceria() {
      if (!this.transmision) {
        return Swal.fire(
          "Error",
          "Debes agregar el tipo de transmisión",
          "error"
        );
      }
      const response = await axios.post(`${url}/crear-transmision`, {
        tipo: this.transmision,
      });
      if (response.data.includes("registrada")) {
        this.transmision = "";
        return Swal.fire(
          "Error creando la transmisión",
          response.data,
          "error"
        );
      }
      this.transmision = "";
      const alerta = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      alerta.fire({
        icon: "success",
        title: `${response.data}`,
      });
      setTimeout(() => {
        this.$router.push("/crear");
      }, 2300);
    },
  },
};
</script>

<style>
.mt {
  margin-top: 3em;
}
</style>