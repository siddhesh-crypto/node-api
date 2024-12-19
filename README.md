

# JWT Authentication API

This is a simple REST API built with **Express.js** that implements JWT-based user authentication. The API allows users to sign up, log in, and access protected resources after authenticating using JWT tokens. The project also integrates **Swagger UI** for API documentation.

## Features

- **User Authentication**: Users can register and log in to receive a JWT token for subsequent API requests.
- **Swagger UI Documentation**: Easily view and interact with the API using Swagger UI.
- **MongoDB Integration**: The API uses MongoDB as a database to store user credentials and related data.

## Technologies Used

- **Node.js** and **Express.js** for creating the server and handling requests.
- **MongoDB** for database management.
- **Mongoose** for interacting with the MongoDB database.
- **JWT (JSON Web Token)** for user authentication.
- **Swagger UI** for API documentation.
- **dotenv** for environment variable management.

## Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (>=12.x)
- MongoDB (either locally or a cloud MongoDB service like MongoDB Atlas)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/jwt-authentication-api.git
   cd jwt-authentication-api
   ```

2. **Install Dependencies**

   Install the necessary Node.js packages by running:

   ```bash
   npm install
   ```

3. **Create a `.env` File**

   In the project root, create a `.env` file and add the following variables:

   ```env
   mongo_url=your_mongo_connection_string_here
   PORT=5000  # Optional: you can specify a custom port
   ```

   Replace `your_mongo_connection_string_here` with the actual MongoDB connection string.

4. **Start the Server**

   To start the server, run the following command:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Documentation

Once the server is running, you can access the Swagger UI for API documentation at:

```
http://localhost:5000/api-docs
```

This interface will allow you to explore and interact with the API endpoints.

## Endpoints

### 1. **POST /api/auth/signup**
   - **Description**: Registers a new user.
   - **Request Body**: 
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```

### 2. **POST /api/auth/login**
   - **Description**: Logs in a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```

### 3. **GET /api/protected**
   - **Description**: A protected route that requires a valid JWT token.
   - **Authorization**: Bearer token required in the Authorization header.

## Contribution

