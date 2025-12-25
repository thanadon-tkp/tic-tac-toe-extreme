# XO Game - Tic Tac Toe Extreme


## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose

### Run Application

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **PostgreSQL**: localhost:5432

## 📦 Services

### Frontend (React + Vite)
- Port: 5173

### Backend (Express + TypeScript + Prisma)
- Port: 4000

### Database (PostgreSQL 16)
- Port: 5432
- Database: `postgres`
- User: `user`
- Password: `password`
- Persistent storage: `./postgres_data`