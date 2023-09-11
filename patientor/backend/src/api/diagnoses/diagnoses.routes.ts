import express from 'express';

import diagnosesControllers from './diagnoses.controllers';

const router = express.Router();

router.get('/', diagnosesControllers.getAll);
router.get('/:code', diagnosesControllers.findByCode);

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;
