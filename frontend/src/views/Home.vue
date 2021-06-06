<template>
  <div>
    <div v-if="!cargandoAutos">
      <section v-if="autos.length">
        <table class="table table-striped container mt-5">
          <thead>
            <tr class="bg-table">
              <th scope="col">Motor</th>
              <th scope="col">Tanque</th>
              <th scope="col">Rueda</th>
              <th scope="col">Puerta</th>
              <th scope="col">Ventana</th>
              <th scope="col">Asiento</th>
              <th scope="col">Carroceria</th>
              <th scope="col">Transmisión</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="auto in autos" :key="auto.id">
              <td>{{auto.motor ? auto.motor : "Sin especificar" }}</td>
              <td>{{ auto.tanque ? auto.tanque : "Sin especificar"  }}</td>
              <td>{{ auto.rueda ? auto.rueda : "Sin especificar"  }}</td>
              <td>{{ auto.rueda ? auto.rueda : "Sin especificar" }}</td>
              <td>{{ auto.Ventana ? auto.Ventana : "Sin especificar"  }}</td>
              <td>{{ auto.asiento ? auto.asiento : "Sin especificar" }}</td>
              <td>{{ auto.carroceria.tipo ? auto.carroceria.tipo : "Sin especificar"  }}</td>
              <td>{{ auto.transmision.tipo ? auto.transmision.tipo : "Sin especificar"  }}</td>
              <td>
                <a class="btn btn-danger p-2">Eliminar</a>
                <a class="btn btn-info p-2 ml-2 margin-btn">Editar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section v-else>
        <p class="sin-autos">No hay autos ensamblados</p>
      </section>
    </div>
    <div v-else>
      <section class="d-flex justify-content-center mt-custom">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000/api/autos";
export default {
  data() {
    return {
      cargandoAutos: false,
      autos: [],
    };
  },
  async created() {
    this.obtenerAutos();
  },
  methods: {
    async obtenerAutos() {
      this.cargandoAutos = true;
      try {
        const response = await axios.get(url);
        this.autos = response.data;
        this.cargandoAutos = false;
      } catch (error) {
        alert(error.message);
        this.cargandoAutos = false;
      }
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 830px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin: 0 0 1rem 0;
  }

  tr:nth-child(odd) {
    background: #ccc;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
  }

  td:nth-of-type(1):before {
    content: "Motor:";
  }
  td:nth-of-type(2):before {
    content: "Tanque:";
  }
  td:nth-of-type(3):before {
    content: "Rueda:";
  }
  td:nth-of-type(4):before {
    content: "Puerta:";
  }
  td:nth-of-type(5):before {
    content: "Ventana:";
  }
  td:nth-of-type(6):before {
    content: "Asiento:";
  }
  td:nth-of-type(7):before {
    content: "Carroceria:";
  }
  td:nth-of-type(8):before {
    content: "Transmision:";
  }
  td:nth-of-type(9):before {
    content: "Aciones:";
  }
}
.bg-table {
  background: #3c59a9;
  color: white;
}
.mt-custom {
  margin-top: 17em;
}
.sin-autos {
  color: #858080;
  user-select: none;
  text-align: center;
  font-size: 1.1rem;
  cursor: default;
  margin-top: 17em;
}
@media only screen and (max-width: 1183px) {
  .margin-btn {
    margin: 0;
    margin-top: 5px;
  }
}
</style>