<script setup>
import {onMounted, ref} from 'vue'
import {useIdopontStore} from '@/stores/idopont.js'
import {useRouter} from 'vue-router'

const idopontStore = useIdopontStore()
const router = useRouter();

const idopontok = ref({})
const getIdopontok = async()=>{
  await idopontStore.fetchIdopontok();

}

const foglalas =()=>{
  router.push("/idopontfoglalas/3")
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
          <p> {{ idopont.day }} </p>
          <p>{{ idopont.hour }} óra</p>
        </div>
      </div>
      <button class="btn btn-success" @click="foglalas">Időpont foglalás</button>
    </div>
  </main>
</template>
