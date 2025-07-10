# Qodex

Qodex is a modern developer tool designed to streamline your workflow and enhance productivity. This project provides a robust backend API and an intuitive interface for managing your development tasks efficiently.

## Getting Started

Follow these steps to run the project locally:

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

The server will start on `http://localhost:5000`.

## Running with Docker

You can also run Qodex using Docker:

### 1. Build the Docker Image

```bash
docker build -t qodex .
```

### 2. Run the Docker Container

```bash
docker run -p 3000:3000 qodex
```

The application will be accessible at `http://localhost:5000`.

## API Testing

A Postman collection is available for easy API testing:  
[Download Qodex Postman Collection](https://web.postman.co/workspace/17e7ee92-4e30-4227-8757-c27f454d5b25/collection/18480470-44f53b06-818a-4bcf-98af-96f820333264?action=share&source=copy-link&creator=18480470)

## Environment Variables

Create a `.env` file in the root directory with the following sample content:

```env
# Server configuration
PORT=8000

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
```

> **Note:** Update the values as needed for your local or production environment.