import express from 'express';

import patientsControllers from './patients.controllers';

const router = express.Router();

router.get('/', patientsControllers.getAll);
router.get('/:id', patientsControllers.findById);
router.post('/', patientsControllers.create);
router.post('/:id/entries', patientsControllers.createEntry);

export default router;
