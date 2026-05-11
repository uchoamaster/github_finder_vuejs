# 🔍 GitHub Finder

Aplicação web para buscar usuários e repositórios do GitHub, construída com **Vue 3**, **Pinia** e **Vue Router**, consumindo a API pública do GitHub.

---

## 🚀 Como rodar o projeto

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Acessar no navegador
http://localhost:5173
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.x | Framework JavaScript principal |
| [Vite](https://vitejs.dev/) | ^8.x | Bundler e servidor de desenvolvimento |
| [Pinia](https://pinia.vuejs.org/) | ^3.x | Gerenciamento de estado global |
| [Vue Router](https://router.vuejs.org/) | ^4.x | Navegação entre páginas (SPA) |
| [Axios](https://axios-http.com/) | ^1.x | Cliente HTTP para consumir a API |
| [GitHub REST API](https://docs.github.com/en/rest) | v3 | Fonte dos dados de usuários e repositórios |

---

## 📁 Estrutura do projeto

```
src/
├── main.js                 # Ponto de entrada — registra Vue, Pinia e Router
├── App.vue                 # Componente raiz com Navbar + RouterView
├── style.css               # Estilos globais e variáveis CSS (tema dark)
│
├── router/
│   └── index.js            # Definição das rotas da aplicação
│
├── services/
│   └── api.js              # Instância do Axios configurada para a API do GitHub
│
├── stores/
│   └── github.js           # Store Pinia com estado e actions de busca
│
├── components/
│   ├── Navbar.vue          # Barra de navegação superior
│   ├── SearchBar.vue       # Campo de busca com botão limpar
│   ├── UserCard.vue        # Card clicável com avatar e login do usuário
│   ├── RepoCard.vue        # Card de repositório (linguagem, stars, forks)
│   └── Spinner.vue         # Componente de carregamento animado
│
└── views/
    ├── Home.vue            # Página inicial com busca e grid de resultados
    ├── User.vue            # Perfil completo do usuário + repositórios
    └── NotFound.vue        # Página 404
```

---

## 🔄 Passo a passo do desenvolvimento

### 1. Criação do projeto com Vite
O projeto foi gerado com o template oficial do Vue 3 via Vite:
```bash
npm create vite@latest github-finder -- --template vue
```
O Vite oferece um servidor de desenvolvimento extremamente rápido com Hot Module Replacement (HMR).

---

### 2. Instalação das dependências
```bash
npm install pinia vue-router axios
```
- **Pinia** → gerenciamento de estado reativo e centralizado
- **Vue Router** → navegação client-side sem recarregar a página
- **Axios** → requisições HTTP com suporte a interceptors e configuração global

---

### 3. Configuração do Axios (`src/services/api.js`)
Criada uma instância centralizada do Axios com a `baseURL` da API do GitHub e o header `Accept` obrigatório para a v3. Isso evita repetição de código em cada chamada.

---

### 4. Configuração do Vue Router (`src/router/index.js`)
Definidas três rotas:
- `/` → página de busca (Home)
- `/user/:login` → perfil do usuário (parâmetro dinâmico)
- `/:pathMatch(.*)` → página 404 para rotas inexistentes

Utilizado `createWebHistory()` para URLs limpas (sem `#`).

---

### 5. Store Pinia (`src/stores/github.js`)
A store centraliza todo o estado da aplicação:

- **`state`** — armazena `searchQuery`, `searchResults`, `user`, `repos`, `loading` e `error`
- **`searchUsers(query)`** — chama `GET /search/users?q=...` e popula `searchResults`
- **`fetchUser(login)`** — chama `GET /users/:login` e `GET /users/:login/repos` em paralelo com `Promise.all`
- **`clearSearch()`** — limpa os resultados da busca

---

### 6. Componentes

#### `SearchBar.vue`
- Usa `v-model` para ligar o input ao estado local
- Ao submeter o formulário (`@submit.prevent`), chama `store.searchUsers()`
- Botão de limpar reseta input e store

#### `UserCard.vue`
- Recebe um usuário via `props`
- Usa `RouterLink` para navegar para `/user/:login` ao clicar

#### `RepoCard.vue`
- Exibe nome, descrição, linguagem com cor, stars e forks
- Link externo para o repositório no GitHub (`target="_blank"` com `rel="noopener noreferrer"`)

#### `Spinner.vue`
- Componente reutilizável de loading com animação CSS pura

---

### 7. Páginas (Views)

#### `Home.vue`
- Exibe o `SearchBar` centralizado
- Renderiza condicionalmente: Spinner, mensagem de erro, grid de `UserCard`, estado vazio

#### `User.vue`
- No `onMounted`, chama `store.fetchUser(route.params.login)`
- Exibe: avatar, nome, bio, empresa, localização, blog, Twitter, stats (repos/seguidores/seguindo)
- Lista os 10 repositórios mais recentes via `RepoCard`

---

## 📚 Conceitos aprendidos

| Conceito | Descrição |
|---|---|
| **Composition API** | Uso de `setup`, `ref`, `onMounted` e `defineProps` em vez da Options API |
| **`<script setup>`** | Sintaxe concisa do Vue 3 para componentes — código mais limpo e performático |
| **Pinia Store** | Gerenciamento de estado com `defineStore`, `state` e `actions` |
| **Vue Router** | Rotas dinâmicas (`:login`), `RouterLink`, `RouterView` e `useRoute()` |
| **Consumo de API REST** | Requisições com Axios, tratamento de erros por status HTTP |
| **`Promise.all`** | Execução paralela de múltiplas requisições para ganho de performance |
| **Props e comunicação** | Passagem de dados de pai para filho com `defineProps` |
| **Renderização condicional** | `v-if`, `v-else-if`, `v-else` para diferentes estados da UI |
| **`v-for`** | Listagem reativa de itens com chave `:key` |
| **CSS Variables** | Tema consistente usando variáveis CSS customizadas (`--color-*`) |
| **Responsividade** | Layout adaptável com CSS Grid (`auto-fill`, `minmax`) e media queries |

---

## ⚠️ Limite da API do GitHub

A API pública do GitHub permite **60 requisições por hora** sem autenticação. Se atingir o limite, a aplicação exibirá uma mensagem de aviso. Para aumentar o limite para 5.000 req/hora, crie um [Personal Access Token](https://github.com/settings/tokens) e adicione no header de autorização do `src/services/api.js`:

```js
headers: {
  Accept: 'application/vnd.github.v3+json',
  Authorization: 'Bearer SEU_TOKEN_AQUI',
}
```

> ⚠️ Nunca commite tokens no repositório. Use variáveis de ambiente (`.env`).

# Imagens
<img width="1888" height="887" alt="image" src="https://github.com/user-attachments/assets/537fde95-aa21-4617-91ed-f3259c47c4d5" />
<img width="1823" height="1001" alt="image" src="https://github.com/user-attachments/assets/5c3f7a30-654f-4a75-87d8-adc67c4f3530" />
<img width="1701" height="974" alt="image" src="https://github.com/user-attachments/assets/e330f005-c061-4455-abe6-884933c2ce01" />




