# Google play-store review sentiment analysis

A full-stack web application that analyzes the sentiment of reviews of a Google Play Store app.

## 🚀 Technology Stack

### Backend

- FastAPI

### Frontend

- Next.js with TypeScript
- TanStack Query (React Query) for data fetching
- Axios for API communication
- Tailwind CSS for styling
- Lucide Icons for UI elements

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


3. **Run the following command to start the dev server**

   ```bash
   fastapi dev src/main.py
   ```

#### Frontend Setup

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Create environment file**
   Create `.env`:

   ```
   NEXT_PUBLIC_API_BASE_URL = http://127.0.0.1:8000/v1
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 🌐 Accessing the Application

- Frontend Application: http://localhost:3000
- Backend API: http://localhost:8000/docs

## Sentiment Analysis Model
 
 - Google Gemini Model


## 📚 API Documentation

This backend provides three main API endpoints:

---

### Base URL

```
http://127.0.0.1:8000/v1
```

---

### Endpoints

1. 🔍 Search Apps

**GET** `/search-apps`

Search for apps on the Play Store based on a query.

#### Query Parameters:
| Name  | Type   | Required | Description                     |
|-------|--------|----------|---------------------------------|
| query | string | Yes      | Search keyword for the app name |

#### Example Request:
```bash
GET /v1/search-apps?query=spotify
```

#### Example Response:
```json
{
  "apps": [
    {
      "appId": "com.spotify.music",
      "title": "Spotify: Music and Podcasts"
    },
    ...
  ]
}
```

---

2. 📝 Fetch Reviews

**GET** `/fetch-reviews`

Fetch user reviews for a specific app using its app ID.

#### Query Parameters:
| Name   | Type   | Required | Description                        |
|--------|--------|----------|------------------------------------|
| app_id | string | Yes      | Unique identifier of the Play Store app |

#### Example Request:
```bash
GET /v1/fetch-reviews?app_id=com.spotify.music
```

#### Example Response:
```json
{
  "reviews": [
    "Love this app! Best music experience.",
    "Too many ads without premium.",
    ...
  ]
}
```

---

3. 📊 Analyze Sentiment

**POST** `/analyze-sentiment`

Analyze the sentiment of a list of app reviews.

#### Request Body:
| Name    | Type    | Required | Description                      |
|---------|---------|----------|----------------------------------|
| reviews | string[] | Yes      | Array of review strings to analyze |

#### Example Request:
```json
POST /v1/analyze-sentiment
[
  "Love this app!",
  "Too many ads and glitches.",
  "Awesome experience."
]
```

#### Example Response:
```json
{
  "averageSentiment": 0.67,
  "reviewCount": 3
}
```
