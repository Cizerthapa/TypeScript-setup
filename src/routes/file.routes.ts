import { Router } from 'express';
import { uploadFile } from '../controllers/file.controller';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;
