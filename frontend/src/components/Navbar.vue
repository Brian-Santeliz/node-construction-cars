<template>
  <mdb-navbar expand="large" dark color="indigo">
    <mdb-navbar-brand>
      <router-link to="/" class="text-decoration-none text-white font-weight-bold">
      CRUD VUEJS | Frontend II
      </router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <mdb-nav-item href="#" active>
          <router-link to="/crear" class="text-decoration-none text-white font-weight-bold">Ensamblar auto</router-link>
        </mdb-nav-item>
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" class="mr-3 font-weight-bold" waves-fixed>Crear partes externas</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item>
              <router-link to="/carroceria">
                Crear Carrocería
              </router-link>
            </mdb-dropdown-item>
            <mdb-dropdown-item>
              <router-link to="/transmision">
                Crear Transmisión
              </router-link>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
  import { mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';
  export default {
    name: 'Navbar',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbContainer,
      mdbDropdown,
      mdbDropdownToggle,
      mdbDropdownMenu,
      mdbDropdownItem
    }
  }
</script>