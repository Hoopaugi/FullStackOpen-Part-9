import express from 'express';

import pingRouter from './ping';
import diaryRouter from './routes/diaries';

const app = express();

app.use(express.json());

app.use(pingRouter);

app.use('/api/diaries', diaryRouter);

export default app;
