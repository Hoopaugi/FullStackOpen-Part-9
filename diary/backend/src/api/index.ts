import express from 'express';

import diariesRouter from './diaries';

const router = express.Router();

router.use('/diaries', diariesRouter);

export default router;
