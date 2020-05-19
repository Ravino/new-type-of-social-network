import express from 'express';
import ChatController from '../controllers/ChatController';

const router = express.Router();

router.post('/send', ChatController.sendMessage);

export default router;
