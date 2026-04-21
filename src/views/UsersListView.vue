<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import UserList from '../components/User/UserList.vue'
import { getUsers, type User } from '../services/backend'

const router = useRouter()
const users = ref<User[]>([])
const loadingUsers = ref(false)
const usersError = ref('')

async function loadUsers() {
  loadingUsers.value = true
  usersError.value = ''

  try {
    users.value = await getUsers()
  } catch (error) {
    usersError.value = error instanceof Error ? error.message : 'Erro inesperado ao carregar usuarios'
  } finally {
    loadingUsers.value = false
  }
}

function handleUserRemoved(userId: string) {
  users.value = users.value.filter((user) => user.id !== userId)
}

function handleEditUser(user: User) {
  router.push({ name: 'users-edit', params: { id: user.id } })
}

onMounted(loadUsers)
</script>

<template>
  <section class="view-header card">
    <div class="card-header">
      <h2>Listar Usuarios</h2>
      <button :disabled="loadingUsers" @click="loadUsers">
        {{ loadingUsers ? 'Carregando...' : 'Recarregar' }}
      </button>
    </div>
  </section>

  <UserList
    :users="users"
    :loading="loadingUsers"
    :error="usersError"
    @removed="handleUserRemoved"
    @edit="handleEditUser"
  />
</template>

<style scoped>
.card {
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #ffffff;
  padding: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

button {
  border-radius: 8px;
  border: none;
  padding: 0.6rem 0.75rem;
  font: inherit;
  cursor: pointer;
  background: #0f172a;
  color: #ffffff;
  font-weight: 600;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
