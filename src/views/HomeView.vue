<script setup>
import {onMounted, ref} from 'vue'
import {useIdopontStore} from '@/stores/idopont.js'

const idopontStore = useIdopontStore()

const idopontok = ref({})
const getIdopontok = async()=>{
  await idopontStore.fetchIdopontok();
}

onMounted(async () => {
  getIdopontok()
})
</script>

<template>
  <main>
    <div class="container d-flex flex-wrap justify-content-center">
      <div v-for="idopont in idopontStore.idopontok" class="card bg-dark text-light m-2 p-1">
        <div class="card-text">
          <p> {{ idopont.date }} </p>
          <p>{{ idopont.hour }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
