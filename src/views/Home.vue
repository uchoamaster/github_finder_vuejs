<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">GitHub Finder</h1>
      <p class="hero-subtitle">Busque usuários e explore repositórios do GitHub</p>
      <SearchBar />
    </section>

    <section class="results">
      <Spinner v-if="store.loading" message="Buscando usuários..." />

      <div v-else-if="store.error" class="error-msg">
        <span>⚠️ {{ store.error }}</span>
      </div>

      <template v-else-if="store.searchResults.length > 0">
        <p class="results-count">
          {{ store.searchResults.length }} usuário(s) encontrado(s) para
          <strong>"{{ store.searchQuery }}"</strong>
        </p>
        <div class="grid">
          <UserCard v-for="user in store.searchResults" :key="user.id" :user="user" />
        </div>
      </template>

      <div v-else-if="store.searchQuery && store.searchResults.length === 0" class="empty-state">
        <p>Nenhum usuário encontrado para <strong>"{{ store.searchQuery }}"</strong>.</p>
      </div>

      <div v-else class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64" class="empty-icon">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <p>Digite um nome de usuário para começar</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useGithubStore } from '../stores/github'
import SearchBar from '../components/SearchBar.vue'
import UserCard from '../components/UserCard.vue'
import Spinner from '../components/Spinner.vue'

const store = useGithubStore()
</script>

<style scoped>
.home {
  padding-bottom: 4rem;
}

.hero {
  text-align: center;
  padding: 3.5rem 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, var(--color-text) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  margin: 0 0 0.75rem;
}

.results {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.results-count {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.error-msg {
  text-align: center;
  padding: 2rem;
  color: #f85149;
  background: rgba(248, 81, 73, 0.1);
  border: 1px solid rgba(248, 81, 73, 0.3);
  border-radius: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  color: var(--color-text-muted);
  text-align: center;
}

.empty-icon {
  color: var(--color-border);
}
</style>
