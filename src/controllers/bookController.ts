// src/controllers/bookController.ts
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../models/bookModel';

let books: Book[] = [];

/**
 * GET /api/books
 */
export const getAllBooks = (_req: Request, res: Response): void => {
  res.json(books);
};

/**
 * GET /api/books/:id
 */
export const getBookById = (req: Request, res: Response): void => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  res.json(book);
};

/**
 * POST /api/books
 */
export const createBook = (req: Request, res: Response): void => {
  const { title, author, publishedYear } = req.body as Partial<Book>;
  if (!title || !author || typeof publishedYear !== 'number') {
    res.status(400).json({ message: 'Title, author, and publishedYear are required' });
    return;
  }
  const newBook: Book = { id: uuidv4(), title, author, publishedYear };
  books.push(newBook);
  res.status(201).json(newBook);
};

/**
 * PUT /api/books/:id
 */
export const updateBook = (req: Request, res: Response): void => {
  const { title, author, publishedYear } = req.body as Partial<Book>;
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  if (!title || !author || typeof publishedYear !== 'number') {
    res.status(400).json({ message: 'Title, author, and publishedYear are required' });
    return;
  }
  books[index] = { id: req.params.id, title, author, publishedYear };
  res.json(books[index]);
};

/**
 * DELETE /api/books/:id
 */
export const deleteBook = (req: Request, res: Response): void => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  books.splice(index, 1);
  res.status(204).send();
};

/**
 * POST /api/books/import
 * Manual CSV parsing & validation
 */
export const importBooks = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // Read file content
  const content = fs.readFileSync(req.file.path, 'utf8');
  const lines = content.trim().split('\n');

  // Log raw header for debugging
  const headerLine = lines.shift() || '';
  console.log('Raw header line:', JSON.stringify(headerLine));

  // Normalize header: trim, lowercase, strip BOM
  const headerCols = headerLine
    .split(',')
    .map(h => h.trim().toLowerCase().replace(/^\uFEFF/, ''));
  console.log('Parsed headers:', headerCols);

  const EXPECTED = ['title', 'author', 'publishedyear'];
  if (
    headerCols.length !== EXPECTED.length ||
    !headerCols.every((col, i) => col.replace(/\s+/g, '') === EXPECTED[i])
  ) {
    console.log('Header mismatch. Expected', EXPECTED, 'but got', headerCols);
    res.status(400).json({ message: 'Invalid CSV header' });
    return;
  }

  const added: Book[] = [];
  const errors: string[] = [];

  lines.forEach((line, idx) => {
    const cols = line.split(',');
    if (cols.length !== EXPECTED.length) {
      errors.push(`Row ${idx + 2}: expected ${EXPECTED.length} columns`);
      return;
    }
    const [title, author, yearStr] = cols.map(c => c.trim());
    const publishedYear = parseInt(yearStr, 10);
    if (!title || !author || isNaN(publishedYear)) {
      errors.push(`Row ${idx + 2}: invalid data`);
      return;
    }
    const book: Book = {
      id: uuidv4(),
      title,
      author,
      publishedYear
    };
    books.push(book);
    added.push(book);
  });

  const status = errors.length ? 400 : 201;
  res.status(status).json({ addedCount: added.length, errors });
};
