# Google play-store review sentiment analysis

A full-stack web application that analyzes the sentiment of reviews of a Google Play Store app.

## 🚀 Technology Stack

### Backend

- FastAPI

### Frontend

- Next.js with TypeScript

## 🛠️ Installation & Setup

### Local Development Setup

#### Backend Setup

1. **Create and activate virtual environment**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Create necessary directories**

   ```bash
   mkdir -p media staticfiles data
   ```

4. **Run migrations**

   ```bash
   python manage.py migrate
   ```

5. **Run the following command to start the dev server**

   ```bash
   fastapi dev src/main.py
   ```

#### Frontend Setup

## 🌐 Accessing the Application

- Frontend Application: http://localhost:3000
- Backend API: http://localhost:8000/docs
