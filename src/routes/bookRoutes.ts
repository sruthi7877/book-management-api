import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  importBooks,
} from '../controllers/bookController';

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');
const upload = multer({ dest: uploadDir });

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/import', upload.single('file'), importBooks);

export default router;