import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useIdopontStore = defineStore('idopont', () => {
  const idopontok = ref([]);
  const foglalniKivantIdopont = ref({})

  const fetchIdopontok = async () => {
    try {
      const response = await axios.get("http://localhost:3000/idopontok")
      idopontok.value = response.data
    }
    catch {
      toast.error("Nem lehetett lekérni az időpontokat")
    }
  }

  const getIdopont = async(id) => {
    try {
      await fetchIdopontok()
      const response = await axios.get(`http://localhost:3000/idopontok/${id}`)
      return response.data
    }
    catch {
      toast.error("Nem lehetett lekérni az időpontokat")
    }
  }

  const pushIdopont = async (idopont) => {
    try {
      await axios.push("http://localhost:3000/idopontok")
      toast.success("Sikeres foglalás")
    }
    catch {
      toast.error("Nem sikerült leadni a foglalást")
    }
  }

  const setFoglalniKivantIdopont = (idopont) =>{
    foglalniKivantIdopont.value = idopont.value
  }

  return { idopontok, foglalniKivantIdopont, setFoglalniKivantIdopont, fetchIdopontok, getIdopont, pushIdopont }
})
