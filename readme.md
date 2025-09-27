# Qodex

Qodex is a modern developer platform designed to streamline your workflow and enhance productivity. It provides a robust backend API and an intuitive frontend interface for managing coding problems, playlists, and submissions efficiently.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ransingh88/qodex.git
cd qodex
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

```bash
npm start
```

- The backend server will start on [http://localhost:5000](http://localhost:5000).
- The frontend (if running separately) will typically be on [http://localhost:3000](http://localhost:3000).

---

## 🐳 Running with Docker

You can also run Qodex using Docker:

### 1. Build the Docker Image

```bash
docker build -t qodex .
```

### 2. Run the Docker Container

```bash
docker run -p 5000:5000 qodex
```

- The application will be accessible at [http://localhost:5000](http://localhost:5000).

---

## 🧪 API Testing

A Postman collection is available for easy API testing:  
[Download Qodex Postman Collection](https://web.postman.co/workspace/17e7ee92-4e30-4227-8757-c27f454d5b25/collection/18480470-44f53b06-818a-4bcf-98af-96f820333264?action=share&source=copy-link&creator=18480470)

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following sample content:

```env
# Server configuration
PORT=5000

# Database configuration
MONGODB_URI=mongodb://localhost:27017
DB_NAME=qodex

# CORS configuration
CORS_ORIGIN=http://localhost:3000

# JWT/Token configuration
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

# Judge0 API configuration
JUDGE0_API_URL=http://localhost:2358
JUDGE0_SULU_API_URL=http://localhost:2358
JUDGE0_SULU_API_KEY=your_judge0_sulu_api_key

# AI API configuration (optional, for AI features)
AI_API_URL=https://api.openai.com/v1
AI_API_KEY=your_openai_api_key
```

> **Note:** Update the values as needed for your local or production environment.

---

## 📝 Features

- **User Authentication** (JWT-based)
- **Problem Management** (Create, Read, Update, Delete coding problems)
- **Playlists** (Create and manage problem playlists)
- **Submissions** (Submit code and view results)
- **Judge0 Integration** (Code execution and evaluation)
- **AI Integration** (Optional: OpenAI, Gemini, etc.)
- **Responsive Frontend** (React + Tailwind CSS)
- **Framer Motion Animations** (for modals and UI transitions)
- **Robust Error Handling** (Async handler utilities)
- **Docker Support** (Easy deployment)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---
