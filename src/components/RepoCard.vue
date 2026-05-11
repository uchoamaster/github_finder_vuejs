<template>
  <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="repo-card">
    <div class="repo-header">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16" class="repo-icon">
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
      </svg>
      <span class="repo-name">{{ repo.name }}</span>
      <span v-if="repo.fork" class="badge">Fork</span>
      <span v-if="repo.private" class="badge private">Privado</span>
    </div>
    <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>
    <div class="repo-meta">
      <span v-if="repo.language" class="language">
        <span class="lang-dot" :style="{ background: langColor(repo.language) }"></span>
        {{ repo.language }}
      </span>
      <span class="meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
        </svg>
        {{ repo.stargazers_count }}
      </span>
      <span class="meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
        </svg>
        {{ repo.forks_count }}
      </span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  repo: {
    type: Object,
    required: true,
  },
})

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
}

function langColor(lang) {
  return LANG_COLORS[lang] || '#8b949e'
}
</script>

<style scoped>
.repo-card {
  display: block;
  padding: 1rem 1.25rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--color-text);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.repo-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.repo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.repo-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.repo-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-accent);
  word-break: break-all;
}

.badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.5rem;
  border-radius: 20px;
  background: var(--color-border);
  color: var(--color-text-muted);
}

.badge.private {
  background: rgba(210, 153, 34, 0.15);
  color: #d29922;
}

.repo-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0.25rem 0 0.6rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.language {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.lang-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
</style>
