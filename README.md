# Book Management API

A simple Node.js + TypeScript REST API for managing books, with CSV bulk import.

## Features

- UUID-based book IDs
- Full CRUD: `GET /api/books`, `GET /api/books/:id`, `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id`
- CSV import: `POST /api/books/import` (multipart/form-data, key `file`)
- Manual CSV parsing & validation
- Morgan logging & centralized error handling
- Environment-driven port (`.env`)
- In-memory storage (swap in DB later)
- Jest + Supertest test suite

## Setup

1. **Clone & install**  
   ```bash
   git clone https://github.com/your-username/book-management-api.git
   cd book-management-api
   npm install
