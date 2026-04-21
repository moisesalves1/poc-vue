<script setup lang="ts">
import { ref } from 'vue'
import { createUser, type CreatedUser } from '../services/backend'

const emit = defineEmits<{
  created: [user: CreatedUser]
}>()

const name = ref('')
const email = ref('')
const creatingUser = ref(false)
const createError = ref('')
const createdUser = ref<CreatedUser | null>(null)

async function handleCreateUser() {
  createError.value = ''
  createdUser.value = null

  if (!name.value || !email.value) {
    createError.value = 'Preencha nome e email para enviar ao backend'
    return
  }

  creatingUser.value = true

  try {
    const user = await createUser({
      name: name.value,
      email: email.value
    })

    createdUser.value = user
    emit('created', user)
    name.value = ''
    email.value = ''
  } catch (error) {
    createError.value = error instanceof Error ? error.message : 'Erro inesperado ao criar usuario'
  } finally {
    creatingUser.value = false
  }
}
</script>

<template>
  <section class="card">
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
</template>

<style scoped>
.card {
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #ffffff;
  padding: 1rem;
}

h2 {
  font-size: 1.15rem;
  font-weight: 600;
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
