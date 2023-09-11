import express from 'express';
import cors from 'cors';

import { PORT } from './config';
import apiRoutes from './api';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});