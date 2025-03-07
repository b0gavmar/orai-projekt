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

const getNewId = () => {
  /*do {
    if (idopontStore.idopontok.find((i) => i.id == newId.value)) {
      newId.value = +1;
    } else {
      newIdopont.value.id = newId.value;
    }
    console.log(newId.value)
  } while (newIdopont.value.id == 0);
  return newId.value;*/
};

const foglalas = async () => {
  idopontStore.foglalniKivantIdopont.value = newIdopont.value;
  await router.push(`/idopontfoglalas/${newIdopont.id}`);
};

const days = ref(["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"]);
const hours = ref([8, 9, 10, 11, 12, 13, 14, 15, 16]);
const idopontok = ref([]);

onMounted(async () => {
  await idopontStore.fetchIdopontok();
  days.value.forEach((nap) => {
    hours.value.forEach((ora) => {
      console.log(getNewId());
      idopontok.value.push({
        id: newId,
        day: nap,
        hour: ora,
        name: "",
        mobile: "",
        reserved: false,
      });
    });
  });
});
</script>

<template>
  <main>
    <div class="container d-flex flex-wrap justify-content-center">
      <div class="card bg-dark text-light p-3 mt-2">
        <h1>Válasszon időpontot!</h1>
        <div class="mb-3">
          <select v-model="newIdopont" class="form-select">
            <option
              v-for="(idopont, index) in idopontok"
              :key="index"
              :value="idopont"
            >
              {{ idopont.day }}, {{ idopont.hour }} óra {{ idopont.id }}
            </option>
          </select>
        </div>
        {{ newIdopont.day }} {{ newIdopont.hour }} {{ newIdopont.id }}
        <button class="btn btn-success" @click="foglalas">
          Időpont foglalás
        </button>
      </div>
    </div>
  </main>
</template>
