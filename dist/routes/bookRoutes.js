"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
const uploadDir = path_1.default.join(__dirname, '..', 'uploads');
const upload = (0, multer_1.default)({ dest: uploadDir });
router.get('/', bookController_1.getAllBooks);
router.get('/:id', bookController_1.getBookById);
router.post('/', bookController_1.createBook);
router.put('/:id', bookController_1.updateBook);
router.delete('/:id', bookController_1.deleteBook);
router.post('/import', upload.single('file'), bookController_1.importBooks);
exports.default = router;
