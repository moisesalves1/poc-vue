<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createUser, getUsers, type CreatedUser, type User } from './services/backend'

const users = ref<User[]>([])
const loadingUsers = ref(false)
const usersError = ref('')

const name = ref('')
const email = ref('')
const creatingUser = ref(false)
const createError = ref('')
const createdUser = ref<CreatedUser | null>(null)

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

async function handleCreateUser() {
  createError.value = ''
  createdUser.value = null

  if (!name.value || !email.value) {
    createError.value = 'Preencha nome e email para enviar ao backend'
    return
  }

  creatingUser.value = true

  try {
    createdUser.value = await createUser({
      name: name.value,
      email: email.value
    })

    name.value = ''
    email.value = ''
  } catch (error) {
    createError.value = error instanceof Error ? error.message : 'Erro inesperado ao criar usuario'
  } finally {
    creatingUser.value = false
  }
}

onMounted(loadUsers)
</script>

<template>
  <main class="container">
    <h1>Exemplo de Integracao com Backend</h1>
    <p class="description">
      Esta tela faz chamadas HTTP reais. Configure <strong>VITE_API_BASE_URL</strong> para apontar para seu backend.
    </p>

    <section class="card">
      <div class="card-header">
        <h2>GET /users</h2>
        <button :disabled="loadingUsers" @click="loadUsers">
          {{ loadingUsers ? 'Carregando...' : 'Recarregar' }}
        </button>
      </div>

      <p v-if="usersError" class="error">{{ usersError }}</p>

      <ul v-else class="user-list">
        <li v-for="user in users" :key="user.id">
          <strong>{{ user.name }}</strong>
          <span>{{ user.email }}</span>
        </li>
      </ul>
    </section>

    <section class="card">
      <h2>POST /users</h2>

      <form class="form" @submit.prevent="handleCreateUser">
        <input v-model="name" type="text" placeholder="Nome" />
        <input v-model="email" type="email" placeholder="Email" />
        <button type="submit" :disabled="creatingUser">
          {{ creatingUser ? 'Enviando...' : 'Criar usuario' }}
        </button>
      </form>

      <p v-if="createError" class="error">{{ createError }}</p>
      <p v-if="createdUser" class="success">
        Usuario criado com sucesso. ID retornado: <strong>{{ createdUser.id }}</strong>
      </p>
    </section>
  </main>
</template>

<style scoped>
.container {
  width: min(860px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 1.25rem;
}

h1 {
  font-size: 1.9rem;
  font-weight: 700;
}

.description {
  color: #475569;
}

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

h2 {
  font-size: 1.15rem;
  font-weight: 600;
}

.user-list {
  list-style: none;
  margin-top: 0.75rem;
  display: grid;
  gap: 0.6rem;
}

.user-list li {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.55rem 0.7rem;
  display: grid;
}

.user-list span {
  color: #64748b;
  font-size: 0.92rem;
}

.form {
  margin-top: 0.75rem;
  display: grid;
  gap: 0.6rem;
}

input,
button {
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  padding: 0.6rem 0.75rem;
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: #0f172a;
  color: #ffffff;
  font-weight: 600;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin-top: 0.75rem;
  color: #b91c1c;
}

.success {
  margin-top: 0.75rem;
  color: #065f46;
}
</style>
