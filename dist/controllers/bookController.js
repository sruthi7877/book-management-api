"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBooks = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
let books = [];
/**
 * GET /api/books
 */
const getAllBooks = (_req, res) => {
    res.json(books);
};
exports.getAllBooks = getAllBooks;
/**
 * GET /api/books/:id
 */
const getBookById = (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
    }
    res.json(book);
};
exports.getBookById = getBookById;
/**
 * POST /api/books
 */
const createBook = (req, res) => {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || typeof publishedYear !== 'number') {
        res.status(400).json({ message: 'Title, author, and publishedYear are required' });
        return;
    }
    const newBook = { id: (0, uuid_1.v4)(), title, author, publishedYear };
    books.push(newBook);
    res.status(201).json(newBook);
};
exports.createBook = createBook;
/**
 * PUT /api/books/:id
 */
const updateBook = (req, res) => {
    const { title, author, publishedYear } = req.body;
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
exports.updateBook = updateBook;
/**
 * DELETE /api/books/:id
 */
const deleteBook = (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) {
        res.status(404).json({ message: 'Book not found' });
        return;
    }
    books.splice(index, 1);
    res.status(204).send();
};
exports.deleteBook = deleteBook;
/**
 * POST /api/books/import
 * Manual CSV parsing & validation
 */
const importBooks = (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    // Read file content
    const content = fs_1.default.readFileSync(req.file.path, 'utf8');
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
    if (headerCols.length !== EXPECTED.length ||
        !headerCols.every((col, i) => col.replace(/\s+/g, '') === EXPECTED[i])) {
        console.log('Header mismatch. Expected', EXPECTED, 'but got', headerCols);
        res.status(400).json({ message: 'Invalid CSV header' });
        return;
    }
    const added = [];
    const errors = [];
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
        const book = {
            id: (0, uuid_1.v4)(),
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
exports.importBooks = importBooks;
