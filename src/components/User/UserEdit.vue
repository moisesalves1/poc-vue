<script setup lang="ts">
import { ref, watch } from 'vue'
import { updateUser, type User } from '../../services/backend'

const props = defineProps<{
  user: User | null
}>()

const emit = defineEmits<{
  updated: [user: User]
}>()

const name = ref('')
const email = ref('')
const updating = ref(false)
const updateError = ref('')
const successMessage = ref('')

watch(
  () => props.user,
  (newUser) => {
    name.value = newUser?.name ?? ''
    email.value = newUser?.email ?? ''
    updateError.value = ''
    successMessage.value = ''
  },
  { immediate: true }
)

async function handleUpdateUser() {
  updateError.value = ''
  successMessage.value = ''

  if (!props.user) {
    updateError.value = 'Selecione um usuario para editar'
    return
  }

  if (!name.value || !email.value) {
    updateError.value = 'Preencha nome e email para atualizar'
    return
  }

  updating.value = true

  try {
    const updated = await updateUser(props.user.id, {
      name: name.value,
      email: email.value
    })

    emit('updated', updated)
    successMessage.value = 'Usuario atualizado com sucesso'
  } catch (error) {
    updateError.value = error instanceof Error ? error.message : 'Erro inesperado ao atualizar usuario'
  } finally {
    updating.value = false
  }
}
</script>

<template>
  <section class="card">
    <p class="helper" v-if="!props.user">Selecione um usuario na lista para editar.</p>

    <form class="form" @submit.prevent="handleUpdateUser">
      <input v-model="name" type="text" placeholder="Nome" :disabled="!props.user" />
      <input v-model="email" type="email" placeholder="Email" :disabled="!props.user" />
      <button type="submit" :disabled="updating || !props.user">
        {{ updating ? 'Salvando...' : 'Salvar alteracoes' }}
      </button>
    </form>

    <p v-if="updateError" class="error">{{ updateError }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
  background: #1e40af;
  color: #ffffff;
  font-weight: 600;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.helper {
  margin-top: 0.75rem;
  color: #475569;
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
