import express from 'express';

import diagnosesRouter from './diagnoses';
import pingRouter from './ping';
import patientsRouter from './patients';

const router = express.Router();

router.use('/diagnoses', diagnosesRouter);
router.use('/ping', pingRouter);
router.use('/patients', patientsRouter);

export default router;
