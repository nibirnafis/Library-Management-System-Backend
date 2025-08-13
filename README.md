# 📚 Library Management System - Backend

A backend API for a **Library Management System** built using **Express**, **TypeScript**, **Mongoose**, and **MongoDB**, and deployed on **Render**.  
It provides features for **Admin** and **User** roles to manage books and borrowing functionality.

---

## 🚀 Live API
**Base URL:** https://library-management-system-backend-g0s6.onrender.com/

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**

---

## ✨ Features

- **Create** new books  
- **View** all books/single book
- **Update** existing books
- **Delete** books

- **Borrow** books  
- **View** summary of borrowed books  

---

## 📂 API Endpoints Overview

- `POST /api/books` to Create Book

Example Input: <br>
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

- `GET /api/books` to View all Books
- `GET /api/books/:bookId` to View single Book

- `PUT /api/books/:bookId` to Update Book

Example Input: <br>
{
  "copies": 50
}

- `DELETE /api/books/:bookId` to Delete Book

- `POST /api/borrow` to Borrow Book

Example Input: <br>
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

- `GET /api/borrow` to View Borrow Summary

---

## 🧪 Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# MongoDB
MONGO_URI = your mongodb:url