# CodeREX

Context-Aware AI Chat Assistant for developers.

## Structure

- **frontend**: React + Vite + TailwindCSS
- **backend**: Java Spring Boot 3.4.0 (Maven)
- **ai-engine**: Python + FastAPI

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### AI Engine
```bash
cd ai-engine
pip install -r requirements.txt
uvicorn main:app --reload
```
