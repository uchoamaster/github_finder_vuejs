<template>
  <RouterLink :to="`/user/${user.login}`" class="user-card">
    <img :src="user.avatar_url" :alt="`Avatar de ${user.login}`" class="avatar" loading="lazy" />
    <div class="info">
      <p class="login">{{ user.login }}</p>
      <span class="view-link">Ver perfil →</span>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  text-decoration: none;
  color: var(--color-text);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border-color: var(--color-accent);
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 3px solid var(--color-border);
  object-fit: cover;
  transition: border-color 0.2s;
}

.user-card:hover .avatar {
  border-color: var(--color-accent);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.login {
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
  color: var(--color-text);
}

.view-link {
  font-size: 0.82rem;
  color: var(--color-accent);
}
</style>
