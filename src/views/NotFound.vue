<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Página não encontrada.</p>
    <RouterLink to="/" class="back-link">← Voltar ao início</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.not-found h1 {
  font-size: 6rem;
  font-weight: 800;
  margin: 0;
  color: var(--color-border);
}

.not-found p {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.back-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
