<script setup>
import { ref, onMounted } from "vue";
import { useIdopontStore } from "@/stores/idopont.js";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import router from '@/router'

const idopontStore = useIdopontStore();
const route = useRoute();
const toast = useToast();

const currentIdopont = ref({
  id: "0",
  day: "",
  hour: 0,
  name: "",
  mobile: "",
  reserved: false,
});

const reserve = async () => {
  if (currentIdopont.value.name.trim() == "" || currentIdopont.value.mobile.trim() == "") {
    toast.error("Töltsön ki minden mezőt!");
  }
  else{
    currentIdopont.value.reserved = true;
    await idopontStore.postIdopont(currentIdopont.value);
    await router.push("/")
  }
};

onMounted(async () => {
  currentIdopont.value = await idopontStore.foglalniKivantIdopont;
  currentIdopont.name = "";
  currentIdopont.mobile = "";
});
</script>

<template>
  <div class="container">
    <div class="card bg-dark p-4 text-light">
      <div class="form-group">
        <h3>
          Időpont: {{ currentIdopont.day }}, {{ currentIdopont.hour }} óra
        </h3>
      </div>
      <hr />
      <div v-if="currentIdopont.reserved === false">
        <div class="form-group">
          <label for="nev">Foglaló neve:</label>
          <input
            v-model="currentIdopont.name"
            type="text"
            class="form-control"
            id="nev"
            name="nev"
            placeholder="Adja meg a nevét"
          />
        </div>
        <div class="form-group">
          <label for="telsz">Foglaló Telefonszáma:</label>
          <input
            v-model="currentIdopont.mobile"
            type="text"
            class="form-control"
            id="telsz"
            name="telsz"
            placeholder="Adja meg a telefonszámát"
          />
        </div>
        <button type="submit" class="btn btn-primary mt-4" @click="reserve()" id="foglalasgomb">
          Foglalás
        </button>
      </div>
      <div v-else>
        <h2>Az időpont már le van foglalva!</h2>
      </div>
    </div>
  </div>
</template>

<style></style>