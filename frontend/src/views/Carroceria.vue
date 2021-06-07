<template>
  <mdb-container class="col-md-8 mt">
    <form @submit.prevent="crearCarroceria">
      <p class="h5 text-center">Crea un nuevó modelo de carrocería</p>
      <div class="grey-text">
        <mdb-input
          label="Ingresa la carrocería"
          v-model="carroceria"
          icon="car-side"
          type="text"
        />
      </div>
      <div class="text-center">
        <mdb-btn outline="primary" type="submit"
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
      carroceria: "",
    };
  },
  methods: {
    async crearCarroceria() {
      if (!this.carroceria) {
        return Swal.fire(
          "Error",
          "Debes agregar el tipo de carrocería",
          "error"
        );
      }
      const response = await axios.post(`${url}/crear-carroceria`, {
        tipo: this.carroceria,
      });
      if (response.data.includes("previamente")) {
        this.carroceria = "";
        return Swal.fire("Error creando la carrocería", response.data, "error");
      }
      this.carroceria = "";
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