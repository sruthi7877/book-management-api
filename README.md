# 📚 Book Management API

A simple RESTful API built with Node.js, Express, and TypeScript to manage a collection of books. Supports CRUD operations and bulk CSV import with manual validation.

---

## 🚀 Features

- **CRUD endpoints** for books (`GET`, `POST`, `PUT`, `DELETE`)
- **Bulk import** via CSV (`POST /api/books/import`)
- **Manual CSV parsing** & validation (no third-party CSV libs)
- **UUID**-based book IDs
- **Logging** with Morgan
- **Centralized error handling** middleware
- **Environment configuration** via `.env`
- **Jest + Supertest** tests for endpoints
- MVC-style project structure

---

## 📦 Installation

```bash
git clone https://github.com/sruthi7877/book-management-api.git
cd book-management-api
npm install
