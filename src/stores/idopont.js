import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useIdopontStore = defineStore('idopont', () => {
  const idontok = ref({});
  
  const fetchIdopontok = async() =>{
    const response = await axios.get("localhost:3000/idopontok")
    idontok.value = response.data
  }

  const pushIdopont = async() =>{
    
  }

  return { idopontok, fetchIdopontok }
})
