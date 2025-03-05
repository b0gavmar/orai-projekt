<script setup>
import { ref, onMounted } from 'vue'
import { useIdopontStore } from '@/stores/idopont.js'
import {useRoute} from 'vue-router'

const idopontStore = useIdopontStore()
const route = useRoute()

onMounted(async () => {
  await idopontStore.fetchIdopontok();
})
</script>

<template>

  <div class="container">
    <h1>Időpont foglalás</h1>
    <div class="card bg-dark p-4 text-light">
      <div class="form-group">
        <h3>Időpont: {{ idop }}</h3>
      </div>
      <hr>
      <div class="form-group">
        <label for="nev">Foglaló neve:</label>
        <input type="text" class="form-control" id="nev" name="nev" placeholder="Adja meg a nevét">
      </div>
      <div class="form-group">
        <label for="email">Foglaló Email címe:</label>
        <input type="email" class="form-control" id="email" name="email" placeholder="Adja meg az email címét">
      </div>
      <button type="submit" class="btn btn-primary mt-4">Foglalás</button>
    </div>
  </div>

</template>

<style></style>
