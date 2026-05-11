<template>
  <form @submit.prevent="handleSearch" class="search-form">
    <div class="search-wrapper">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        v-model="query"
        type="text"
        placeholder="Buscar usuário no GitHub..."
        class="search-input"
        autocomplete="off"
      />
      <button v-if="query" type="button" class="clear-btn" @click="clearInput" title="Limpar">
        ✕
      </button>
    </div>
    <button type="submit" class="search-btn" :disabled="!query.trim()">
      Buscar
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useGithubStore } from '../stores/github'

const store = useGithubStore()
const query = ref(store.searchQuery)

function handleSearch() {
  if (!query.value.trim()) return
  store.searchUsers(query.value.trim())
}

function clearInput() {
  query.value = ''
  store.clearSearch()
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

.search-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.75rem;
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-bg-secondary);
  color: var(--color-text);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.15);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: var(--color-text);
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, opacity 0.2s;
}

.search-btn:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
