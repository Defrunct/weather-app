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
    background: linear-gradient(to left, #fff, #076585) no-repeat center center/cover;
    // background: url('https://giphy.com/embed/s8I46GOKHm9l6') no-repeat center center/cover;
    // background: linear-gradient(to bottom, #fff, #076585) no-repeat center center/cover;
  }
  .custom-font {
    font-family: 'Courier New', sans-serif; //Garamond
  }
  .degree {
    top: -44px;
  }
</style>