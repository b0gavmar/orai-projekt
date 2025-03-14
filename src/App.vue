<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="bg-dark p-4 mb-3">
    <nav class="d-flex">
      <h2 class="text-light mx-3">Pszichiátria</h2>
      <RouterLink to="/" class="btn btn-primary">
        Vissza az időpontokhoz
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
