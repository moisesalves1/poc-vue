<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import UserEdit from '../components/UserEdit.vue'
import { getUserById, type User } from '../services/backend'

const route = useRoute()
const router = useRouter()
const user = ref<User | null>(null)
const loadingUser = ref(false)
const loadError = ref('')

const userId = computed(() => String(route.params.id ?? ''))

async function loadUser() {
  if (!userId.value) {
    loadError.value = 'ID de usuario invalido'
    user.value = null
    return
  }

  loadingUser.value = true
  loadError.value = ''

  try {
    user.value = await getUserById(userId.value)
  } catch (error) {
    user.value = null
    loadError.value = error instanceof Error ? error.message : 'Erro inesperado ao carregar usuario'
  } finally {
    loadingUser.value = false
  }
}

function handleUpdated() {
  router.push({ name: 'users-list' })
}

watch(userId, loadUser)
onMounted(loadUser)
</script>

<template>
  <section class="card">
    <h2>Editar Usuario</h2>
    <p v-if="loadingUser" class="helper">Carregando dados do usuario...</p>
    <p v-if="loadError" class="error">{{ loadError }}</p>
  </section>

  <UserEdit :user="user" @updated="handleUpdated" />
</template>

<style scoped>
.card {
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #ffffff;
  padding: 1rem;
}

.helper {
  margin-top: 0.5rem;
  color: #475569;
}

.error {
  margin-top: 0.5rem;
  color: #b91c1c;
}
</style>
