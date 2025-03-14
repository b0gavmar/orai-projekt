<script setup>
import { onMounted, ref } from "vue";
import { useIdopontStore } from "@/stores/idopont.js";
import { useRouter } from "vue-router";

const idopontStore = useIdopontStore();
const router = useRouter();
const newId = ref(0);

const newIdopont = ref({
  id: 0,
  day: "",
  hour: 0,
  name: "",
  mobile: "",
  reserved: false,
});

const getNapszam = (nap) => {
  if (nap == "Hétfő") {
    return 100;
  } else if (nap == "Kedd") {
    return 200;
  } else if (nap == "Szerda") {
    return 300;
  } else if (nap == "Csütörtök") {
    return 400;
  } else {
    return 500;
  }
};

const foglalas = async () => {
  //await idopontStore.setFoglalniKivantIdopont(newIdopont.value);
  await idopontStore.postIdopont(newIdopont.value);
  await router.push(`/idopontfoglalas/${newIdopont.value.id}`);
};

const days = ref(["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"]);
const hours = ref([8, 9, 10, 11, 12, 13, 14, 15, 16]);
const idopontok = ref([]);

onMounted(async () => {
  try {
    await idopontStore.fetchIdopontok();
    await idopontStore.removeUnreserved();
    days.value.forEach((nap) => {
      hours.value.forEach((ora) => {
        const idopont = {
          id: (getNapszam(nap) + ora).toString(),
          day: nap,
          hour: ora,
          name: "",
          mobile: "",
          reserved: false,
        };

        const isReserved = idopontStore.idopontok.some(
          (existingIdopont) => existingIdopont.id == idopont.id
        );

        if (!isReserved) {
          idopontok.value.push(idopont);
        }
      });
    });
  } catch {}
});
</script>

<template>
  <main>
    <div class="container d-flex justify-content-center">
      <div class="card bg-dark text-light p-3 mt-2">
        <h2>Válasszon időpontot!</h2>
        <div class="mb-3">
          <select v-model="newIdopont" class="form-select">
            <option
              v-for="(idopont, index) in idopontok"
              :key="index"
              :value="idopont"
            >
              {{ idopont.day }}, {{ idopont.hour }} óra
            </option>
          </select>
        </div>
        <button class="btn btn-primary" @click="foglalas">
          Időpont foglalás
        </button>
      </div>
    </div>
  </main>
</template>
