<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import BannerContainer from './components/BannerContainer.vue';
</script>

<template>
  <suspense>
    <banner-container class="container" />
  </suspense>
</template>

<style>
body {
    margin: 0;
}

#app {
  background-color: lightsteelblue;
  height: 100vh;
  width: 100vw;
}
</style>
