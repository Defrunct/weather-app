<template>
  <q-layout>
    <q-page-container class="main-layout">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'App'
})
</script>

<style lang="scss">
  .main-layout {
    background: linear-gradient(to left, #fff, #076585);
  }
  .custom-font {
    font-family: 'Courier New', sans-serif; //Garamond
  }
  .degree {
    top: -44px;
  }
</style>