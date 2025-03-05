import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useIdopontStore = defineStore('idopont', () => {
  const idopontok = ref({});
  
  const fetchIdopontok = async() =>{
    const response = await axios.get("http://localhost:3000/idopontok")
    idopontok.value = response.data
  }

  const pushIdopont = async() =>{
    
  }

  return { idopontok, fetchIdopontok }
})
