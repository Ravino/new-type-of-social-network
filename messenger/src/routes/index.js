import express from 'express';
import message from './message';

const router = express.Router();

router.use(express.json());

router.use('/api/chat', message);

export default router;
