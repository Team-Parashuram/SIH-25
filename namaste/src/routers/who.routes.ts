import express from 'express';
import { whoController } from '../controllers/who.controller.js';

const router = express.Router();

router.post('/token', whoController.getToken.bind(whoController));
router.get('/entity/:entityId', whoController.getEntity.bind(whoController));

export { router };
