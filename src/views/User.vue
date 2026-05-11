<template>
  <div class="user-page">
    <div class="container">
      <RouterLink to="/" class="back-link">← Voltar para busca</RouterLink>

      <Spinner v-if="store.loading" message="Carregando perfil..." />

      <div v-else-if="store.error" class="error-msg">
        <span>⚠️ {{ store.error }}</span>
      </div>

      <template v-else-if="store.user">
        <div class="profile">
          <img :src="store.user.avatar_url" :alt="`Avatar de ${store.user.login}`" class="avatar" />
          <div class="profile-info">
            <div class="profile-names">
              <h1 class="name">{{ store.user.name || store.user.login }}</h1>
              <a :href="store.user.html_url" target="_blank" rel="noopener noreferrer" class="login-link">
                @{{ store.user.login }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
                  <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/>
                </svg>
              </a>
            </div>

            <p v-if="store.user.bio" class="bio">{{ store.user.bio }}</p>

            <div class="stats">
              <div class="stat">
                <span class="stat-value">{{ store.user.public_repos }}</span>
                <span class="stat-label">Repositórios</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ store.user.followers }}</span>
                <span class="stat-label">Seguidores</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ store.user.following }}</span>
                <span class="stat-label">Seguindo</span>
              </div>
            </div>

            <div class="meta-list">
              <span v-if="store.user.company" class="meta-item">
                🏢 {{ store.user.company }}
              </span>
              <span v-if="store.user.location" class="meta-item">
                📍 {{ store.user.location }}
              </span>
              <a v-if="store.user.blog" :href="formatBlog(store.user.blog)" target="_blank" rel="noopener noreferrer" class="meta-item link">
                🔗 {{ store.user.blog }}
              </a>
              <span v-if="store.user.twitter_username" class="meta-item">
                🐦 @{{ store.user.twitter_username }}
              </span>
            </div>
          </div>
        </div>

        <section class="repos-section" v-if="store.repos.length > 0">
          <h2 class="repos-title">Repositórios recentes</h2>
          <div class="repos-grid">
            <RepoCard v-for="repo in store.repos" :key="repo.id" :repo="repo" />
          </div>
        </section>

        <p v-else class="no-repos">Este usuário não possui repositórios públicos.</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useGithubStore } from '../stores/github'
import Spinner from '../components/Spinner.vue'
import RepoCard from '../components/RepoCard.vue'

const route = useRoute()
const store = useGithubStore()

onMounted(() => {
  store.fetchUser(route.params.login)
})

function formatBlog(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}
</script>

<style scoped>
.user-page {
  padding-bottom: 4rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.profile {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid var(--color-border);
  flex-shrink: 0;
  object-fit: cover;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.profile-names {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.name {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
}

.login-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-accent);
  text-decoration: none;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}

.login-link:hover {
  opacity: 0.8;
}

.bio {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.6;
}

.stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.meta-item {
  font-size: 0.87rem;
  color: var(--color-text-muted);
}

.meta-item.link {
  color: var(--color-accent);
  text-decoration: none;
}

.meta-item.link:hover {
  text-decoration: underline;
}

.repos-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.no-repos {
  color: var(--color-text-muted);
  text-align: center;
  padding: 2rem;
}

.error-msg {
  text-align: center;
  padding: 2rem;
  color: #f85149;
  background: rgba(248, 81, 73, 0.1);
  border: 1px solid rgba(248, 81, 73, 0.3);
  border-radius: 12px;
}

@media (max-width: 600px) {
  .profile {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-names {
    justify-content: center;
  }

  .stats {
    justify-content: center;
  }

  .meta-list {
    justify-content: center;
  }
}
</style>
