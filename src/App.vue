<script setup lang="ts">
import BannerContainer from './components/BannerContainer.vue';
</script>

<template>
  <suspense>
    <banner-container />
  </suspense>
</template>

<style>
body {
  margin: 0;
}

#app {
  background-color: lightsteelblue;
  min-height: 100vh;
  min-width: 100vw;
}

.mt-4 {
    margin-top: 4px;
}

.mt-8 {
    margin-top: 8px;
}

.mb-8 {
    margin-bottom: 8px;
}

.mr-4 {
    margin-right: 4px;
}

</style>
