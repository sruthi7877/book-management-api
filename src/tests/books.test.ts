import request from 'supertest';
import express from 'express';
import bookRoutes from '../routes/bookRoutes';

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

describe('Book API', () => {
  it('should create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'Test', author: 'Author', publishedYear: 2020 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
  it('should return 400 on missing fields', async () => {
    const res = await request(app).post('/api/books').send({ title: '' });
    expect(res.status).toBe(400);
  });
});