<script setup lang="ts">
import { ref } from 'vue'
import { deleteUser, type User } from '../services/backend'

const props = defineProps<{
  users: User[]
  loading: boolean
  error: string
}>()

const emit = defineEmits<{
  removed: [id: string]
  edit: [user: User]
}>()

const removingUserIds = ref(new Set<string>())
const removeError = ref('')

async function handleRemoveUser(userId: string) {
  if (removingUserIds.value.has(userId)) {
    return
  }

  removeError.value = ''
  removingUserIds.value.add(userId)

  try {
    await deleteUser(userId)
    emit('removed', userId)
  } catch (error) {
    removeError.value = error instanceof Error ? error.message : 'Erro inesperado ao remover usuario'
  } finally {
    removingUserIds.value.delete(userId)
  }
}
</script>

<template>
  <section class="card">
    <p v-if="props.error" class="error">{{ props.error }}</p>
    <p v-if="removeError" class="error">{{ removeError }}</p>

    <p v-if="props.loading" class="helper">Carregando usuarios...</p>

    <ul v-else class="user-list">
      <li v-for="user in props.users" :key="user.id">
        <div>
          <strong>{{ user.name }}</strong>
          <span>{{ user.email }}</span>
        </div>

        <div class="actions">
          <button class="edit-button" @click="emit('edit', user)">Editar</button>
          <button
            class="remove-button"
            :disabled="removingUserIds.has(user.id)"
            @click="handleRemoveUser(user.id)"
          >
            {{ removingUserIds.has(user.id) ? 'Removendo...' : 'Excluir' }}
          </button>
        </div>
      </li>
    </ul>
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
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.user-list span {
  display: block;
  color: #64748b;
  font-size: 0.92rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

button {
  cursor: pointer;
  border: none;
  color: #ffffff;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 0.7rem;
  font: inherit;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.edit-button {
  background: #1d4ed8;
}

.remove-button {
  background: #b91c1c;
}

.error {
  margin-top: 0.75rem;
  color: #b91c1c;
}

.helper {
  margin-top: 0.75rem;
  color: #475569;
}
</style>
