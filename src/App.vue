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
    // background: linear-gradient(to left, #fff, #076585) no-repeat center center/cover;
    // background: url('https://giphy.com/embed/s8I46GOKHm9l6') no-repeat center center/cover;
    background: linear-gradient(to bottom, #fff, #076585) no-repeat center center/cover;

    // background-color:hsla(202,100%,50%,1);
    // background-image:
    // radial-gradient(at 9% 1%, hsla(240,65%,63%,0.37) 0px, transparent 50%),
    // radial-gradient(at 60% 47%, hsla(189,100%,50%,0.55) 0px, transparent 50%),
    // radial-gradient(at 0% 50%, hsla(220,100%,50%,0.52) 0px, transparent 50%),
    // radial-gradient(at 99% 100%, hsla(149,100%,76%,0.55) 0px, transparent 50%),
    // radial-gradient(at 69% 99%, hsla(70,100%,50%,0.68) 0px, transparent 50%),
    // radial-gradient(at 87% 5%, hsla(242,100%,70%,1) 0px, transparent 50%),
    // radial-gradient(at 18% 96%, hsla(134,100%,50%,0.48) 0px, transparent 50%);
  }
  .custom-font {
    font-family: 'Courier New', sans-serif; //Garamond
  }
  .degree {
    top: -44px;
  }

  .text-sha{
    text-shadow: 1px 1px 2px rgb(0, 0, 0);
  }
</style>