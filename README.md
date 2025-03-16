# LLM-Bot

### 1. Environment Setup

Configure environment variables for both services:

**Backend Setup:**

```bash
cd backend
cp .env.example .env
```

**Frontend Setup:**

```bash
cd frontend
cp .env.example .env  
```

> **Note:** Review each directory's documentation for required environment variables , update .env files.

### 2. Running with Docker (Recommended)

```bash
docker-compose up
```

This starts both services:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 3. Development Mode

```bash
docker-compose up -d  
docker-compose logs -f  
docker-compose down  
```




