<script setup lang="ts">
import { useRouter } from 'vue-router'

import UserCreate from '../components/User/UserCreate.vue'

const router = useRouter()

function handleCreated() {
  router.push({ name: 'users-list' })
}
</script>

<template>
  <section class="view-header card">
    <h2>Criar Usuario</h2>
    <p>Preencha os campos e salve para criar um novo registro no backend.</p>
  </section>

  <UserCreate @created="handleCreated" />
</template>

<style scoped>
.card {
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #ffffff;
  padding: 1rem;
}

p {
  color: #475569;
}
</style>
