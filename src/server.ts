import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
// Root route
app.get('/', (_req, res) => {
  res.send('📚 API up. Use /api/books');
});

// Mount at /api/books
app.use('/api/books', bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});
