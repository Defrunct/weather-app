<template>
  <q-page class="flex column">
  <div class="col q-pt-lg q-px-md">
    <q-input 
    filled bottom-slots v-model="search" 
    label="Search" 
    >

        <template v-slot:before>
          <q-icon name="my_location"/>
        </template>

        <template v-slot:hint>
          Field hint
        </template>

        <template v-slot:append>
          <q-btn round dense flat icon="search" />
        </template>
      </q-input>
  </div>
  </q-page>
</template>

<script setup>

defineOptions({
  name: 'IndexPage',
    data(){
      return{
        search:''
      }
    }
});
</script>

