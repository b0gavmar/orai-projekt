import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useIdopontStore = defineStore("idopont", () => {
  const idopontok = ref([]);
  //const foglalniKivantIdopont = ref({});

  const fetchIdopontok = async () => {
    try {
      const response = await axios.get("http://localhost:3000/idopontok");
      idopontok.value = response.data;
    } catch {
      toast.error("Nem lehetett lekérni az időpontokat");
    }
  };

  const getIdopont = async (id) => {
    try {
      await fetchIdopontok();
      const response = await axios.get(`http://localhost:3000/idopontok/${id}`);
      return response.data;
    } catch {
      toast.error("Nem lehetett lekérni az időpontokat");
    }
  };

  const postIdopont = async (idopont) => {
    try {
      await axios.post("http://localhost:3000/idopontok", idopont);
    } catch {
      toast.error("Nem sikerült leadni a foglalást");
    }
  };

  const putIdopont = async (idopont) => {
    try {
      fetchIdopontok();
      await axios.put(
        `http://localhost:3000/idopontok/${idopont.id}`,
        idopont
      );
      toast.success("Sikeres foglalás");
    } catch {
      toast.error("Nem sikerült leadni a foglalást");
    }
  };

  const removeUnreserved = async () => {
    try {
      for (const idopont of idopontok.value) {
        if (!idopont.reserved) {
          try {
            await axios.delete(`http://localhost:3000/idopontok/${idopont.id}`);
          } catch {}
        }
      }
      fetchIdopontok();
      console.log("Nem foglalt időpontok törölve.");
    } catch (error) {
      console.log("Nem sikerült törölni az időpontokat");
    }
  };

  /*const setFoglalniKivantIdopont = (idopont) => {
    foglalniKivantIdopont.value = idopont;
  };*/

  return {
    idopontok,
    /*foglalniKivantIdopont,
    setFoglalniKivantIdopont,*/
    fetchIdopontok,
    getIdopont,
    postIdopont,
    putIdopont,
    removeUnreserved,
  };
});
