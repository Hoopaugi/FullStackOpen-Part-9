import express from 'express';

import diagnosesRouter from './diagnoses';
import pingRouter from './ping';

const router = express.Router();

router.use('/diagnoses', diagnosesRouter);
router.use('/ping', pingRouter);

export default router;
