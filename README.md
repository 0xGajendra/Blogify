# Blogify

Blogify is a full-stack blogging platform built using Node.js, Express, MongoDB, and JWT authentication. This project was developed while learning Node.js from **Piyush Garg's Node.js course**.

## Features
- User authentication with JWT (JSON Web Token)
- Create and view blog posts
- Secure API endpoints with authentication
- MongoDB for database storage
- Express.js for backend routing and handling
- EJS for server-side rendering (SSR)

## Tech Stack
- **Node.js** - Backend runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing blogs and users
- **EJS** - Template engine for server-side rendering
- **JWT (JSON Web Token)** - Secure authentication

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xGajendra/Blogify.git
   cd blogify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

## API Endpoints
### Blog Routes
| Method | Endpoint              | Description                        |
|--------|----------------------|----------------------------------|
| GET    | /blog/add-new        | Render add new blog page        |
| GET    | /blog/:id            | View a specific blog post       |
| POST   | /blog/add-new        | Create a new blog (Auth required) |
| POST   | /blog/comment/:blogId | Comment on a blog post (Auth required) |

### User Routes
| Method | Endpoint      | Description                            |
|--------|-------------|--------------------------------------|
| GET    | /user/signin | Render the signin page               |
| GET    | /user/signup | Render the signup page               |
| POST   | /user/signin | Authenticate user and generate token |
| POST   | /user/signup | Register a new user                  |
| GET    | /user/logout | Logout user and clear authentication token |

## Deployment
Blogify is deployed on **Render**: [Live Demo](https://blogify-g7yq.onrender.com)

## Future Improvements
- Implement user roles (admin, author, reader)
- Add comments and likes system
- Improve UI with frontend framework

## Author
Developed by **Gajendra** while learning Node.js.

---
Feel free to contribute or suggest improvements!

