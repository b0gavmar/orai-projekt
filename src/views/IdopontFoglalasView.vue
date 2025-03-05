<script setup>
import {ref, onMounted} from 'vue'
import {useIdopontStore} from '@/stores/idopont.js'

const idopontStore = useIdopontStore()

onMounted(async ()=>{
  await idopontStore.fetchIdopontok();
})
</script>

<template>

    <h1>Időpont foglalás</h1>
    <div class="container">

    </div>

</template>

<style>

</style>
