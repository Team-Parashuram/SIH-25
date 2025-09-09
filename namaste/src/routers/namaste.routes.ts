import express from 'express';
import { namasteController, uploadMiddleware } from '../controllers/namaste.controller.js';

const router = express.Router();

router.post('/upload', uploadMiddleware, namasteController.uploadFile.bind(namasteController));
router.get('/stats', namasteController.getStats.bind(namasteController));

router.get('/systems', namasteController.getSystems.bind(namasteController));

router.get('/codes/:system', namasteController.getSystemCodes.bind(namasteController));
router.get('/codes/:system/:code', namasteController.getCode.bind(namasteController));

router.get('/search', namasteController.search.bind(namasteController));
router.get('/autocomplete', namasteController.autocomplete.bind(namasteController));
router.get('/random', namasteController.getRandomSample.bind(namasteController));

export { router };
