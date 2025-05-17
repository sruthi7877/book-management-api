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

2. **Environment**
   Create a .env file (optional—defaults to port 5000):
   PORT=5000
   
4. **Run**
   npm run dev

   The server will listen on http://localhost:<PORT>

6. **Test**
   npm test

   Manual: Import the provided Postman collection book-api.postman_collection.json and run against http://localhost:<PORT>.

**EndPoints**
| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/books`        | List all books                  |
| GET    | `/api/books/:id`    | Get one book by ID              |
| POST   | `/api/books`        | Create a new book               |
| PUT    | `/api/books/:id`    | Update an existing book         |
| DELETE | `/api/books/:id`    | Delete a book                   |
| POST   | `/api/books/import` | Bulk import books from CSV file |

CSV file must have header:
title,author,publishedYear
