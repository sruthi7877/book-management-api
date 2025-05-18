"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const bookRoutes_1 = __importDefault(require("../routes/bookRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/books', bookRoutes_1.default);
describe('Book API', () => {
    it('should create a book', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/api/books')
            .send({ title: 'Test', author: 'Author', publishedYear: 2020 });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    }));
    it('should return 400 on missing fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post('/api/books').send({ title: '' });
        expect(res.status).toBe(400);
    }));
});
