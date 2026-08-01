# BlogSphere Premium

A full-stack blogging platform built with the MERN stack that allows users to create, manage, and interact with blog posts through a modern and responsive interface.

## 🚀 Features

* User Authentication (Register & Login)
* Secure JWT-based Authentication
* Create, Edit, and Delete Blog Posts
* View All Blog Articles
* Comment System
* Responsive and Modern UI
* MongoDB Database Integration
* RESTful API Architecture
* Protected Routes
* Real-Time Content Management

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt.js

## 📂 Project Structure

```bash
BlogSphere/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone <your-repository-url>
cd BlogSphere
```

### Backend Setup

```bash
cd server
npm install
node server.js
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## 🌐 Local Development URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## 🔐 Environment Variables

Create a `.env` file inside the server folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## 📖 Functionality

* Users can register and log in securely.
* Authenticated users can publish blog posts.
* Users can edit or delete their own posts.
* Readers can browse articles and leave comments.
* Data is stored securely in MongoDB Atlas.

## 🎯 Learning Outcomes

This project helped me gain practical experience in:

* Full-Stack Web Development
* REST API Development
* Authentication & Authorization
* MongoDB Database Management
* React Component Architecture
* State Management
* Backend Integration
* Deployment and Production Workflows

## 👩‍💻 Author

**Sayali Naveen Lagad**

Full Stack Web Developer Intern

LinkedIn: https://www.linkedin.com/in/sayali-lagad-a4a1253b9/

---

⭐ If you like this project, consider giving it a star on GitHub.
