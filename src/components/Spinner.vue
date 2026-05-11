<template>
  <div class="spinner-wrap">
    <div class="spinner"></div>
    <p v-if="message" class="spinner-msg">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 0;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.spinner-msg {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
