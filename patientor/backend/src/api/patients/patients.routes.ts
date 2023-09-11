import express from 'express';

import patientsControllers from './patients.controllers';

const router = express.Router();

router.get('/', patientsControllers.getAll);

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
