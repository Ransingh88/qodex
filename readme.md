# Qodex

Qodex is a modern developer tool designed to streamline your workflow and enhance productivity. This project provides a robust backend API and an intuitive interface for managing your development tasks efficiently.

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/qodex.git
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
PORT=5000

# Database configuration
DB_HOST=localhost
DB_PORT=27017
DB_NAME=qodex
DB_USER=your_db_user
DB_PASS=your_db_password

# JWT Secret
JWT_SECRET=your_jwt_secret

# Other environment variables as needed
```
