import express from 'express';
import cors from 'cors';

import pingRouter from './ping';
import apiRouter from './api';

const app = express();

app.use(express.json());
app.use(cors());

app.use(pingRouter);
app.use('/api', apiRouter);

export default app;
