<template>
  <main class="container">
    <h1>Exemplo de Integracao com Backend</h1>
    <p class="description">
      Esta tela faz chamadas HTTP reais. Configure <strong>VITE_API_BASE_URL</strong> para apontar para seu backend.
    </p>

    <nav class="nav">
      <RouterLink to="/users" active-class="active">Listar</RouterLink>
      <RouterLink to="/users/create" active-class="active">Criar</RouterLink>
    </nav>

    <RouterView />
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

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav a {
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  color: #94a3b8;
  font-weight: 600;
  padding: 0.45rem 0.7rem;
}

.nav a.active {
  border-color: #0f172a;
  background: #0f172a;
  color: #ffffff;
}

:deep(button) {
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  font: inherit;
}
</style>
