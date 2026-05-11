import { defineStore } from 'pinia'
import api from '../services/api'

export const useGithubStore = defineStore('github', {
  state: () => ({
    searchQuery: '',
    searchResults: [],
    user: null,
    repos: [],
    loading: false,
    error: null,
  }),

  actions: {
    async searchUsers(query) {
      if (!query.trim()) return
      this.loading = true
      this.error = null
      this.searchResults = []
      try {
        const { data } = await api.get(`/search/users?q=${encodeURIComponent(query)}&per_page=12`)
        this.searchResults = data.items
        this.searchQuery = query
      } catch (err) {
        this.error = err.response?.status === 403
          ? 'Limite de requisições da API atingido. Tente novamente em instantes.'
          : 'Erro ao buscar usuários. Verifique sua conexão.'
      } finally {
        this.loading = false
      }
    },

    async fetchUser(login) {
      this.loading = true
      this.error = null
      this.user = null
      this.repos = []
      try {
        const [userRes, reposRes] = await Promise.all([
          api.get(`/users/${login}`),
          api.get(`/users/${login}/repos?sort=updated&per_page=10`),
        ])
        this.user = userRes.data
        this.repos = reposRes.data
      } catch (err) {
        this.error = err.response?.status === 404
          ? 'Usuário não encontrado.'
          : 'Erro ao carregar perfil do usuário.'
      } finally {
        this.loading = false
      }
    },

    clearSearch() {
      this.searchResults = []
      this.searchQuery = ''
      this.error = null
    },
  },
})
