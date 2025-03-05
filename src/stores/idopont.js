import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIdopontStore = defineStore('idopont', () => {
  const idontok = ref({});
  
  const fetchIdopontok = async() =>{

  }

  return { idopontok, fetchIdopontok }
})
