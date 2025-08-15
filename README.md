# 📚 Library Management API

A **RESTful API** built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)** for managing books and borrowing in a library.  
This API ensures **proper validation, business logic enforcement**, and uses **Mongoose features** such as static methods, instance methods, middleware, and aggregation pipelines.

---

## 🚀 Features

### 📖 Book Management
- **Add new books** with validation for title, author, genre, ISBN, and copies.
- **Retrieve all books** with filtering (by genre), sorting, and pagination.
- **Retrieve a book by ID** with complete details.
- **Update book information** (e.g., copies, description).
- **Delete books** from the system.

### 📦 Borrow Management
- **Borrow books** with quantity checks and availability updates.
- Automatically mark a book as **unavailable** if all copies are borrowed.
- **Aggregation summary** showing total borrowed quantity per book.

### 🔧 Technical Features
- **Schema Validation** with Mongoose.
- **Business Logic Enforcement** (availability control when borrowing).
- **Mongoose Middleware** (`pre` and `post` hooks for logging and validation).
- **Static & Instance Methods** for handling copies and availability logic.
- **Aggregation Pipeline** for borrowed books summary.
- **Centralized Error Handling** for consistent error responses.

---

## 🛠 Tech Stack

- **Node.js** — JavaScript runtime environment
- **Express.js** — Web framework for Node.js
- **TypeScript** — Strongly typed JavaScript
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling tool

---
## 📂 Project Structure

```plaintext
📦 library-management-api
 ┣ 📂 src
 ┃ ┣ 📂 app            
 ┃   ┣ 📂 controllers   
 ┃   ┣ 📂 interfaces   
 ┃   ┣ 📂 middlewares  
 ┃   ┣ 📂 models       
 ┃ ┣ 📜 app.ts
 ┃ ┣ 📜 server.ts                
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┣ 📜 README.md
```
---

## 🚀 Getting Started

### 🛠️ Prerequisites

- Node.js
- TypeScript (`npm i -g typescript`)
- MongoDB running locally or in the cloud (e.g., MongoDB Atlas)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/library-api.git
cd library-api
npm install


npm run dev
