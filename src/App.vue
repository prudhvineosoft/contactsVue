<template>
  <navbar-component />
  <router-view></router-view>
</template>
<script>
import NavbarComponent from "./components/NavbarComponent.vue";
export default {
  components: {
    NavbarComponent,
  },
};
</script>
<style>
@import "./styles.css";
</style>
