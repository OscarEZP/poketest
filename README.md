# Poketest Monorepo – Backend + Frontend + Infra (GCP)

**Urls:**  
- **Frontend (Pokédex):** https://pokedex-frontend-dot-maquicontrol-90a19.ew.r.appspot.com/  
- **Backend (API):** https://poketest-dot-maquicontrol-90a19.ew.r.appspot.com/api  
- **Repo:** https://github.com/OscarEZP/poketest

---

## 🧱 Estructura del monorepo

```
poketest/
├─ backend/                 # API (NestJS) desplegada en App Engine Standard
│  ├─ src/
│  ├─ app.template.yaml     # template de app.yaml (se copia/renderiza en CI)
│  ├─ app.yaml              # (opcional) versión ya renderizada para despliegue manual
│  └─ cloudbuild.yaml       # pipeline de build/deploy (opcional)
│
└─ pokedex/                 # Frontend (React + Vite + Tailwind v4)
   ├─ src/
   │  ├─ core/              # contratos (puertos)
   │  ├─ infra/             # adaptadores (HTTP, axios)
   │  ├─ app/               # façade + store (Zustand)
   │  └─ ui/                # componentes y páginas
   ├─ app.yaml              # despliegue App Engine Standard
   └─ cloudbuild.yaml       # pipeline de build/deploy (opcional)
```

---

## 🚀 Tech stack & patrones

### Backend
- **Node.js 20** (App Engine Standard)
- **NestJS** (API REST)
- **Redis Cloud** (SaaS) como caché
- **Patrón**: controladores → servicios → proveedor de caché (Redis)

### Frontend
- **React + Vite (TypeScript)**
- **Tailwind CSS v4** (plugin oficial `@tailwindcss/vite`)
- **@tanstack/react-query** (fetch/cache de datos)
- **Zustand** (estado de UI: página, búsqueda, selección)
- **Patrón hexagonal (light)**:
  - **Puertos** (interfaces de dominio)
  - **Adaptadores** (HTTP/axios)
  - **Façade** (orquestación query+store)
  - **UI** (componentes puros)

---

## 🔗 Rutas del backend

**Base:** `/api`  
- `GET /api/pokemons?page=1&pageSize=20&query=pi` → `{ items: {id,name,image}[], total }`
- `GET /api/pokemons/:nameOrId` → `{ id, name, types[], height, weight, sprites:{front} }`

> El **frontend** consume `VITE_API_BASE=<backend>/api` y el adaptador construye `/pokemon` y `/pokemon/:id`.

---

## ⚙️ Requisitos locales

- **Node.js**: `>= 20.19` o `>= 22.12` (recomendado usar `nvm` o `volta`)
- **npm** 9+

---

## 🧩 Backend

### Variables de entorno (App Engine)


```yaml
runtime: nodejs20
service: poketest

env_variables:
  POKEAPI_BASE: "https://pokeapi.co/api/v2"
  CACHE_TTL_SECONDS: "300"
  REDIS_URL: "rediss://default:***@host:port"
```

### Desarrollo local
```bash
cd backend
npm ci
npm run start:dev
# API local: http://localhost:8080/api
```

### Despliegue (App Engine)
```bash
cd backend
gcloud app deploy app.yaml --quiet
```


## 🎨 Frontend (Pokédex)

### Instalación & scripts
```bash
cd pokedex
npm ci
npm run dev     # http://localhost:5173
npm run build   # genera dist/
npm start       # sirve dist/ (usa 'serve -s dist -l $PORT')
```


**Vite + Tailwind v4**  
`pokedex/vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } }
})
```
