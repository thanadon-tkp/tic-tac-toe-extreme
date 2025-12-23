# XO Game - Docker Compose Setup

รัน XO Game ด้วย Docker Compose (Frontend + Backend + PostgreSQL)

## 🚀 เริ่มต้นใช้งาน

### Prerequisites
- Docker
- Docker Compose

### รัน Application

```bash
# Build และรัน services ทั้งหมด
docker-compose up --build

# รันในโหมด background
docker-compose up -d

# ดู logs
docker-compose logs -f

# หยุด services
docker-compose down

# หยุดและลบ volumes (ลบ database ด้วย)
docker-compose down -v
```

## 🌐 Access URLs

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## 📦 Services

### 1. Frontend (React + Vite + Nginx)
- Port: 80
- Build: Multi-stage Docker build
- Nginx proxy ไปยัง backend API

### 2. Backend (Express + TypeScript)
- Port: 3001
- Hot reload ด้วย nodemon
- เชื่อมต่อกับ PostgreSQL

### 3. Database (PostgreSQL)
- Port: 5432
- Database: `xogame`
- User: `postgres`
- Password: `postgres123`
- Volume: `postgres_data` (persistent storage)

## 🔧 Environment Variables

### Backend
```
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=xogame
DB_USER=postgres
DB_PASSWORD=postgres123
NODE_ENV=development
```

## 📊 Database Schema

Tables จะถูกสร้างอัตโนมัติเมื่อ backend start:
- `players` - ข้อมูลผู้เล่น
- `games` - ประวัติการเล่น
- `player_stats` - สถิติผู้เล่น

## 🛠️ Development

### รัน Backend แยก (Development Mode)
```bash
cd backend
npm run dev
```

### รัน Frontend แยก (Development Mode)
```bash
npm run dev
```

### เข้าถึง Database
```bash
# เข้าสู่ PostgreSQL container
docker exec -it xogame-postgres psql -U postgres -d xogame

# หรือใช้ connection string
postgresql://postgres:postgres123@localhost:5432/xogame
```

## 🗄️ Database Commands

```sql
-- ดูตารางทั้งหมด
\dt

-- ดูข้อมูลใน table
SELECT * FROM players;
SELECT * FROM games ORDER BY created_at DESC LIMIT 10;
SELECT * FROM player_stats;

-- ลบข้อมูลทั้งหมด
TRUNCATE players, games, player_stats CASCADE;
```

## 📝 Notes

- Frontend จะ build เป็น static files และรันผ่าน Nginx
- Backend รันใน development mode พร้อม hot reload
- PostgreSQL data จะถูกเก็บใน Docker volume
- API calls จาก frontend จะถูก proxy ผ่าน Nginx ไปยัง backend

## 🔄 Rebuild

หาก update dependencies หรือเปลี่ยน Dockerfile:

```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild และรันใหม่
docker-compose up --build

# Force rebuild (no cache)
docker-compose build --no-cache
```

## 🐛 Troubleshooting

### Backend ไม่สามารถเชื่อมต่อ database
```bash
# ตรวจสอบ logs
docker-compose logs postgres
docker-compose logs backend

# Restart services
docker-compose restart postgres
docker-compose restart backend
```

### Frontend ไม่แสดงผล
```bash
# ตรวจสอบ nginx logs
docker-compose logs frontend

# เข้าไปใน container
docker exec -it xogame-frontend sh
```

### ลบทุกอย่างและเริ่มใหม่
```bash
docker-compose down -v
docker-compose up --build
```
