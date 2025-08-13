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
- `GET /api/books` to View all Books
- `GET /api/books/:bookId` to View single Book
- `PUT /api/books/:bookId` to Update Book
- `DELETE /api/books/:bookId` to Delete Book
- `POST /api/borrow` to Borrow Book
- `GET /api/borrow` to View Borrow Summary

---

## 🧪 Environment Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# MongoDB
MONGO_URI = your mongodb:url