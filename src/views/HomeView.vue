<script setup>
import { onMounted, ref } from "vue";
import { useIdopontStore } from "@/stores/idopont.js";
import { useRouter } from "vue-router";

const idopontStore = useIdopontStore();
const router = useRouter();

const newIdopont = ref({
  id: 0,
  day: "",
  hour: 0,
  name: "",
  mobile: "",
  reserved: false,
});

const getNewId = () => {
  const newId = ref(0);
  do {
    newId.value += 1;
    if (idopontStore.idopontok.find((i) => i.id == newId)) {
    } else {
      newIdopont.value.id = newId;
    }
  } while (newIdopont.value.id == 0);
};

const foglalas = (id) => {
  router.push(`/idopontfoglalas/${id}`);
};

const days = ref(["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"]);
const hours = ref([8, 9, 10, 11, 12, 13, 14, 15, 16]);
const idopontok = ref([]);

onMounted(async () => {
  await idopontStore.fetchIdopontok();
  days.value.forEach((nap) => {
    hours.value.forEach((ora) => {
      idopontok.value.push({
        id: getNewId(),
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
          <select class="form-select">
            <option v-for="idopont in idopontok">{{ idopont.day }}, {{ idopont.hour }} óra</option>
          </select>
        </div>
      </div>
      <!--<div v-for="idopont in idopontStore.idopontok" class="card bg-dark text-light m-2 p-1">
        <div class="card-text">
          <p> {{ idopont.day }} </p>
          <p>{{ idopont.hour }} óra</p>
        </div>
      </div>
      <button class="btn btn-success" @click="foglalas(id)">Időpont foglalás</button>-->
    </div>
  </main>
</template>
